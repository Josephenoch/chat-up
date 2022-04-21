import React,{useEffect, useState} from 'react'

import { createContext, useContext} from 'react'
import { doc, getDoc, setDoc, collection, addDoc,  serverTimestamp, onSnapshot, orderBy } from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import {signInWithPopup} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const user = window.localStorage.getItem('mainUser')
  const [mainUser, setMainUser] = useState()
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [receivedInvites, setReceivedInvites] = useState([])
  useEffect(()=>{
    const getUserData = async () =>{
      const document = await getDoc(doc(db, "user", user))
      await onSnapshot((collection(db, `user/${user}/contacts`)), orderBy("timeStamp"),cntcts =>{
        setContacts(cntcts.docs.map(cnt => ({id:cnt.id, data:cnt.data()})))
      })
      await onSnapshot((collection(db, `user/${user}/receivedInvites`)),invites=>{
        setReceivedInvites(invites.docs.map(invite => ({id:invite.id, data:invite.data()})))
      })
      setMainUser(document.data())
      setLoading(false)
    }
    if(user){
      setLoading(true)
      getUserData()
      
    }
  },[])

  const signIn = async () =>{
    const result = await signInWithPopup(auth, provider)
    setLoading(true)
    const document = await getDoc(doc(db, "user", result.user.email))
    window.localStorage.setItem('mainUser',result.user.email)

    if(!document.exists()){
      await setDoc(doc(collection(db,"user"), result.user.email),{
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
      })
      const senderID = await addDoc(collection(db, `user/${result.user.email}/contacts`),{
        sender:"judasiscariotthesly@gmail.com",
        displayName:"A Free Man",
        photoURL:"https://lh3.googleusercontent.com/a/AATXAJzkwGdlHRHZXY6l-18v6wUvUNKel0JNfAznsJsB=s96-c",
        blocked:false,
        timeStamp: serverTimestamp(),

      })
      const receiverID = await addDoc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`),{
        sender:result.user.email,
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
        blocked:false,
        timeStamp: serverTimestamp(),
      })
      await addDoc(collection(db, `user/${result.user.email}/contacts/${senderID.id}/messages`),{
        timeStamp: serverTimestamp(),
        sentByMainUser:false,
        content:"Hi, Let's talk"
      }
    )
      await addDoc(collection(db, `user/judasiscariotthesly@gmail.com/contacts/${receiverID.id}/messages`),{
          timeStamp: serverTimestamp(),
          sentByMainUser:true,
          content:"Hi, Let's talk"
        }
      )
    }

    await onSnapshot((collection(db, `user/${result.user.email}/contacts`)), orderBy("timeStamp"),cntcts =>{
      setContacts(cntcts.docs.map(cnt => ({id:cnt.id, data:cnt.data()})))
    })
    await onSnapshot((collection(db, `user/${result.user.email}/receivedInvites`)),invites=>{
      setReceivedInvites(invites.docs.map(invite => ({id:invite.id, data:invite.data()})))
    })
  
    setMainUser({
      email:result.user.email,
      displayName:result.user.displayName,
      photoURL:result.user.photoURL
    })
    setLoading(false)
  }
  
  const logout = ()=>{
    localStorage.removeItem("mainUser")
    setMainUser(null)
    
  }
  
  const value = {
      signIn,
      mainUser,
      loading,
      contacts,
      receivedInvites,
      logout
  } 
  localStorage.removeItem("user")
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
