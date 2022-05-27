import { Box } from "@mui/material";
import "./App.css"

import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Chats } from "./Components/Chats/Chats";
import { ControlsProvider } from "./Contexts/ControlsContext";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider,createTheme  } from "@mui/material/styles";
import { NoActiveChat } from "./Components/Chats/NoActiveChat";
import { SignIn } from "./Components/AuthPages/SignIn";
import { AuthProvider } from "./Contexts/AuthContext";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import { LandingPage } from "./Components/LandingPage/LandingPage";


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
          <ControlsProvider>
            <Routes>
              <Route index element={<LandingPage/>}/>
              <Route path="signin" element={
                <PublicRoute>
                  <SignIn/>
              </PublicRoute>
              }/>
              <Route path="chats" element={
                <ProtectedRoute >
                  <Sidebar/>
                </ProtectedRoute>}
                >
                  <Route path="" element={
                      <NoActiveChat/>
                  }/>
                  <Route path=":roomId" element={
                      <Chats/>
                  }/>
              </Route>
            </Routes>
          </ControlsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Box>
  );
}

 
