import React,{useState} from 'react'

import {Box, Avatar, Typography, IconButton} from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Add, MoreHoriz } from '@mui/icons-material'

import {MainUserMenu} from "./MainUserControls/MainUserMenu"
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

export const UserHeader = ({user}) => {
  const classes = useStyles()
  const [menu, setMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [addCntctModal, setAddCntctModal] = useState(false)
  const handleAddCntctModal = () => {
    closeMenu()
    setAddCntctModal(!addCntctModal)
  }
  const openMenu = (e) => {
      setAnchorEl(e.currentTarget)
      setMenu(true)
  }
  const closeMenu = () => {
    setMenu(false)
}
  return (
    <Box
        className={classes.root}
    >
    
        <Avatar 
            src={`https://avatars.dicebear.com/api/human/${user.id}.svg`}
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
                {`${user.firstName} ${user.lastName}`}
            </Typography>
        </Box>
        
        <Box 
            sx={{
                position:"absolute",
                right:"1%"
            }}
        >
            {
                user.mainUser&&
                <IconButton
                    onClick={handleAddCntctModal}
                >
                    <Add/>
                </IconButton>
                
            }
            <MainUserMenu
                    menu={menu}
                    closeMenu={closeMenu}
                    anchorEl={anchorEl}
            />
            <IconButton onClick={user.mainUser?(e)=>openMenu(e):null}>
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
