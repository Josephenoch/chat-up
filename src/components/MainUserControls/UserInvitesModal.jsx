import React,{useState} from 'react'

import {Modal, Box, Paper, Typography, Avatar, Button, IconButton} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CancelOutlined } from '@mui/icons-material'

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
  inviteBox:{
    width:"100%",
    display:"flex", 
    padding:"10px",
    marginTop:"20px",
    borderRadius:"20px",
    border:"1px solid #e1e1e1"
}
})

export const UserInvitesModal = ({inviteModal, handleInviteModal}) => {
  const [invites, setInvites] = useState([
    {
      name:"Chukwuebuka Danladi",
      email:"DanChuks@gmail.com",
      id:1
    },
    {
      name:"Nasir Ugochukwu",
      email:"NasUgochuks@gmail.com",
      id:2
    },
    {
      name:"Adewale Orsar",
      email:"sarAdewale@gmail.com",
      id:3
    }
  ])
  const handleInvite = (id) =>{
    const newArray = invites.filter(invite=>invite.id !== id)
    setInvites(newArray)
  }
  const classes = useStyles()
  return (
    <Modal
        open={inviteModal}
        onClose={handleInviteModal}
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
            onClick={handleInviteModal}
          >
            <CancelOutlined/>
          </IconButton>
          <Typography variant="h5" sx={{marginBottom:"20px"}}>
              Review Invites
          </Typography>
          
          {invites.map(invite=>
              <Box 
                className={classes.inviteBox}
                key={invite.id}
              >
                <Avatar src={`https://avatars.dicebear.com/api/human/${invite.id}.svg`}/>
                <Box sx={{ marginLeft:"10px", width:"60%" }}>
                    <Typography variant="body2" color="primary">{invite.email.toLowerCase()}</Typography>
                    <Typography variant="caption" color="textSecondary">{invite.name}</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    size="small" 
                    sx={{marginRight:"10px"}}
                    onClick={()=>handleInvite(invite.id)}
                >
                    Accept
                </Button>
                <Button 
                    color="secondary" 
                    size="small" 
                    variant="outlined"
                    onClick={()=>handleInvite(invite.id)}
                >
                    Reject
                </Button>
              </Box>
          )}  
        </Paper>
    </Modal>
  )
}
