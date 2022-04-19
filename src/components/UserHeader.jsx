import React,{useState} from 'react'

import {Box, Avatar, Typography, IconButton} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Add, MoreHoriz } from '@mui/icons-material'

import {MainUserMenu} from "./MainUserControls/MainUserMenu"
import {OtherUserMenu} from "./OtherUserControls/OtherUserMenu"

import { AddContact } from './MainUserControls/AddContact'


const useStyles = makeStyles({
    root:{
        position:"relative",
        width:"100%",
        height:"8vh",
        background:"#ededed",
        display:"flex",
        alignItems:"center",
        borderLeft:"1px solid #e1e1e1"
    }
})

export const UserHeader = ({user,mainUser,userID}) => {
  const classes = useStyles()
  const [mainUserMenu, setMainUserMenu] = useState(false)
  const [mainUserAnchorEl, setMainUserAnchorEl] = useState(false)
  const [addCntctModal, setAddCntctModal] = useState(false)
  const [otherUserMenu, setOtherUserMenu] = useState(false)
  const [otherUserAnchorEl, setOtherUserAnchorEl] = useState(false)
  const handleAddCntctModal = () => {
    closeMainUserMenu()
    setAddCntctModal(!addCntctModal)
  }
  const openMainUserMenu = (e) => {
    setMainUserAnchorEl(e.currentTarget)
    setMainUserMenu(true)
  }
  const closeMainUserMenu = () => {
    setMainUserMenu(false)
  }
  
  const openOtherUserMenu = (e) => {
    setOtherUserAnchorEl(e.currentTarget)
    setOtherUserMenu(true)
  }
  const closeOtherUserMenu = () => {
    setOtherUserMenu(false)
  }
  return (
    <Box
        className={classes.root}
    >
    
        <Avatar 
            src={user.photoURL}
            sx={{
                marginLeft:"2%"
            }}
        />

        <Box
            sx={{
                marginLeft:"0.5vw"
            }}
        >
            <Typography
                variant="body2"
            >
                {`${user.displayName}`}
            </Typography>
        </Box>
        
        <Box 
            sx={{
                position:"absolute",
                right:"1%"
            }}
        >
            {
                mainUser&&
                <IconButton
                    onClick={handleAddCntctModal}
                >
                    <Add/>
                </IconButton>
                
            }
            <MainUserMenu
                    menu={mainUserMenu}
                    closeMenu={closeMainUserMenu}
                    anchorEl={mainUserAnchorEl}
            />
            <OtherUserMenu
                email={user.sender}
                contactId={userID} 
                menu={otherUserMenu}
                closeMenu={closeOtherUserMenu}
                anchorEl={otherUserAnchorEl}
            />
            <IconButton onClick={mainUser?(e)=>openMainUserMenu(e):(e)=>openOtherUserMenu(e)}>
                <MoreHoriz/>
            </IconButton>
        </Box>
        <AddContact
            addCntctModal={addCntctModal}
            handleAddCntctModal={handleAddCntctModal}
        />
    </Box>
  )
}
