import { Alert, Box, Button, FormGroup, Paper, Typography } from '@mui/material'
import React from 'react'

import { makeStyles } from '@mui/styles'

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

export const SignIn = () => {
  const error = true
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
                Sign In
            </Typography>
           <FormGroup className={classes.formGroup}>
               <Button variant="contained">Sign In with Google</Button>
           </FormGroup>
           <FormGroup className={classes.formGroup}>
               <Button variant="contained">Sign In with Twitter</Button>
           </FormGroup>
           <Box className={classes.formGroup}>
               {error&&<Alert severity="error"> Wrong!</Alert>}
           </Box>
        </Paper>
    </Box>
  )
}
