import React,{useState} from 'react';
import {Menu, MenuItem} from '@mui/material'
import { DeleteModal } from './DeleteModal';
import { BlockModal } from './BlockModal';


export const OtherUserMenu = ({menu,closeMenu,anchorEl,contact,contactId}) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
      closeMenu()
  }
  const handleBlockModal = () =>{
      setBlockModal(!blockModal)
      closeMenu()
  }
  const handleBlock = () =>{
      console.log("Blockedtttt")
      setBlockModal(!blockModal)
      
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
        <MenuItem onClick={handleBlockModal}>Block Contact</MenuItem>
        <MenuItem onClick={handleDeleteModal}>Delete Contact</MenuItem>
      </Menu>
      <DeleteModal
        deleteModal={deleteModal}
        handleDeleteModal={handleDeleteModal}
      />
      <BlockModal
        handleBlock={handleBlock}
        blockModal={blockModal}
        handleBlockModal={handleBlockModal}
      />
    </>
  )
}
