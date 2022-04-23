import React from 'react'

import { makeStyles } from '@mui/styles';
import {Box} from "@mui/material"

const useStyles = makeStyles({
    root:{
        background: "#f7f7f7",
        padding: "0 0.75rem",
        height:"6vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    },
    containerBox:{
        display:"flex",
        background:"white",
        padding: "0.5rem 2rem",
        borderRadius:"20px",
        cursor:"pointer"
    }
})

export const SidebarSwitch = ({normalContact, setNormalContact}) => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}    
    >
        <Box
            className={classes.containerBox}
            onClick={()=>setNormalContact(!normalContact)}
        >
            {normalContact?"Contact List":"Contacts You've chatted with"}
        </Box>
    </Box>
  )
}
