// react imports
import React,{useState} from 'react'

// mui imports
import {Box, IconButton} from "@mui/material"
import { EmojiEmotionsOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

// component import
import { Emoji } from '../Emoji'

// firebase import
import {serverTimestamp } from "firebase/firestore";

// context imports
import { useControls } from '../../Contexts/ControlsContext'

const useStyles = makeStyles({
    // styles
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
  // mui styles  
  const classes = useStyles() 

  // state variables   
  const [message, setMessage] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [modal, setModal] = useState(false)

  // sendMessage from controls context  
  const {sendMessage} = useControls()

  // handle the emoji modal   
  const handleModal = (e) => {
    setAnchorEl(e.currentTarget)
    setModal(!modal)
  }

  // handleSendMessage   
  const handleSendMessage = (e) =>{
      // stop the page from refreshing   
      e.preventDefault()

      // create the message object that will be sent to the server, using firebase serverTimeStamp so that the time is uniform
      const msg = {
          content:message,
          sentByMainUser:true,
          timeStamp: serverTimestamp()
      }
      
      // sending the message using the function from the controls context if the message is not empty
      if(message!==""){
          sendMessage(msg, contact)
      }

      // change the message state variable to an empty message
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
        {/* the emoji component */}
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
                onClick={handleSendMessage}
                style={{display:"none"}}
            ></button>
        </form>
    </Box>
  )
}
