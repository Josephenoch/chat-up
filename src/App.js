import { Box, Typography,  } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyle =  makeStyles({
  app:{
    display:"flex",
    width:"100vw",
    height:"100vh",
    backgroundColor:"blue"
  },
  sideBar:{
    flex:"0.3",
    backgroundColor:"pink"
  }
}) 
export const App = () => {
  const classes = useStyle()
  return (
    <Box className={classes.app}>
      <Box className={classes.sideBar}>

      </Box>
    </Box>
  );
}

 
