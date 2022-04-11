import React from 'react'

import { Typography, Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme} from '@mui/styles'


import { Link } from 'react-router-dom'

export const LandingHeader = () => {
    const theme = useTheme()
    const useStyles = makeStyles({
        linkContainer:{
            position:"absolute",
            right:"5%"
        },
        links:{
            textDecoration:"none",
            color:"black",
            marginLeft:"70px",
            fontSize:"1.2rem"
        }
    })
    const classes = useStyles()
  return (
    <>
        <Typography variant="h5" color={theme.palette.primary.main}>
            Chat<sup>up</sup>
        </Typography>
        <Box
            className={classes.linkContainer}
        >
            <Typography 
                variant="string" 
                color="textSecondary"
            >
                <Link 
                    to="signup" 
                    className={classes.links}
                >Sign Up</Link>
            </Typography>
            <Typography variant="string" color="textSecondary">
                <Link 
                    to="login" 
                    className={classes.links}
                >Log In</Link>
            </Typography>
            
            <Typography variant="string" color="textSecondary">
                <a 
                    href="https://github.com/josephenoch" 
                    target="_blank"
                        className={classes.links}
                        rel="noreferrer"
                >
                    About
                </a>
            </Typography>
        </Box>
    </>
  )
}
