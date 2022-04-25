// react imports
import React from 'react'

// mui imports
import { Button, Typography, Box } from '@mui/material'
import { makeStyles, useTheme} from '@mui/styles'

// react-router-dom imports
import { Link } from 'react-router-dom'

export const LandingLeft = () => {
  // making use of the useTheme context provided by mui
  const theme = useTheme()

  const useStyles = makeStyles({
    // styles
    title:{
        width:"50%"
    },
    contentText:{
        textAlign:"justify",
        height:"200px"
    },
    
    circleContainer:{
        display:"flex",
        marginTop:"20px"
    },
    circle:{
        width:"15px",
        height:"15px",
        borderRadius:"50%",
        marginRight:"10px",
        background:theme.palette.primary.main

    }
  })

  // make use of mui styles
  const classes = useStyles()
  return (
    <>
        <Typography
            variant="h3"
            className={classes.title}
        >
            Creative Team
        </Typography>
        <Typography
            variant="body1"
            className={classes.contentText}
            sx={{
                marginTop:"30px"
            }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quo ducimus illum sint totam quaerat? Et maxime voluptatum id tenetur recusandae iusto sunt obcaecati perferendis laboriosam, necessitatibus ut ea distinctio?Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quo ducimus illum sint totam quaerat? Et maxime voluptatum id tenetur recusandae iusto sunt obcaecati perferendis laboriosam, necessitatibus ut ea distinctio?
        </Typography>

        <Button
            variant="contained"
            sx={{
                marginTop:"20px"
            }}
            component={Link}
            to="signin"

        >
            Get Started 
        </Button>
        <Box
            className={classes.circleContainer}
        >
            {/* the small circles with different opacity under the get started button */}
            <Box
                className={classes.circle}
                sx={{
                    opacity:"0.92"
                }}
            ></Box>
            <Box
                className={classes.circle}
                sx={{
                    opacity:"0.69"
                }}
            ></Box>
            <Box
                className={classes.circle}
                sx={{
                    opacity:"0.46"
                }}
            ></Box>
            <Box
                className={classes.circle}
                sx={{
                    opacity:"0.23"
                }}
            ></Box>
        </Box>
    </>
  )
}
