import React from 'react'

import {Box, Typography} from "@mui/material"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    rootContainer:{ 
        maxWidth:"60%",
        width:"auto",
        display:"inline-block",
        clear: "both",
        margin:"20px",
        position:"relative",
        padding:"10px",
    },
    sent:{
        borderRadius:"5px 0px 5px 5px",
        background:"#e1ffc7",
        float: "right",
    },
    received:{
        background: "#fff",
        borderRadius: "0px 5px 5px 5px",
        
    }
})


export const Message = ({mainUser}) => {
  const classes = useStyles()
  return (
    <Box
        className={`${classes.rootContainer} ${mainUser ? classes.sent: classes.received}`}
    >
        <Typography
            sx={{fontSize:"15px"}}
            variant="span"
        >
            Hi Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium mollitia quod eum sint totam odit modi temporibus odio, nostrum earum animi dolores placeat inventore doloribus ullam recusandae numquam iusto! Saepe?
        </Typography>
        <Typography
            sx={{
                fontSize:"15px",
                position:"absolute",
                right:"10px"
            }}
            variant="span"
            color="textSecondary"
        >
            {"20/20/2002"}
        </Typography>
    </Box>
  )
}
