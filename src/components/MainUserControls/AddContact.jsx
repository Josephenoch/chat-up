import React, { useState } from 'react'

import { makeStyles } from '@mui/styles'
import { Modal, Typography, Paper, TextField, Button, FormGroup } from '@mui/material'
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
  const {addUser} = useAuth()
  const [email, setEmail] = useState("")
  const handleSubmit = (e) =>{
      e.preventDefault()
      addUser(email)
      setEmail("")
  }
  return (
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
  )
}
