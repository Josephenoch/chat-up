import React from 'react'

import{Box} from "@mui/material"
import {makeStyles} from "@mui/styles"

import "./chats.jsx"
const useStyles = makeStyles({
    root:{
        maxHeight:"100%",
        width:"70vw"
    },
})

export const NoActiveChat = () => {
  return (
    <Box className="chats">
        <Box
            className={classes.root}
        >
            <img ></img>
        </Box>
    </Box>
  )
}
