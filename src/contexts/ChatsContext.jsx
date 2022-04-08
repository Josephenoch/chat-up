import { createContext, useContext, useState } from "react";
import { mainUser } from "../fakeData";
import { faker } from '@faker-js/faker';


const ChatsContext = createContext()

export const useChats =() =>{
    return useContext(ChatsContext)
}

export const ChatsProvider = ({children}) => {
  const [user, setUser] = useState(mainUser)
  console.log(user)
  const addMessage=(content,contactId)=>{
    const date = new Date
    const data = {
      content:content,
      id:faker.datatype.uuid(),
      date:String(date),
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
