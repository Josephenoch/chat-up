import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { useChats } from "../../contexts/ChatsContext";

import { Contact } from './Contact';
import { Outlet, useLocation } from "react-router-dom";
import "./sidebar.css"
const useStyles = makeStyles({
    contactContainer:{
        overflowY:"auto",
        maxHeight:"86vh",
        width:"100%"
    }
})  

export const Sidebar = () => {
  const user = useChats()
  const classes = useStyles()
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
    <Box className="sideBar">
      <Box >
          <UserHeader
            user={user}
          />
          <SidebarSearch/>
          <Box className={classes.contactContainer}>
            {user.contacts.map(contact =>
                <Contact
                  key={contact.id}
                  contact={contact}
                />
              
              )
            }
              
          </Box>
      </Box>
    </Box>
    {String(location.pathname).length<=6? "Hi":<Outlet/>}
    </>
  )
}
