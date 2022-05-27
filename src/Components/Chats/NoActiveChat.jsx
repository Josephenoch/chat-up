// react imports
import React from 'react'

// mui imports
import{Box} from "@mui/material"
import {makeStyles} from "@mui/styles"

// image imports
import img from "../../Assets/unopenedMessage.svg"

// css styles import
import "./chats.css"

const useStyles = makeStyles({
    // styles 
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
  //using mui styles
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
