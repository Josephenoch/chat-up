import React,{useEffect, useState} from 'react'

import { createContext, useContext} from 'react'
import { doc, getDoc, setDoc, collection, addDoc,  serverTimestamp, onSnapshot, orderBy} from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import { browserLocalPersistence, setPersistence, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {  
  const [mainUser, setMainUser] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [contacts, setContacts] = useState([])
  const [receivedInvites, setReceivedInvites] = useState([])
  useEffect(()=>{
    const getUserData = async () =>{
      setLoading(true)
        onAuthStateChanged(auth, async user =>{
          if(user){
            try{
              const document = await getDoc(doc(db, "user", user.email))
              if(!document.exists()){
                await setDoc(doc(collection(db,"user"), user.email),{
                  displayName:user.displayName,
                  photoURL:user.photoURL,
                })
                const senderID = await addDoc(collection(db, `user/${user.email}/contacts`),{
                  sender:"judasiscariotthesly@gmail.com",
                  displayName:"A Free Man",
                  photoURL:"https://lh3.googleusercontent.com/a/AATXAJzkwGdlHRHZXY6l-18v6wUvUNKel0JNfAznsJsB=s96-c",
                  blocked:false,
                  timeStamp: serverTimestamp(),
          
                })
                const receiverID = await addDoc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`),{
                  sender:user.email,
                  displayName:user.displayName,
                  photoURL:user.photoURL,
                  blocked:false,
                  timeStamp: serverTimestamp(),
                })
                await addDoc(collection(db, `user/${user.email}/contacts/${senderID.id}/messages`),{
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
              await setDoc(doc(db, "user",user.email),{
                lastSeen:"online"
              })
              await onSnapshot((collection(db, `user/${user.email}/contacts`)), orderBy("timeStamp"),cntcts =>{
                setContacts(cntcts.docs.map(cnt => ({id:cnt.id, data:cnt.data()})))
              })
              await onSnapshot((collection(db, `user/${user.email}/receivedInvites`)),invites=>{
                setReceivedInvites(invites.docs.map(invite => ({id:invite.id, data:invite.data()})))
              })
            
              setMainUser({
                email:user.email,
                displayName:user.displayName,
                photoURL:user.photoURL
              }) 
            }     
            catch(err){
              setError(err.code)
            }      
          }
        setLoading(false)

      })
    }
      getUserData()
      
  },[])

  const signIn = async () =>{
    setDisabled(true)
    try{
      await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
      })
    }
    catch(err){
      setDisabled(false)
      setError(err.code)
    }
    
    
  }
  
  const logout = async ()=>{
    await setDoc(doc(db, "user", mainUser.email),{
      lastSeen:serverTimestamp()
    })
    signOut(auth)
    setMainUser(null)
    setContacts(null)
    setReceivedInvites(null) 
  }
  const value = {
      signIn,
      mainUser,
      loading,
      contacts,
      receivedInvites,
      logout,
      disabled,
      error,
      setError
  } 
  window.addEventListener('beforeunload', async ()=> {
    await setDoc(doc(db, "user", mainUser.email),{
      lastSeen:serverTimestamp()
    })
  });
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
