// react imports
import React from 'react'

// mui imports
import { Paper, Box} from '@mui/material'
import { useTheme, makeStyles } from '@mui/styles'

// components imports
import { LandingHeader } from './LandingHeader'
import { LandingLeft } from './LandingLeft'
import { LandingRight } from './LandingRight'



export const LandingPage = () => {
  // making use of the useTheme context provided by mui
  const theme = useTheme()
  const useStyles = makeStyles({
    // styles
    root:{
        minWidth:"100vw",
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:theme.palette.primary.alt,
        
    },
    container:{
        width:"80%",
        height:"90%"
    },
    content:{
        margin:"70px",
        marginTop:"40px",
        display:"flex",
        alignItems:"center",
        position:"relative"
    }
  })

  // make use of mui styles
  const classes = useStyles()
  return (
    // the parent component for the landing page
    <Box
        className={classes.root}
    >
        <Paper
            className={classes.container}
            elevation={6}
        >
            <Box
                sx={{
                    width:"100%",
                }}
            >
                <Box
                    className={classes.content}
                >
                    <LandingHeader/>
                    
                </Box>
                <Box
                    className={classes.content}
                >
                    <Box 
                        sx={{
                            width:"45%",
                            clear:"both"
                        }}
                    >
                        <LandingLeft/>
                    </Box>
                    <Box 
                        sx={{
                            width:"50%",
                            marginLeft:"10%",
                            position:"relative"
                        }}
                    >
                       <LandingRight/>
                    </Box>
                </Box>
            </Box>

        </Paper>

    </Box>
  )
}
