import React from 'react'

import {Box} from "@mui/material"
import { EmojiEmotionsOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root:{
        width:"100%",
        padding: "0 0.75rem",
        display:"flex",
        alignItems:"center",
        flexDirection:"row"
    },
    
    inputBox:{
        display:"flex",
        width:"90%",
        marginLeft: "1rem",
        background:"white",
        padding: "0.3rem",
        borderRadius:"20px"
    },
    sendInput:{
        flex:"1",
        border:"0px",
        padding: "0.2rem",
        "&:focus":{
            outline: "none",  
        }
    }
})

export const SendMessage = () => {
  const classes = useStyles() 
  return (
    <Box
        className={classes.root}
    >
        <EmojiEmotionsOutlined
            sx={{
                color:"gray"
            }}
        />
        <Box className={classes.inputBox}>
            <input
                className={classes.sendInput}
            />
        </Box>
    </Box>
  )
}
