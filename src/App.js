import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import MessagBackground from "./assets/chatbg.png"
import { Chats } from "./components/Chats/Chats";
import {mainUser} from "./fakeData" 
import { db } from "./firebase-config";
import {collection, getDocs} from "firebase/firestore"
import { useEffect, useState } from "react";



export const App = () => {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    }
    getUsers()
  }, [])
  
  return (
    <Box className="app">
      {/* <Box className="sideBar">
        <Sidebar
          user={mainUser}
        />
      </Box>
      <Box className="chats">
        <Chats
          user={mainUser}
        />
      </Box> */}
      <>{users.map(user =>{
        return (
          <div key={user.id  }>
            {" "}
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>
          </div>
        )

      })}</>
    </Box>
  );
}

 
