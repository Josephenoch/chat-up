import React from 'react'

import {Box, Typography} from "@mui/material"
import { makeStyles } from '@mui/styles'

import {UserHeader} from "../UserHeader"
import { Message } from './Message'
import { EmojiEmotionsOutlined } from '@mui/icons-material'

const useStyles = makeStyles({
    root:{
        overflowY:"auto",
        maxHeight:"100vh"
    },
    userHeaderBox:{
        position:"fixed",
        width:"100%",
        zIndex:"99",
        
    },
    sendBox:{
        position:"fixed ",
        bottom:"0",
        width:"100vw",
        background: "#f7f7f7",
        height:"7vh",
        
    },
    rootContainer:{
        margin:"0 auto",
        display:"flex",
        alignItems:"center",
        
    },
    inputBox:{
        flex:"1",
        background:"white",
        padding: "0.2rem",
    },
    sendInput:{
        width:'90%',
        border:"0px",
        padding: "0.2rem",
        "&:focus":{
            outline: "none",  
        }
    }
})

export const Chats = () => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}
    >
        <Box className={classes.userHeaderBox}>
            <UserHeader/>
        </Box>
        <Box
            className={classes.messagesBox}
        >
            <Message
                mainUser={true}
            />
            <Message
                mainUser={false}
            />
            <Message
                mainUser={true}
            />
            <Message
                mainUser={false}
            />
            
        </Box>
        <Box className={classes.sendBox}>
            <Box
                className={classes.rootContainer}
            >
                <EmojiEmotionsOutlined/>
                <Box className={classes.inputBox}>
                    <input
                        className={classes.sendInput}
                    />
                </Box>
            </Box>
        </Box>

        
    </Box>
  )
}
