import React, {useState, useEffect} from 'react'
import {Avatar, Box, Typography} from "@mui/material"
import { DoneAll } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    rootContainer:{
        width:"100%",
        padding:"10px 0 0 0",
        "&:hover":{
            background: "#ebebeb"
        }
    },
    childContainer:{
        display:"flex",
        width:"90%",
        padding:'0.5rem',
        position:"relative",
        margin:"0px auto",
        borderBottom:"0.5px gray solid",
        
    },
    textBox:{
        marginLeft:"10px"
    },
    date:{
        position:"absolute",
        right:"2%",
    }
})

export const Chat = () => {
  const classes = useStyles()
  const [id,setId] = useState()

  useEffect(()=>{
    setId(Math.floor(Math.random()*100))

  },[])
  return (
    <Box className={classes.rootContainer}>
        <Box
            className={classes.childContainer}
        >
            <Box className={classes.avatarBox}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
            </Box>
            <Box
                className={classes.textBox}
            >
                <Typography
                    variant="body1"
                >
                    {`${"John"} ${"Doe"}`}
                </Typography>
                <Typography
                    variant="caption"
                >
                    <DoneAll fontSize="1px" sx={{marginRight:"5px"}}/>{`${"Hi I'm new here"}`}
                </Typography>
            </Box>
            <Box
                className={classes.date}
            >
                yesterday
            </Box>

        </Box>
    </Box>
  )
}
