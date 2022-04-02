import {Box} from "@mui/material"
import { makeStyles } from '@mui/styles'

import {UserHeader} from "../UserHeader"
import { Message } from './Message'
import { SendMessage } from "./SendMessage"

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

export const Chats = ({user}) => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}
    >
        <Box className={classes.userHeaderBox}>
            <UserHeader/>
        </Box>
        <Box
            className={classes.messageBox}
        >
            {user.contacts[0].messages.map((message) =>
                    <Message
                        key={message.id}
                        message={message}
                    />
                )
            }
            
        </Box>
        <Box className={classes.sendBox}>
           <SendMessage/>
        </Box>

        
    </Box>
  )
}
