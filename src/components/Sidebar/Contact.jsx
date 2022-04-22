import React from 'react'

import {Avatar, Box, Typography, Paper} from "@mui/material"

import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';


const useStyles = makeStyles({
    rootContainer:{
        width:"100%",
        padding:"10px 0 0 0",
        "&:hover":{
            background: "#ebebeb"
        },
        "&:active":{
            background:"#f6f6f6"
        }
    },
    childContainer:{
        display:"flex",
        width:"90%",
        padding:'0.5rem',
        position:"relative",
        margin:"0px auto",
        borderBottom:"1px solid #e1e1e1",
        overflow:"hidden"
        
    },
    textBox:{
        marginLeft:"10px",
        width:"100%",
        flex:"1",
        
    },
    text:{
        overflow: "hidden",
        textOverflow: "ellipsis", 
        whiteSpace:"nowrap",
    },
    date:{
        position:"absolute",
        right:"2%",
        
    }
})

export const Contact = ({contact,id}) => {
  const theme = useTheme()
  const classes = useStyles()
    
    return(
        <Paper 
            className={classes.rootContainer} 
        >
            
            <Link 
                to={`${id}`}
                style={{
                    textDecoration:"none",
                    color:theme.palette.mode ==="dark" ? "white" : "black",
                }}
            >
                <Box
                    className={classes.childContainer}
                >
                    <Box className={classes.avatarBox}>
                        <Avatar src={contact.photoURL}/>
                    </Box>
                    <Box
                        className={classes.textBox}
                    >
                        <Typography
                            variant="body2"
                            className={classes.text}
                            sx={{
                                width:"50%"
                            }}
                        >
                            {`${contact.displayName}`}
                        </Typography>
                        
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            className={classes.text}
                            sx={{
                                display:"block",
                                width:"90%"
                            }}
                        >
                            
                            {contact.sender}
                        </Typography>
                    </Box>

                </Box>
            </Link>
        </Paper>
    )
}
