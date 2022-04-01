import React from 'react'
import {Box, Avatar, Typography} from "@mui/material"

export const UserHeader = () => {
  const id = 1 
  return (
    <Box
        sx={{
        width:"100%",
        height:"8vh",
        background:"#ededed",
        display:"flex",
        alignItems:"center",
        borderLeft:"1px solid #e1e1e1"
    }}
    >
        <Avatar 
            src={`https://avatars.dicebear.com/api/human/${id}.svg`}
        />
        <Box
            sx={{
                marginLeft:"0.5vw"
            }}
        >
            <Typography
                variant="body2"
            >
                {`${"John"} ${"Doe"}`}
            </Typography>
        </Box>
    </Box>
  )
}
