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
        float: "left",
    },
    messagContent:{
        fontSize:"15px",
    },
    date:{
        fontSize:"12px",
        marginTop:"5px",
        marginLeft:"5px",
        float:"right"
    },
})


export const Message = ({message}) => {
  const classes = useStyles()
//   console.log(new Date(message.timeStamp.toDate()))
  return (
    <Box
        className={`${classes.rootContainer} ${message.sentByMainUser ? classes.sent: classes.received}`}
    >
        <Typography
            className={classes.messageContent}
            variant="span"
        >
            {message.content}
        </Typography>
        <Box
            className={classes.date}
        >
            <Typography
                
                variant="span"
                color="textSecondary"
            >
                {new Date(message.timeStamp?.toDate()).toUTCString()}

            </Typography>
        </Box>
    </Box>
  )
}
