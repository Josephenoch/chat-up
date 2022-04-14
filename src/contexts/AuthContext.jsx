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
  const [receivedInvites, setReceivedInvites] = useState([])

    const signIn = async () =>{
      const result = await signInWithPopup(auth, provider)
      const document = await getDoc(doc(db, "user", result.user.email))
      if(!document.exists()){
        await setDoc(doc(collection(db,"user"), result.user.email),{
          displayName:result.user.displayName,
          photoURL:result.user.photoURL,
        })
        await setDoc(doc(collection(db, `user/${result.user.email}/contacts`)),{
          sender:"judasiscariotthesly@gmail.com",
          displayName:"A Free Man",
          photoURL:"https://lh3.googleusercontent.com/a/AATXAJzkwGdlHRHZXY6l-18v6wUvUNKel0JNfAznsJsB=s96-c",
          messages:[{
            content:"Hi let's talk",
            timeStamp:"today",
            sentByMainUser:false,
            messageID:"efyf23g6y7efj23fyt"
          }]
        })
        await setDoc(doc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`)),{
          sender:result.user.email,
          displayName:result.user.displayName,
          photoURL:result.user.photoURL,
          messages:[{
            content:"Hi let's talk",
            timeStamp:"today",
            sentByMainUser:true,
            messageID:"efyf23g6y7efj23fyt"
          }]
        })
      }
      const cntcts = await getDocs((collection(db, `user/${result.user.email}/contacts`)))
      const invites = await getDocs((collection(db, `user/${result.user.email}/receivedInvites`)))

      const newArray = [...contacts]
      const newArray2 = [...receivedInvites]

      cntcts.forEach(cont=>{
        newArray.push({
          id:cont.id,
          data:cont.data()
        })
      })
      invites.forEach(invite=>{
        newArray2.push({
          id:invite.id,
          data:invite.data()
        })
      })
      setContacts(newArray)
      setReceivedInvites(newArray2)
      setMainUser({
        displayName:result.user.displayName,
        photoURL:result.user.photoURL
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
