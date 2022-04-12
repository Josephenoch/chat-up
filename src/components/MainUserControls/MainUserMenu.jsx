import React,{useState} from 'react'

import {Menu, MenuItem} from '@mui/material'
import { UserInvitesModal } from './UserInvitesModal'

export const MainUserMenu = ({menu,closeMenu,anchorEl}) => {
  const [inviteModal, setInviteModal] = useState(false)
  const handleInviteModal = () => {
    closeMenu()
    setInviteModal(!inviteModal)
  }
  
  return (
    <>
      <Menu
        open={menu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        onClose={closeMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleInviteModal}>View Invites</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
      <UserInvitesModal
        inviteModal={inviteModal}
        handleInviteModal={handleInviteModal}
      />
      
    </>
  )
}
