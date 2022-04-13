import React from 'react'

import { createContext, useContext} from 'react'
import { mainUser } from "../fakeData";

import { auth, provider, } from '../firebase-config';
import {signInWithPopup} from "firebase/auth"
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const signIn = () =>{
    signInWithPopup(auth, provider)
    .then(result => {console.log(result.user)})
  }
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
