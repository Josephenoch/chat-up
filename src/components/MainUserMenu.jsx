import React,{useState} from 'react'

import {Menu, MenuItem, Modal, Box, Paper, Typography, Avatar, Button} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  modalContainer:{
    position:"absolute",
    top:"50%",
    left:"50%",
    width:"30vw",
    height:"40vh",
    overflowY:"auto",
    overflowX:"hidden",
    transform: 'translate(-50%, -50%)',
    padding:"30px",
    display:"flex",
    alignItems:"center",
    flexDirection:"column"
  }
})
export const MainUserMenu = ({menu,closeMenu,anchorEl}) => {
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
  const [inviteModal, setInviteModal] = useState(false)
  const classes = useStyles()
  const handleInviteModal = () => {
    closeMenu()
    setInviteModal(!inviteModal)
  }
  return (
    <>
      <Menu
        open={menu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        onClose={closeMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleInviteModal}>View Invites</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
      <Modal
        open={inviteModal}
        onClose={handleInviteModal}

      >
        <Paper
          className={classes.modalContainer}
        >
          <Typography variant="h5" sx={{marginBottom:"20px"}}>
            Review Invites
          </Typography>
          {invites.map(invite=>
            <Box 
              sx={{
                marginTop:"20px",
                display:"flex", 
                width:"100%",
                border:"1px solid #e1e1e1",
                padding:"10px",
                borderRadius:"20px"
              }}
            >
              <Avatar src={`https://avatars.dicebear.com/api/human/${invite.id}.svg`}/>
              <Box sx={{ marginLeft:"10px", width:"60%" }}>
                <Typography variant="body2" color="primary">{invite.email.toLowerCase()}</Typography>
                <Typography variant="caption" color="textSecondary">invite.name</Typography>
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
          )
          }
          
          
        </Paper>
      </Modal>
    </>
  )
}
