import React from 'react'

import {Avatar, Box, Typography} from "@mui/material"
import { DoneAll } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

// import { Link } from 'react-router-dom';

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

export const Contact = ({contact}) => {
  const classes = useStyles()
  return (
    <Box 
        className={classes.rootContainer}>
        <Box
            className={classes.childContainer}
        >
            <Box className={classes.avatarBox}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${contact.id}.svg`}/>
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
                    {`${contact.firstName} ${contact.lastName}`}
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
                    <DoneAll fontSize="1px" sx={{marginRight:"5px"}}/>
                    {`${contact.messages[0].content}`}
                </Typography>
            </Box>
            <Box
                className={classes.date}
            >
                <Typography
                    variant="caption"
                    className={classes.text}
                    sx={{
                        width:"35%"
                    }}
                >
                    {contact.messages[0].date.slice(0,24)}
                </Typography>
            </Box>

        </Box>
    </Box>
  )
}
