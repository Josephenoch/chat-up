import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import MessagBackground from "./assets/chatbg.png"
import { Chats } from "./components/Chats/Chats";
import {mainUser} from "./fakeData" 



export const App = () => {
  return (
    <Box className="app">
      <Box className="sideBar">
        <Sidebar
          user={mainUser}
        />
      </Box>
      <Box className="chats">
        <Chats
          user={mainUser}
        />
      </Box>
    </Box>
  );
}

 
