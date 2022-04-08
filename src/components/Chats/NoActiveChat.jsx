import React from 'react'

import{Box, Paper} from "@mui/material"
import {makeStyles} from "@mui/styles"
import img from "../../assets/unopenedMessage.svg"

import "./chats.css"
const useStyles = makeStyles({
    root:{
        height:"100%",
        width:"70vw",
        display:"flex",
        alignItems:"center"

    },
    imgContainer:{
        width:400,
        height:400,
        borderRadius:400,
        margin:"auto",
        background:"white"
    },
    img:{
        width:400,
  
    }
})

export const NoActiveChat = () => {
  const classes = useStyles()
  return (
    <Box className="chats">
        <Box
            className={classes.root}
        >
            <Box className={classes.imgContainer}>
                <img src={img} className={classes.img}></img>
            </Box >
        </Box>
    </Box>
  )
}
