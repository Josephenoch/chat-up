import React, { useState } from 'react'

import { makeStyles } from '@mui/styles'
import { Modal, Typography, Paper, TextField, Button, FormGroup, Snackbar, Alert } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

const useStyles = makeStyles({
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
  const classes = useStyles()
  const {mainUser,addUser} = useAuth()
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState("")
  const handleSubmit = async (e) =>{
      e.preventDefault()
      if(email!==mainUser.email){
        const message = await addUser(email)
        setStatus(message)
      }
      else{
        setEmail("")
        setStatus({
            type:"error",
            message:"You cannot send yourself an invite"
        })
      }
      
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
          {status&&<Alert  severity={status.type=="success"?"success":"error"}sx={{ width: '100%' }}>
            {status.message}
        </Alert>}
      </Snackbar>
    </>
  )
}
