import {Box} from "@mui/material"
import { makeStyles } from '@mui/styles'

import {UserHeader} from "../UserHeader"
import { Message } from './Message'
import { SendMessage } from "./SendMessage"
import { useChats } from "../../contexts/ChatsContext"

import { useParams } from 'react-router-dom'
import "./chats.css"
import { NoActiveChat } from "./NoActiveChat"

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

  const {roomId} = useParams()
  
  const contact =user.contacts.filter(contact => contact.id===roomId)[0]
  
  
  if(contact){
        return (
      
            <Box className="chats">
                <Box
                    className={classes.root}
                >
                    <Box className={classes.userHeaderBox}>
                        <UserHeader
                            user={contact}
                        />
                    </Box>
                    <Box
                        className={classes.messageBox}
                    >
                        {contact.messages.map((message) =>
                                <Message
                                    key={message.id}
                                    message={message}
                                />
                            )
                        }
                        
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
