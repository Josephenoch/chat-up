import React, {useState, useEffect} from 'react'
import {Avatar, Box, Typography} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { Contact } from './Contact';
import { maxHeight } from '@mui/system';
const useStyles = makeStyles({
    contactContainer:{
        overflowY:"auto",
        maxHeight:"100vh"
    }
})  

export const Sidebar = () => {
  const classes = useStyles()
  return (
    <Box >
        <UserHeader/>
        <SidebarSearch/>
        <Box className={classes.contactContainer}>
            <Contact/>
            <Contact/>
        </Box>
    </Box>
  )
}
