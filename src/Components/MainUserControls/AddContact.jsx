// react imports
import React, { useState } from 'react'

// mui imports
import { makeStyles } from '@mui/styles'
import { Modal, Typography, Paper, TextField, Button, FormGroup, Snackbar, Alert } from '@mui/material'

// context imports
import { useControls } from '../../Contexts/ControlsContext'
import { useAuth } from '../../Contexts/AuthContext'

const useStyles = makeStyles({
  // styles
  modalContainer:{
    top:"50%",
    left:"50%",
    width:"30vw",
    height:"20vh",
    display:"flex",
    padding:"30px",
    overflowY:"auto",
    overflowX:"hidden",
    alignItems:"center",
    borderRadius:"20px",
    position:"absolute",
    flexDirection:"column",
    transform: "translate(-50%, -50%)"
  }
})

export const AddContact = ({addCntctModal, handleAddCntctModal}) => {
  // make use of mui styles
  const classes = useStyles()

  // creating the mainUser object using the object destructing from the Auth context
  const {mainUser} = useAuth()

  // creating the sendInvite function object using the object destructing from the Auth context
  const {sendInvite} = useControls()

  // state variables
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState("")

  // the handleSubmit fucntion
  const handleSubmit = async (e) =>{

    // prevent the site from refreshing on send
    e.preventDefault()

    // sending the invite if the receiver isn't the sender
    if(email!==mainUser.email){
      const message = await sendInvite(email.toLowerCase())
      setStatus(message)
    }

    // else setting the status to an error
    else{
      setStatus({
          type:"error",
          message:"You cannot send yourself an invite"
      })
    }
    setEmail("")
      
  }
  return (
    <>
        <Modal
            open={addCntctModal}
            onClose={handleAddCntctModal}
        >
            <Paper className={classes.modalContainer}>
              <Typography variant="h5" sx={{marginBottom:"20px"}} >
                  Add Contact
              </Typography>
              <form onSubmit={handleSubmit}style={{width:"100%"}}>
                <FormGroup >
                    <TextField
                        fullWidth
                        type="email"
                        label="Enter Email"
                        required
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        InputProps={{
                            endAdornment: 
                                <Button
                                    type="submit"
                                    variant="outlined"
                                >
                                Add
                                </Button>
                            }}
                    />
                </FormGroup>
              </form>
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
