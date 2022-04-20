import React,{useState} from 'react'

import {Modal, Box, Paper, Typography, Avatar, Button, IconButton, Snackbar, Alert} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CancelOutlined } from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'
import { useControls } from '../../contexts/ControlsContext'


import notFound from "../../assets/notFound.svg"

const useStyles = makeStyles({
  modalContainer:{
    top:"50%",
    left:"50%",
    width:"30vw",
    height:"40vh",
    display:"flex",
    padding:"30px",
    overflowY:"auto",
    overflowX:"hidden",
    alignItems:"center",
    borderRadius:"20px",
    position:"absolute",
    flexDirection:"column",
    transform: "translate(-50%, -50%)"
  },
  blockedBox:{
    width:"100%",
    display:"flex", 
    padding:"10px",
    marginTop:"20px",
    borderRadius:"20px",
    border:"1px solid #e1e1e1"
}
})

export const BlockedContacts = ({blockedContactsModal, handleBlockedContactsModal}) => {
  const {contacts} = useAuth()
  const {unblockContact, deleteContact} = useControls()
  const blockedContacts = contacts.filter(contact => contact.data.blocked === true)
  const [status, setStatus] = useState(null)
  const classes = useStyles()
  const handleUnblock = async (id) =>{
    const stat = await unblockContact(id)
    setStatus(stat)
  }
  const handleDelete =  async (email,id) => {
    await deleteContact(email,id)
  }
  const Blocked = 
    blockedContacts.map(contact=>
        <Box 
        className={classes.blockedBox}
        key={contact.id}
        >
        <Avatar src={contact.data.photoURL}/>
        <Box sx={{ marginLeft:"10px", width:"60%" }}>
            <Typography variant="body2" color="primary">{contact.data.sender.toLowerCase()}</Typography>
            <Typography variant="caption" color="textSecondary">{contact.data.displayName}</Typography>
        </Box>
        <Button 
            variant="contained" 
            size="small" 
            sx={{marginRight:"10px"}}
            onClick={()=>handleUnblock(contact.id)}
        >
            UnBlock
        </Button>
        <Button 
            color="secondary" 
            size="small" 
            variant="outlined"
            onClick={()=>handleDelete(contact.data.sender,contact.id)}
        >
            Delete
        </Button>
        </Box>
    )
  return (
    <>
      <Modal
          open={blockedContactsModal}
          onClose={handleBlockedContactsModal}
      >
          <Paper
          className={classes.modalContainer}
          >
            <IconButton
              sx={{
                top:"5px",
                right:"10px",
                position:"absolute"
              }}
              onClick={handleBlockedContactsModal}
            >
              <CancelOutlined/>
            </IconButton>
            <Typography variant="h5" sx={{marginBottom:"20px"}}>
                Review Blocked Contacts
            </Typography>
            
            {
              blockedContacts.length>0
                ?
                  Blocked:
                <>
                  <img src={notFound} style={{width:"200px", marginBottom:"30px"}} alt="Not Found"/>
                  <Typography variant="caption"> No Blocked Contacts</Typography>
                </>
            }  
          </Paper>
      </Modal>
      <Snackbar
            open={status}
            autoHideDuration={3000}
            onClose={() => setStatus(null)}
        >
          {status&&<Alert  severity={status.type==="success"?"success":"error"}sx={{ width: '100%' }}>
            {status.message}
        </Alert>}
      </Snackbar>
    </>
  )
}
