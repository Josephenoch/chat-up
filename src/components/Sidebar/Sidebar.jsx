import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { Contact } from './Contact';

const useStyles = makeStyles({
    contactContainer:{
        overflowY:"auto",
        maxHeight:"86vh"
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
