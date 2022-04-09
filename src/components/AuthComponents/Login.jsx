import { Box, Button, FormGroup, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root:{
        width:"100vw",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        background:"#e1ffc7"
    },
    formContainer:{
        minWidth:"400px",
        maxWidth:"90vw",
        height:"400px",
        background:"white",
        padding:"20px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    formGroup:{
        marginTop:"40px",
        width:"100%"
    }
})

export const Login = () => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}
    >
        <Paper 
            className={classes.formContainer}
        >
            <Typography
                variant="h3"
                sx={{marginTop:"30px"}}
            >
                Log In
            </Typography>
           <FormGroup className={classes.formGroup}>
               <TextField label="Email" type="email"/>
           </FormGroup>
           <FormGroup className={classes.formGroup}>
               <TextField label="Password" type="Password"/>
           </FormGroup>
           <FormGroup className={classes.formGroup}>
               <Button variant="contained" sx={{backgroundColor:"#648746"}}>Log In</Button>
           </FormGroup>
           <Typography variant='caption' sx={{marginTop:"20px"}}>
                <Link to="signin">Forgot Password</Link>
            </Typography>
        </Paper>
        <Typography variant='caption' sx={{marginTop:"20px"}}>
            New here? <Link to="signin">Sign up</Link>
        </Typography>
    </Box>
  )
}
