import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { useChats } from "../../contexts/ChatsContext";

import {ChatContact } from './ChatContact';
import {Contact } from './Contact';

import { Outlet, useLocation } from "react-router-dom";
import "./sidebar.css"
import { NoActiveChat } from "../Chats/NoActiveChat";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { SidebarSwitch } from "./SidebarSwitch";
const useStyles = makeStyles({
    contactContainer:{
        overflowY:"auto",
        maxHeight:"86vh",
        width:"100%"
    }
})  

export const Sidebar = () => {
  const {user} = useChats()
  const {contacts} = useAuth()
  const classes = useStyles()
  const [normalContact, setNormalContact] = useState(true)
  return (
    <>
    <Box className="sideBar">
      <Box >
          <UserHeader
            user={user}
            mainUser={true}
          />
          <SidebarSearch/>
          <SidebarSwitch
            normalContact={normalContact}
            setNormalContact={setNormalContact}
          />
          <Box className={classes.contactContainer}>
            {!normalContact?
              contacts.map(contact =>
                !contact.data.blocked&&<ChatContact
                  key={contact.id}
                  id={contact.id}
                  contact={contact.data}
                />
              )
            :
              contacts.map(contact =>
                !contact.data.blocked&&<Contact
                  key={contact.id}
                  id={contact.id}
                  contact={contact.data}
                /> 
              )
            }
              
          </Box>
      </Box>
    </Box>
    <Outlet/>
    </>
  )
}
