import React,{useState} from 'react'

import {Modal, Box, Paper, Typography, Avatar, Button, IconButton} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CancelOutlined } from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

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
  const blockedContacts = contacts.filter(contact => contact.data.blocked === true)
  const classes = useStyles()
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
            // onClick={()=>handleInvite(invite.id)}
        >
            Accept
        </Button>
        <Button 
            color="secondary" 
            size="small" 
            variant="outlined"
            // onClick={()=>handleInvite(invite.id)}
        >
            Reject
        </Button>
        </Box>
    )
  return (
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
            blockedContacts.length>0?Blocked:<Typography variant='h3'>No Blocked</Typography>
          }  
        </Paper>
    </Modal>
  )
}
