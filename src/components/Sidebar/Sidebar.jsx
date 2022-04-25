import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';


import {ChatContact } from './ChatContact';
import {Contact } from './Contact';

import { Outlet} from "react-router-dom";
import "./sidebar.css"
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
  const {mainUser} = useAuth()
  const {contacts} = useAuth()
  const classes = useStyles()
  const [normalContact, setNormalContact] = useState(false)
  const [searchText, setSearchText] = useState("")
  const cntcts = searchText==="" ? contacts : contacts.filter(cnt=>cnt.data.sender.includes(searchText))
  console.log(cntcts)
  return (
    <>
    <Box className="sideBar">
      <Box >
          <UserHeader
            user={mainUser}
            mainUser={true}
          />
          <SidebarSearch
            setSearchText={setSearchText}
            searchText={searchText}
            setNormalContact={setNormalContact}
            normalContact={normalContact}

          />
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
              cntcts.map(contact =>
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
