import React from 'react'
import { Paper, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
export const LandingPage = () => {
  const theme = useTheme()
  return (
    <Box
        sx={{
            minWidth:"100vw",
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:theme.palette.primary.alt,
            
        }}
    >
        <Paper
            sx={{
                width:"80%",
                height:"90%"
            }}
        >
            <Box
                sx={{
                    width:"40%"
                }}
            >
                <Box>
                    <Typography variant="h5" color="textSecondary">
                        Your Logo
                    </Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            width:"60%"
                        }}
                    >
                        <Typography variant="h4">
                            Creative Team
                        </Typography>
                    </Box>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repudiandae laudantium magni repellendus! Nam non consequatur consequuntur illo consectetur distinctio similique odio. Iure fugiat dolor sunt corrupti accusamus tempore deserunt.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repudiandae laudantium magni repellendus! Nam non consequatur consequuntur illo consectetur distinctio similique odio. Iure fugiat dolor sunt corrupti accusamus tempore deserunt.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repudiandae laudantium magni repellendus! Nam non consequatur consequuntur illo consectetur distinctio similique odio. Iure fugiat dolor sunt corrupti accusamus tempore deserunt.
                    </Typography>
                </Box>
            </Box>

        </Paper>

    </Box>
  )
}
