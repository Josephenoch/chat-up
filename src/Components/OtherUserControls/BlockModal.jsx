import React from 'react'
import { Box, Modal,Paper, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
  modalContainer:{
    top:"50%",
    left:"50%",
    width:"20vw",
    height:"20vh",
    display:"flex",
    padding:"30px",
    overflowY:"auto",
    overflowX:"hidden",
    alignItems:"center",
    borderRadius:"20px",
    position:"absolute",
    flexDirection:"column",
    transform: "translate(-50%, -50%)"
  },
  inviteBox:{
    width:"100%",
    display:"flex", 
    padding:"10px",
    marginTop:"20px",
    borderRadius:"20px",
    border:"1px solid #e1e1e1"
}
})
export const BlockModal = ({handleBlock,blockModal,handleBlockModal}) => {
  const classes = useStyles()

  return (
    <>
      <Modal
          open={blockModal}
          onClose={handleBlockModal}
      >
        <Paper
          className={classes.modalContainer}
        >
          <Typography
            variant = "h5"
          >
            Confirm Block

          </Typography>
          <Box
            sx={{
              marginTop:"50px"
            }}
          >
            <Button 
              variant="outlined" 
              color="secondary"
              sx={{
                marginRight:"30px"
              }}
              onClick={handleBlock}
            >
                Confirm
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleBlockModal}
            >
                Cancel
            </Button>
          </Box>
        </Paper>

      </Modal>

    </>
  )
}
