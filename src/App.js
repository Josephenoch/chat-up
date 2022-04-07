import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chats } from "./components/Chats/Chats";
import { ChatsProvider } from "./contexts/ChatsContext";

import { Routes, Route } from "react-router-dom";




export const App = () => {
  
  return (
    <Box className="app">
      <ChatsProvider>
        <Routes>
          <Route path="chats" element={<Sidebar/>}>
            <Route path=":roomId" element={<Chats/>}/>
          </Route>
        </Routes>
      </ChatsProvider>
    </Box>
  );
}

 
