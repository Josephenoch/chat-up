import {Box} from "@mui/material"
import { UserHeader } from '../UserHeader'
import { makeStyles } from '@mui/styles';
import { SidebarSearch } from './SidebarSearch';

import { Contact } from './Contact';

const useStyles = makeStyles({
    contactContainer:{
        overflowY:"auto",
        maxHeight:"86vh",
        width:"30vw"
    }
})  

export const Sidebar = ({user}) => {
  const classes = useStyles()
  return (
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
  )
}
