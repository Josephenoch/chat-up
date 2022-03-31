import React, {useState, useEffect} from 'react'
import {Avatar, Box, Typography} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { Chat } from './Chat';
const useStyles = makeStyles({

})

export const Sidebar = () => {

  return (
    <Box >
        <UserHeader/>
        <SidebarSearch/>
        <Chat/>
        <Chat/>
        <Chat/>
    </Box>
  )
}
