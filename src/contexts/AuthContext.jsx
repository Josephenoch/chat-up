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
  const [sendEr, setSendEr] = useState(null)
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
        messages:[{
          content:"Hi let's talk",
          timeStamp:"today",
          sentByMainUser:false,
          messageID:"efyf23g6y7efj23fyt"
        }]
      })
      await setDoc(doc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`)),{
        sender:result.user.email,
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
        messages:[{
          content:"Hi let's talk",
          timeStamp:"today",
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
    const cnt =  await getDoc(doc(db, `user/${mainUser.email}/contacts`, contact.id))
    const oldMessages = cnt.data().messages
    const sentBy = await query(collection(db, `user/${contact.data.sender}/contacts`), where("sender","==",mainUser.email), limit(1))
    onSnapshot(sentBy,sender=>{
      console.log(sender.data())
      sender.forEach(snd=>{
        setSendEr({
          newMessage:message,
          sender:contact.data.sender,
          oldMessages:snd.data().messages,
          id:snd.id
        })
        break
        console.log(snd.data())
      })
    })

    await updateDoc(doc(db, `user/${mainUser.email}/contacts`,contact.id),{
      messages:[...oldMessages,message]
    })
  }
  useEffect(()=>{
    console.log(sendEr)
    if(sendEr){
      updateDoc(doc(collection(db, `user/${sendEr.sender}/contacts`),sendEr.id),{
        messages:[...sendEr.oldMessages,{...sendEr.newMessage, sentByMainUser:false}]
      })
    }
  },[sendEr])
  const value = {
      signIn,
      mainUser,
      contacts,
      receivedInvites,
      sendMessage
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
