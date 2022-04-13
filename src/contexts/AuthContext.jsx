import React,{useState} from 'react'

import { createContext, useContext} from 'react'
// import { mainUser } from "../fakeData";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import {signInWithPopup} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const [mainUser, setMainUser] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [receivedInvites, setRecievedInvites] = useState(null)

    const signIn = async () =>{
      const result = await signInWithPopup(auth, provider)
      const document = await getDoc(doc(db, "user", result.user.email))
      if(document.exists()){
        
      }
      else{
        await setDoc(doc(collection(db,"user"), result.user.email),{
          displayName:result.user.displayName,
          photoURL:result.user.photoURL,
          contacts:[]
        })
        await setDoc(doc(collection(db, `user/${result.user.email}/contact`)),{
          message:{}
        })
        await setDoc(doc(collection(db, `user/${result.user.email}/recievedInvites`)),{
          sender:{}
        })
        const document = await getDoc(doc(db, "user", result.user.email))
        setMainUser(document.data())
        
      }
  
    }
  
  console.log(mainUser)
  const value = {
      signIn,
      mainUser,
      contacts,
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
