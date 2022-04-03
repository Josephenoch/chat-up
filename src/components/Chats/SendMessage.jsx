import React,{useState} from 'react'


import {Box, IconButton} from "@mui/material"
import { EmojiEmotionsOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { Emoji } from '../Emoji'

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
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)
  const classes = useStyles() 
  const handleModal = () => {
    setModal(!modal)
  }
  const sendMessage = (e) =>{
      e.preventDefault()
      setMessage("")
  }

  return (
    <Box
        className={classes.root}
    >
        <IconButton
            onClick={handleModal}
        >
            <EmojiEmotionsOutlined
                
                sx={{
                    color:"gray"
                }}
            />
        </IconButton>
        <Emoji
            modal={modal}
            handleModal ={handleModal}
            setMessage={setMessage}
        />  
        <form className={classes.inputBox}>
            <input
                value={message}
                className={classes.sendInput}
                onChange={(e)=>setMessage(e.target.value)}
            />
            <button
                type="submit"
                onClick={sendMessage}
                style={{display:"none"}}
            ></button>
        </form>
    </Box>
  )
}
