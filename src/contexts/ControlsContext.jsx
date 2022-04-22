import React, { createContext, useContext } from 'react'
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, addDoc, where, query, deleteDoc, serverTimestamp } from "firebase/firestore"; 

import { db } from '../firebase-config';
import { useAuth } from './AuthContext';


const ControlsContext = createContext()

export const useControls = () => {
    return useContext(ControlsContext)
}
export const ControlsProvider = ({children}) => {
    const {mainUser} = useAuth()
    const sendMessage = async (message,contact) => {
        const sentToData = await getDoc(doc(db, `user/${mainUser.email}/contacts/${contact.id}`, ))
        const sentByData = await getDocs(query(collection(db, `user/${contact.data.sender}/contacts`), where("sender","==",mainUser.email)))
        const sentTo = {
            data:sentToData.data(),
            id:sentToData.id
        }
        const sentBy ={
            data:sentByData.docs[0].data(),
            id:sentByData.docs[0].id
        }
        await updateDoc(doc(db, `user/${mainUser.email}/contacts/`,contact.id),{
            timeStamp: message.timeStamp
        })
        await addDoc(collection(db, `user/${mainUser.email}/contacts/${contact.id}/messages`,),
            {...message}
        )
        if(!sentBy.data.blocked){
            await updateDoc(doc(db, `user/${sentTo.data.sender}/contacts/`,sentBy.id),{
            timeStamp: message.timeStamp
            })
            await addDoc(collection(db, `user/${sentTo.data.sender}/contacts/${sentBy.id}/messages`,),{
            ...message, sentByMainUser:false
            })
        }
    
    }

    const sendInvite = async (email)=>{
        const document = await getDoc(doc(db, "user", email))
        console.log(mainUser)
        if(document.exists()){
            const doc1 = await getDocs(query(collection(db, `user/${mainUser.email}/contacts`), where("sender","==",email)))
            if(doc1.docs.length<1){
                const doc2 = await getDocs(query(collection(db, `user/${email}/receivedInvites`), where("sender","==",mainUser.email)))
                if(doc2.docs.length<1){
                    const doc3 = await getDocs(query(collection(db, `user/${mainUser.email}/receivedInvites`), where("sender","==",email)))
                    if(doc3.docs.length<1){
                        await setDoc(doc(collection(db, `user/${email}/receivedInvites`)),{
                            sender:mainUser.email,
                            displayName:mainUser.displayName,
                            photoURL:mainUser.photoURL,
                            timeStamp: serverTimestamp()
                        })
                        await setDoc(doc(collection(db, `user/${mainUser.email}/sentInvites`)),{
                            receiver:email,
                            displayName:document.data().displayName,
                            photoURL:document.data().photoURL,
                            timeStamp: serverTimestamp()
                        })
                        const message = {
                            type:"success",
                            message:"Successful"
                        }   
                        return message
                    }
                    const message = {
                    type:"error",
                    message:"You have already received an Invite from this user"
                }
                return message
                }
            const message = {
                type:"error",
                message:"You have already sent an invite to this user"
            }
            return message
            }
        const message = {
        type:"error",
        message:"This user is already in your contact list"
    }
    return message
    }
    const message = {
        type:"error",
        message:"This user does not exist on our database"
    }
    return message
    }

    const acceptInvite = async (invite,id) => {
        await setDoc(doc(collection(db, `user/${mainUser.email}/contacts`)),{
            sender:invite.sender,
            displayName:invite.displayName,
            photoURL:invite.photoURL,
            blocked:false,
            timeStamp:null
        })
        await setDoc(doc(collection(db, `user/${invite.sender}/contacts`)),{
            sender:mainUser.email,
            displayName:mainUser.displayName,
            photoURL:mainUser.photoURL,
            blocked:false,
            timeStamp:null
        })
        await deleteDoc(doc(db, `user/${mainUser.email}/receivedInvites`, id));
        const doc1 = await getDocs(query(collection(db, `user/${invite.sender}/sentInvites`), where("receiver","==",mainUser.email)))
        await deleteDoc(doc(db, `user/${mainUser.email}/receivedInvites`, doc1.docs[0].id));
        return {
            type:"success",
            message:"Contact succesfully accepted"
        }   
    }
    const rejectInvite = async (invite,id) => {
        await deleteDoc(doc(db, `user/${mainUser.email}/receivedInvites`, id));
        const doc1 = await getDocs(query(collection(db, `user/${invite.sender}/sentInvites`), where("receiver","==",mainUser.email)))
        await deleteDoc(doc(db, `user/${mainUser.email}/receivedInvites`, doc1.docs.id));
        return {
            type:"success",
            message:"Invite Rejected"
        }
    }

    const blockContact = async(id) =>{
        await updateDoc(doc(db, `user/${mainUser.email}/contacts`, id),{
            blocked:true
        })
        return {
            type:"success",
            message:"Blockedtttttt"
        }
    }
    const unblockContact = async(id) => {
        await updateDoc(doc(db, `user/${mainUser.email}/contacts`, id),{
            blocked:false
        })
        return {
            type:"success",
            message:"User UnBlocked"
    }
    }
    const deleteContact = async(email,id) =>{
        await deleteDoc(doc(db, `user/${mainUser.email}/contacts`, id))
        const doc1 = await getDocs(query(collection(db, `user/${email}/contacts`), where("sender","==",mainUser.email)))
        await deleteDoc(doc(db, `user/${email}/contacts`, doc1.docs[0].id))

        return {
            type:"success",
            message:"Contact Deleted"
        }
    }
  const value ={
    sendMessage,
    sendInvite,
    acceptInvite,
    rejectInvite,
    blockContact,
    unblockContact,
    deleteContact
  }
  return (
    <ControlsContext.Provider value={value}>
        {children}
    </ControlsContext.Provider>
  )
}
