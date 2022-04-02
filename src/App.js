import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

import { Sidebar } from "./components/Sidebar/Sidebar";
import MessagBackground from "./assets/chatbg.png"
import { Chats } from "./components/Chats/Chats";
import {mainUser} from "./fakeData"

const useStyle =  makeStyles({
  app:{
    display:"flex",
    width:"100vw",
    minHeight:"100vh",
    maxHeight:"100vh",
    overflow:"hidden"
  },
  sideBar:{
    flex:"0.3",
    backgroundColor:""
  },
  chats:{
    flex:"0.7",
    background:"#e5ddd5",
    backgroundImage: `url(${MessagBackground})`
  }
}) 
export const App = () => {
  const classes = useStyle()
  console.log(mainUser)
  return (
    <Box className={classes.app}>
      <Box className={classes.sideBar}>
        <Sidebar
          user={mainUser}
        />
      </Box>
      <Box className={classes.chats}>
        <Chats
          user={mainUser}
        />
      </Box>
    </Box>
  );
}

 
