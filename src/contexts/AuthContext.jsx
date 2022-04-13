import React,{useState} from 'react'

import { createContext, useContext} from 'react'
// import { mainUser } from "../fakeData";
import { doc, getDoc, setDoc, collection, getDocs, onSnapshot } from "firebase/firestore"; 

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
  const [receivedInvites, setReceivedInvites] = useState(null)

    const signIn = async () =>{
      const result = await signInWithPopup(auth, provider)
      const document = await getDoc(doc(db, "user", result.user.email))
      if(!document.exists()){
        await setDoc(doc(collection(db,"user"), result.user.email),{
          displayName:result.user.displayName,
          photoURL:result.user.photoURL,
          contacts:[],
          receivedInvites:[]
        })
      
      }
      setContacts(document.data().contacts)
      setReceivedInvites(document.data().receivedInvites)
      setMainUser({
        displayName:document.data().displayName,
        photoURL:document.data().photoURL
      })
    }
  
  console.log(mainUser)
  const value = {
      signIn,
      mainUser,
      contacts,
      receivedInvites
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
