import React,{useEffect, useState} from 'react'

import { createContext, useContext} from 'react'
import { doc, getDoc, setDoc, collection, addDoc,  serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore"; 

import { auth, provider, } from '../firebase-config';
import { browserLocalPersistence, setPersistence, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth"

import { db } from '../firebase-config';
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {  
  const [mainUser, setMainUser] = useState()
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [receivedInvites, setReceivedInvites] = useState([])
  useEffect(()=>{
    const getUserData = async () =>{
      setLoading(true)
        onAuthStateChanged(auth, async user =>{
          if(user){
            let q = query(collection(db, `user/${user.email}/contacts`), orderBy("timeStamp","desc"))
            await onSnapshot(q,cntcts =>{
                setContacts(cntcts.docs.map(cnt => ({id:cnt.id, data:cnt.data()})))
              })
            let b = query(collection(db, `user/${user.email}/receivedInvites`), orderBy("timeStamp"))
            await onSnapshot(b,invites=>{
              setReceivedInvites(invites.docs.map(invite => ({id:invite.id, data:invite.data()})))
            })
            await setDoc(doc(db, "user",user.email),{
              lastSeen:"online"
            })
            setMainUser(user)
        }
        setLoading(false)

      })
    }
      getUserData()
      
  },[])

  const signIn = async () =>{
    const res = setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithPopup(auth, provider)
    })
    const result = await res
    setLoading(true)
    const document = await getDoc(doc(db, "user", result.user.email))

    if(!document.exists()){
      await setDoc(doc(collection(db,"user"), result.user.email),{
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
      })
      const senderID = await addDoc(collection(db, `user/${result.user.email}/contacts`),{
        sender:"judasiscariotthesly@gmail.com",
        displayName:"A Free Man",
        photoURL:"https://lh3.googleusercontent.com/a/AATXAJzkwGdlHRHZXY6l-18v6wUvUNKel0JNfAznsJsB=s96-c",
        blocked:false,
        timeStamp: serverTimestamp(),

      })
      const receiverID = await addDoc(collection(db, `user/judasiscariotthesly@gmail.com/contacts`),{
        sender:result.user.email,
        displayName:result.user.displayName,
        photoURL:result.user.photoURL,
        blocked:false,
        timeStamp: serverTimestamp(),
      })
      await addDoc(collection(db, `user/${result.user.email}/contacts/${senderID.id}/messages`),{
        timeStamp: serverTimestamp(),
        sentByMainUser:false,
        content:"Hi, Let's talk"
      }
    )
      await addDoc(collection(db, `user/judasiscariotthesly@gmail.com/contacts/${receiverID.id}/messages`),{
          timeStamp: serverTimestamp(),
          sentByMainUser:true,
          content:"Hi, Let's talk"
        }
      )
    }
    await setDoc(doc(db, "user",result.user.email),{
      lastSeen:"online"
    })
    await onSnapshot((collection(db, `user/${result.user.email}/contacts`)), orderBy("timeStamp"),cntcts =>{
      setContacts(cntcts.docs.map(cnt => ({id:cnt.id, data:cnt.data()})))
    })
    await onSnapshot((collection(db, `user/${result.user.email}/receivedInvites`)),invites=>{
      setReceivedInvites(invites.docs.map(invite => ({id:invite.id, data:invite.data()})))
    })
  
    setMainUser({
      email:result.user.email,
      displayName:result.user.displayName,
      photoURL:result.user.photoURL
    })
    setLoading(false)
  }
  
  const logout = async ()=>{
    await setDoc(doc(db, "user", mainUser.email),{
      lastSeen:serverTimestamp()
    })
    signOut(auth)
    setMainUser(null)
    setContacts(null)
    setReceivedInvites(null)
    
  }
  const value = {
      signIn,
      mainUser,
      loading,
      contacts,
      receivedInvites,
      logout
  } 
  window.addEventListener('beforeunload', async ()=> {
    await setDoc(doc(db, "user", mainUser.email),{
      lastSeen:serverTimestamp()
    })
    
});
  localStorage.removeItem("user")
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
