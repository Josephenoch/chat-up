import React from 'react'
import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

const useStyles = makeStyles({

})

export const Sidebar = () => {
  return (
    <Box >
        <UserHeader/>
        <SidebarSearch/>
    </Box>
  )
}
