import { createContext, useContext, useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import { useAuth } from "./AuthContext";


const ChatsContext = createContext()

export const useChats =() =>{
    return useContext(ChatsContext)
}

export const ChatsProvider = ({children}) => {
  const {mainUser} = useAuth()
  const [user, setUser] = useState(mainUser)
  useEffect(()=>{
    setUser(mainUser)
  },[mainUser])
  const addMessage=(content,contactId)=>{
    const data = {
      content:content,
      id:faker.datatype.uuid(),
      date:String(new Date()),
      sentBy:0
    }
    const newUser = JSON.parse(JSON.stringify(user))
    const newContact = newUser.contacts.filter((cont)=> cont.id===contactId)[0]
    const newUserId = newUser.contacts.indexOf(newContact)
    newContact.messages.push(data)
    newUser.contacts[newUserId]=newContact
    setUser(newUser)
 
  }
  const value = {
    user,
    addMessage
  }
  return <ChatsContext.Provider value={value}>
      {children}
  </ChatsContext.Provider>
}
