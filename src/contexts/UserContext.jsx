import React,{createContext, useContext} from 'react'

const UserContext = createContext()
export const useChats = () => {
    return useContext(UserContext)
}
export const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={true}>
        {children}
    </UserContext.Provider>
  )
}
