import React from 'react'

import { SearchOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
import {Box} from "@mui/material"

const useStyles = makeStyles({
    root:{
        background: "#f7f7f7",
        padding: "0 0.75rem",
        height:"6vh",
        display:"flex",
        alignItems:"center"
    },
    inputBox:{
        display:"flex",
        width:"100%",
        background:"white",
        padding: "0.2rem",
        borderRadius:"20px"
    },
    inputStyle:{
        flex:"1",
        border:"0px",
        padding: "0.2rem",
        "&:focus":{
            outline: "none",  
        }
    }
})

export const SidebarSearch = () => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}    
    >
        <Box
            className={classes.inputBox}
        >
            <SearchOutlined
                sx={{
                    color:"gray",
                    padding: "0.2rem",
                    fontSize:"1em",
                }}
            />
            <input 
                placeholder="Search or start a new chat"
                className={classes.inputStyle}       
            />
        </Box>
    </Box>
  )
}
