// react imports
import React from 'react'

// mui imports
import { Typography, Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme} from '@mui/styles'

export const LandingHeader = () => {
    // maing use of the useTheme context provided by mui
    const theme = useTheme()

    // styles
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

    // use mui styles
    const classes = useStyles()
  return (
    <>
        {/* placeholder for the logo */}
        <Typography variant="h5" color={theme.palette.primary.main}>
            Chat<sup>up</sup>
        </Typography>
        <Box
            className={classes.linkContainer}
        >    
            <Typography variant="string" color="textSecondary">
                <a 
                    href="https://github.com/josephenoch" 
                    target="_blank"
                    className={classes.links}
                    rel="noreferrer"
                >
                    <Button variant="contained">About</Button>
                </a>
            </Typography>
        </Box>
    </>
  )
}
