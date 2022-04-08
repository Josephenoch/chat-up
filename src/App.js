import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chats } from "./components/Chats/Chats";
import { ChatsProvider } from "./contexts/ChatsContext";

import { Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { NoActiveChat } from "./components/Chats/NoActiveChat";



export const App = () => {
  
  return (
    <Box className="app">
      <ChatsProvider>
        <Routes>
          <Route path="chats" element={<Sidebar/>}>
            <Route path="" element={<NoActiveChat/>}/>
            <Route path=":roomId" element={<Chats/>}/>
          </Route>
        </Routes>
      </ChatsProvider>
    </Box>
  );
}

 
