import React, { useState } from 'react'

import { makeStyles } from '@mui/styles'
import { Modal, Typography, Paper, TextField, Button, FormGroup } from '@mui/material'

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
  const [email, setEmail] = useState()
  const handleSubmit = () =>{
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
            <FormGroup sx={{width:"100%"}}>
                <TextField
                    fullWidth
                    type="email"
                    label="Enter Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    InputProps={{
                        endAdornment: 
                            <Button
                                onClick={handleSubmit}
                            >
                            Add
                            </Button>
                        }}
                />
            </FormGroup>

        </Paper>
    </Modal>
  )
}
