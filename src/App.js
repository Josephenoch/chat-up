import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chats } from "./components/Chats/Chats";
import { ChatsProvider } from "./contexts/ChatsContext";

import { Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { NoActiveChat } from "./components/Chats/NoActiveChat";
import { Login } from "./components/Chats/AuthComponents/Login";
import { Signin } from "./components/Chats/AuthComponents/Signin";
import { AuthProvider } from "./contexts/AuthContext";



export const App = () => {
  
  return (
    <Box className="app">
      <AuthProvider>
        <ChatsProvider>
          <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="chats" element={<Sidebar/>}>
              <Route path="" element={<NoActiveChat/>}/>
              <Route path=":roomId" element={<Chats/>}/>
            </Route>
          </Routes>
        </ChatsProvider>
      </AuthProvider>
    </Box>
  );
}

 
