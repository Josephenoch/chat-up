import { useRef, useEffect, useState } from "react"

import {Box} from "@mui/material"
import { makeStyles } from '@mui/styles'

import {UserHeader} from "../UserHeader"
import { Message } from './Message'
import { SendMessage } from "./SendMessage"
import { useChats } from "../../contexts/ChatsContext"

import { useParams , useLocation} from 'react-router-dom'
import "./chats.css"
import { onSnapshot,collection,query, orderBy } from "firebase/firestore"
import { db } from "../../firebase-config"
import { NoActiveChat } from "./NoActiveChat"
import { useAuth } from "../../contexts/AuthContext"
import { CircleSpinner } from "react-spinners-kit";


const useStyles = makeStyles({
    root:{
        maxHeight:"100%",
        width:"70vw"
    },
    userHeaderBox:{
        width:"100%",
        zIndex:"99",
        
        
    },
    messageBox:{
        maxHeight:"85vh",
        minHeight:"85vh",
        overflowY:"auto",
        
    },
    sendBox:{
        width:"100%",
        background: "#f7f7f7",
        height:"7vh",
        display:"flex",
    }
})

export const Chats = () => {
  const classes = useStyles()
  const {user} = useChats()
  const {contacts,mainUser} = useAuth()
  const {roomId} = useParams()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState()
  
  const endDiv = useRef(null)

  const contact = contacts.filter(contact => contact.id===roomId)[0]

  useEffect(()=>{
    const fetchData = async () =>{
        const q = query(collection(db,`user/${mainUser.email}/contacts/${roomId}/messages`), orderBy("timeStamp"))
        await onSnapshot(q,snapShot=>{
            const array1 = snapShot.docs.map(data=>({
                
                data:data.data(),
                id:data.id
                
            }))
            setMessages(array1)
            setLoading(false)
        })
        
    }
    fetchData()
},[roomId])
 
  useEffect(()=>{
    if(contact && !contact.data.blocked){
        endDiv.current.scrollIntoView()
    }
  },[user])
  useEffect(()=>{
    if(contact && !contact.data.blocked){
        endDiv.current.scrollIntoView()
    }
  })
  

  if(contact && !contact.data.blocked){
        return (
      
            <Box className="chats">
                <Box
                    className={classes.root}
                >
                    <Box className={classes.userHeaderBox}>
                        <UserHeader
                            user={contact.data}
                        />
                    </Box>
                    <Box
                        className={classes.messageBox}
                    >
                        {loading?
                            <CircleSpinner size={18} color="#686769" loading={loading} />
                            :
                            messages.map((message) =>
                                    <Message
                                        key={message.id}
                                        message={message.data}
                                    />
                                )
                            }
                         <Box sx={{float:"right", clear:"both"}} ref={endDiv}></Box>

                    </Box>
                    <Box className={classes.sendBox}>
                    <SendMessage
                        contact={contact}
                    />
                    </Box>

                </Box>
                
            </Box>
        )
    }
    else{
        return <NoActiveChat/>
    }
}
