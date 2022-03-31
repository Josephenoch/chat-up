import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

import { Sidebar } from "./components/Sidebar/Sidebar";
import MessagBackground from "./assets/chatbg.png"

const useStyle =  makeStyles({
  app:{
    display:"flex",
    width:"100vw",
    height:"100vh",
  },
  sideBar:{
    flex:"0.3",
    backgroundColor:""
  },
  message:{
    flex:"0.7",
    background:"#e5ddd5",
    backgroundImage: `url(${MessagBackground})`
  }
}) 
export const App = () => {
  const classes = useStyle()
  return (
    <Box className={classes.app}>
      <Box className={classes.sideBar}>
        <Sidebar/>
      </Box>
      <Box className={classes.message}>

      </Box>
    </Box>
  );
}

 
