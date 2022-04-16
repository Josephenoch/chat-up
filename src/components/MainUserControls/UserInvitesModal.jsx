import React,{useState} from 'react'

import {Modal, Box, Paper, Typography, Avatar, Button, IconButton, Snackbar, Alert} from '@mui/material'
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
  const [status, setStatus] = useState(null)
  const {receivedInvites,acceptInvite} = useAuth()
  const classes = useStyles()
  const handleInvite = async (data,id) =>{
    const message = await acceptInvite(data,id)
    setStatus(message)
  }
  return (
    <>
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
            
            {receivedInvites.map(invite=>
                <Box 
                  className={classes.inviteBox}
                  key={invite.id}
                >
                  <Avatar src={invite.data.photoURL}/>
                  <Box sx={{ marginLeft:"10px", width:"60%" }}>
                      <Typography variant="body2" color="primary">{invite.data.sender.toLowerCase()}</Typography>
                      <Typography variant="caption" color="textSecondary">{invite.data.displayName}</Typography>
                  </Box>
                  <Button 
                      variant="contained" 
                      size="small" 
                      sx={{marginRight:"10px"}}
                      onClick={()=>handleInvite(invite.data,invite.id)}
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
            )}  
          </Paper>
      </Modal>
      <Snackbar
            open={status}
            autoHideDuration={3000}
            onClose={() => setStatus(null)}
        >
          {status&&<Alert  severity={status.type=="success"?"success":"error"}sx={{ width: '100%' }}>
            {status.message}
        </Alert>}
      </Snackbar>
    </>
  )
}
