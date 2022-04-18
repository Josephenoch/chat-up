import React, { useEffect, useState } from 'react'

import {Avatar, Box, Typography, Paper} from "@mui/material"
import { DoneAll } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import { onSnapshot,collection,doc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useAuth } from '../../contexts/AuthContext';


// import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    rootContainer:{
        width:"100%",
        padding:"10px 0 0 0",
        "&:hover":{
            background: "#ebebeb"
        },
        "&:active":{
            background:"#f6f6f6"
        }
    },
    childContainer:{
        display:"flex",
        width:"90%",
        padding:'0.5rem',
        position:"relative",
        margin:"0px auto",
        borderBottom:"1px solid #e1e1e1",
        overflow:"hidden"
        
    },
    textBox:{
        marginLeft:"10px",
        width:"100%",
        flex:"1",
        
    },
    text:{
        overflow: "hidden",
        textOverflow: "ellipsis", 
        whiteSpace:"nowrap",
    },
    date:{
        position:"absolute",
        right:"2%",
        
    }
})

export const Contact = ({contact,id}) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const {mainUser} = useAuth()
  const classes = useStyles()
  useEffect(()=>{
      const fetchData = async () =>{
        await onSnapshot(collection(db,`user/${mainUser.email}/contacts/${id}/messages`),snapShot=>{
            setMessages(snapShot.docs)
        })
        setLoading(false)
      }
    fetchData()
    // console.log(newArray)
    

}
,[])
  return (
    <Paper 
        className={classes.rootContainer} 
    >
            
        {loading?"loading":<Link 
            to={`${id}`}
            style={{
                textDecoration:"none",
                color:theme.palette.mode ==="dark" ? "white" : "black",
            }}
        >
            <Box
                className={classes.childContainer}
            >
                <Box className={classes.avatarBox}>
                    <Avatar src={contact.photoURL}/>
                </Box>
                <Box
                    className={classes.textBox}
                >
                    <Typography
                        variant="body2"
                        className={classes.text}
                        sx={{
                            width:"50%"
                        }}
                    >
                        {`${contact.displayName}`}
                    </Typography>
                    
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className={classes.text}
                        sx={{
                            display:"block",
                            width:"90%"
                        }}
                    >
                        {contact.messages[contact.messages.length-1].sentByMainUser&&<DoneAll fontSize="1px" sx={{marginRight:"5px"}}/>}
                        {`${contact.messages[contact.messages.length-1].content}`}
                    </Typography>
                </Box>
                <Box
                    className={classes.date}
                >
                    <Typography
                        variant="caption"
                        className={classes.text}
                        sx={{
                            width:"35%"
                        }}
                    >
                        {new Date(contact.messages[contact.messages.length-1].timeStamp?.toDate()).toUTCString()}
                    </Typography>
                </Box>

            </Box>
        </Link>}
    </Paper>
  )
}
