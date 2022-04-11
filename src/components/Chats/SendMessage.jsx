import React,{useState} from 'react'


import {Box, IconButton} from "@mui/material"
import { EmojiEmotionsOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { Emoji } from '../Emoji'
import { useChats } from '../../contexts/ChatsContext'
import { useParams } from 'react-router-dom'

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

export const SendMessage = ({contact}) => {
  const [message, setMessage] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)

  const [modal, setModal] = useState(false)
  const {addMessage} = useChats()
  const classes = useStyles() 
  const handleModal = (e) => {
    setAnchorEl(e.currentTarget)
    console.log(e.currentTarget)

    setModal(!modal)
  }
  const sendMessage = (e) =>{
      e.preventDefault()
      if(message!==""){
          addMessage(message, contact.id)
      }
      setMessage("")
  }

  return (
    <Box
        className={classes.root}
    >
        <IconButton
            onClick={(e)=>handleModal(e)}
        >
            <EmojiEmotionsOutlined
                
                sx={{
                    color:"gray"
                }}
            />
        </IconButton>
        <Emoji
            modal={modal}
            handleModal={handleModal}
            setMessage={setMessage}
            anchorEl={anchorEl}
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
