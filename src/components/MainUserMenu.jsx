import React from 'react'
import {Menu, MenuItem} from '@mui/material'

export const MainUserMenu = ({open,handleMenu,anchorEl}) => {
  return (
    <>
      <Menu
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        onClose={handleMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={(e)=>handleMenu(e)}>Account</MenuItem>
        <MenuItem onClick={(e)=>handleMenu(e)}></MenuItem>
        <MenuItem onClick={(e)=>handleMenu(e)}>Logout</MenuItem>
      </Menu>
    </>
  )
}
