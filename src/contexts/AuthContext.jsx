import React,{useState,useEffect} from 'react'

import { createContext, useContext} from 'react'
// import { mainUser } from "../fakeData";
import { doc, getDoc } from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import {signInWithPopup} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const [mainUser, setMainUser] = useState(null)
    const signIn = () =>{
      signInWithPopup(auth, provider)
      .then(result => {
       
        getDoc(doc(db, "user", result.user.email)).
        then(res=> setMainUser(res.data()))
      })
    }
  
  console.log(mainUser)
  const value = {
      signIn,
      mainUser
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
