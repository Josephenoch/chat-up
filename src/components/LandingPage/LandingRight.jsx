import React from 'react'

import { Box } from '@mui/material'
import { useTheme} from '@mui/styles'

import LandingSvg from "../../assets/landingPage.svg"

export const LandingRight = () => {
  const theme = useTheme()
  return (
    <Box
        sx={{
            position:"absolute",
            borderRadius:"77% 23% 0% 100% / 53% 30% 70% 47% ",
            width:"700px",
            height:"700px",
            top:"-220px",
            backgroundColor:theme.palette.primary.alt,
            zIndex:"0"
        }}
    >
            <img 
                src={LandingSvg} 
                style={{
                    width:"500px",
                    zIndex:"1"
                }}
            />
    </Box>
  )
}
