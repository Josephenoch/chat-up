import React, { useEffect, useState } from 'react'

import {Avatar, Box, Typography, Paper} from "@mui/material"
import { DoneAll } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import { onSnapshot,collection,doc, query, orderBy } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useAuth } from '../../contexts/AuthContext';

import { CircleSpinner } from "react-spinners-kit";
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
  const [message, setMessage] = useState()

  const {mainUser} = useAuth()
  const classes = useStyles()
  useEffect(()=>{
        if(contact.timeStamp!==""){
            const fetchData = async () =>{
                const q = query(collection(db,`user/${mainUser.email}/contacts/${id}/messages`), orderBy("timeStamp"))
                await onSnapshot(q,snapShot=>{
                    setMessage({
                        data:snapShot.docs[snapShot.docs.length-1].data(),
                        id:snapShot.docs[snapShot.docs.length-1].id
                    })
                    setLoading(false)
                })
                
            }
            fetchData()
        }
    },[])
    const ContactContent = 
    <Paper 
        className={classes.rootContainer} 
    >
            
        {loading?
        <CircleSpinner size={18} color="#686769" loading={loading} />
        :<Link 
            to={`${id}`}
            style={{
                textDecoration:"none",
                color:theme.palette.mode ==="dark" ? "white" : "black",
            }}
        >
            <Box
                className={classes.childContainer}
            >
                {console.log(loading)}
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
                        {message.data.sentByMainUser&&<DoneAll fontSize="1px" sx={{marginRight:"5px"}}/>}
                        {message.data.content}
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
                        {new Date(message.data.timeStamp?.toDate()).toUTCString()}
                    </Typography>
                </Box>

            </Box>
        </Link>}
    </Paper>
  return contact.timeStamp? ContactContent:null

}
