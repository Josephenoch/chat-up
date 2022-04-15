import React,{useEffect, useState} from 'react'

import { createContext, useContext} from 'react'
// import { mainUser } from "../fakeData";
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, onSnapshot, where, query, limit } from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import {signInWithPopup} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const [mainUser, setMainUser] = useState(null)
  const [contacts, setContacts] = useState([])
  const [receivedInvites, setReceivedInvites] = useState([])

  const signIn = async () =>{
    const result = await signInWithPopup(auth, provider)
    const document = await getDoc(doc(db, "user", result.user.email))
    if(!document.exists()){
      await setDoc(doc(collection(db,"user"), result.user.email),{
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
      })
      await setDoc(doc(collection(db, `user/${result.user.email}/contacts`)),{
        sender:"judasiscariotthesly@gmail.com",
        displayName:"A Free Man",
        photoURL:"https://lh3.googleusercontent.com/a/AATXAJzkwGdlHRHZXY6l-18v6wUvUNKel0JNfAznsJsB=s96-c",
        blocked:false,
        messages:[{
          content:"Hi let's talk",
          timeStamp:new Date(),
          sentByMainUser:false,
          messageID:"efyf23g6y7efj23fyt"
        }]
      })
      await setDoc(doc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`)),{
        sender:result.user.email,
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
        blocked:false,
        messages:[{
          content:"Hi let's talk",
          timeStamp:new Date(),
          sentByMainUser:true,
          messageID:"efyf23g6y7efj23fyt"
        }]
      })
    }
    await onSnapshot((collection(db, `user/${result.user.email}/contacts`)),(cntcts)=> {
       cntcts.forEach(contact=>{
        setContacts([...contacts,
          {
            id:contact.id,
            data:contact.data()
          }
        ])
       })
      
      }
    )
    await onSnapshot((collection(db, `user/${result.user.email}/receivedInvites`)),invites => {
      invites.forEach(invite=>{
        setReceivedInvites([...receivedInvites,
          {
            id:invite.id,
            data:invite.data()
          }
        ])
        })
    })
    
    setMainUser({
      email:result.user.email,
      displayName:result.user.displayName,
      photoURL:result.user.photoURL
    })
  }
  
  const sendMessage = async (message,contact) => {
    const sentToData = await getDoc(doc(db, `user/${mainUser.email}/contacts`, contact.id))
    const sentByData = await getDocs(query(collection(db, `user/${contact.data.sender}/contacts`), where("sender","==",mainUser.email)))
    const sentTo = {
      data:sentToData.data(),
      id:sentToData.id
    }
    const sentBy ={
      data:sentByData.docs[0].data(),
      id:sentByData.docs[0].id
    }
    console.log(sentTo.data.sender,sentTo.id,contact.id)
    await updateDoc(doc(db, `user/${mainUser.email}/contacts`,contact.id),{
      messages:[...sentTo.data.messages,message]
    })
    await updateDoc(doc(db, `user/${sentTo.data.sender}/contacts`,sentBy.id),{
      messages:[...sentBy.data.messages,{...message, sentByMainUser:false}]
    })
  }

  const addUser = async (email)=>{
    const document = await getDoc(doc(db, "user", email))

    if(document.exists()){
      const doc2 = await getDocs(query(collection(db, `user/${email}/receivedInvites`), where("sender","==",mainUser.email)))
      if(doc2.docs.length<1){
        const doc3 = await getDocs(query(collection(db, `user/${mainUser.email}/sentInvites`), where("receiver","==",email)))
        if(doc3.docs.length<1){
          await setDoc(doc(collection(db, `user/${email}/receivedInvites`)),{
            sender:mainUser.email,
            displayName:mainUser.displayName,
            photoURL:mainUser.photoURL,
          })
          await setDoc(doc(collection(db, `user/${mainUser.email}/sentInvites`)),{
            receiver:email,
            displayName:document.data().displayName,
            photoURL:document.data().photoURL,
          })
        }
      } 
    }
  }

  
  const value = {
      signIn,
      mainUser,
      contacts,
      receivedInvites,
      sendMessage,
      addUser
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
