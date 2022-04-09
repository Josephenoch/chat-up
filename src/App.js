import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chats } from "./components/Chats/Chats";
import { ChatsProvider } from "./contexts/ChatsContext";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider,createTheme  } from "@mui/material/styles";
import { NoActiveChat } from "./components/Chats/NoActiveChat";
import { Login } from "./components/AuthComponents/Login";
import { Signin } from "./components/AuthComponents/Signin";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import { LandingPage } from "./components/LandingPage/LandingPage";


const theme = createTheme({
  palette:{

    primary:{
      main:"#648746",
      alt:"#e1ffc7"
    }
  }
})


export const App = () => {
  
  return (
    <Box className="app">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ChatsProvider>
            <Routes>
              <Route index element={<LandingPage/>}/>
              <Route path="login" element={
                <PublicRoute>
                  <Login/>
                </PublicRoute>
              }/>
              <Route path="signin" element={
                <PublicRoute>
                  <Signin/>
              </PublicRoute>
              }/>
              <Route path="chats" element={
                <ProtectedRoute >
                  <Sidebar/>
                </ProtectedRoute>}
                >
                  <Route path="" element={
                    <ProtectedRoute >
                      <NoActiveChat/>
                    </ProtectedRoute>
                  }/>
                  <Route path=":roomId" element={
                    <ProtectedRoute >
                      <Chats/>
                    </ProtectedRoute> 
                  }/>
              </Route>
            </Routes>
          </ChatsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Box>
  );
}

 
