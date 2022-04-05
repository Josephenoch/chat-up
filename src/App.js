import { Box } from "@mui/material";
// import "./App.css"

// import { Sidebar } from "./components/Sidebar/Sidebar";
// import MessagBackground from "./assets/chatbg.png"
// import { Chats } from "./components/Chats/Chats";
// import {mainUser} from "./fakeData" 
import { db } from "./firebase-config";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"
import { useEffect, useState } from "react";



export const App = () => {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    }
    getUsers()
  }, [usersCollectionRef])

  const addNewUser = async () =>{
    if(newName !== "" && newAge!==0){
      await addDoc(usersCollectionRef, {name:newName, age: Number(newAge)})
    }
    else{
      console.error("Add Adequate Details")
    }
  }

  const editAge = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newField = {age:age+1}
    await updateDoc(userDoc,newField)

  }

  const delterDoc = async(id) =>{
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }
  
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
      <input 
        type="text" 
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <input 
        type="number"
        value={newAge}
        onChange={e => setNewAge(e.target.value)}
      />
      <button 
        onClick={addNewUser}
      >
          Add User
        </button>
      <>{users.map(user =>{
        return (
          <div key={user.id  }>
            {" "}
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>
            <button onClick={() => editAge(user.id,user.age)} >Increment Age</button>
            <button onClick={() => delterDoc(user.id)} >Delete Doc</button>
          </div>
        )

      })}</>
    </Box>
  );
}

 
