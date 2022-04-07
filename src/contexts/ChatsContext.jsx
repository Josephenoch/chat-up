import { createContext, useContext } from "react";
import { mainUser } from "../fakeData";

const ChatsContext = createContext()

export const useChats =() =>{
    return useContext(ChatsContext)
}

export const ChatsProvider = ({children}) => {
  return <ChatsContext.Provider value={mainUser}>
      {children}
  </ChatsContext.Provider>
}
