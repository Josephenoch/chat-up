import React from 'react'

import { createContext, useContext, useState } from 'react'
import { mainUser } from "../fakeData";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const value = {
      mainUser
  } 
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
