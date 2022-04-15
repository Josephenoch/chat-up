import React,{useState} from 'react'

import {Menu, MenuItem} from '@mui/material'
import { UserInvitesModal } from './UserInvitesModal'
import { BlockedContacts } from './BlockedContacts'

export const MainUserMenu = ({menu,closeMenu,anchorEl}) => {
  const [inviteModal, setInviteModal] = useState(false)
  const [blockedContactsModal, setBlockedContactsModal] = useState(false)

  const handleInviteModal = () => {
    closeMenu()
    setInviteModal(!inviteModal)
  }
  const handleBlockedContactsModal = () => {
    closeMenu()
    setBlockedContactsModal(!blockedContactsModal)
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
        <MenuItem onClick={handleBlockedContactsModal}>View Blocked Contacts</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
      <UserInvitesModal
        inviteModal={inviteModal}
        handleInviteModal={handleInviteModal}
      />
      <BlockedContacts
        blockedContactsModal={blockedContactsModal}
        handleBlockedContactsModal={handleBlockedContactsModal}
        />
    </>
  )
}
