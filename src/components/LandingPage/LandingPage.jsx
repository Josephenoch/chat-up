import React from 'react'

import { Paper, Box, Typography,} from '@mui/material'
import { useTheme, makeStyles } from '@mui/styles'

import { LandingHeader } from './LandingHeader'
import { LandingLeft } from './LandingLeft'

import LandingSvg from "../../assets/landingPage.svg"


export const LandingPage = () => {
  const theme = useTheme()
  const useStyles = makeStyles({
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
        display:"flex",
        alignItems:"center",
        position:"relative"
    }
})
  const classes = useStyles()
  return (
    <Box
        className={classes.root}
    >
        <Paper
            className={classes.container}
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
                            width:"45%"
                        }}
                    >
                        <LandingLeft/>
                    </Box>
                    <Box 
                        sx={{
                            width:"50%",
                            marginLeft:"10%"
                        }}
                    >
                        <img 
                            src={LandingSvg} 
                            style={{
                                width:"500px"
                            }}
                        />
                    </Box>
                </Box>
            </Box>

        </Paper>

    </Box>
  )
}
