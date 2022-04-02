import React from 'react'

import {Box, Avatar, Typography} from "@mui/material"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root:{
        paddingLeft:"2%",
        width:"100%",
        height:"8vh",
        background:"#ededed",
        display:"flex",
        alignItems:"center",
        borderLeft:"1px solid #e1e1e1"
    }
})

export const UserHeader = ({user}) => {
  const classes = useStyles()
  return (
    <Box
        className={classes.root}
    >
        <Avatar 
            src={`https://avatars.dicebear.com/api/human/${user.id}.svg`}
        />
        <Box
            sx={{
                marginLeft:"0.5vw"
            }}
        >
            <Typography
                variant="body2"
            >
                {`${user.firstName} ${user.lastName}`}
            </Typography>
        </Box>
    </Box>
  )
}
