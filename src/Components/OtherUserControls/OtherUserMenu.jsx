import React,{useState} from 'react';
import {Menu, MenuItem} from '@mui/material'
import { DeleteModal } from './DeleteModal';
import { BlockModal } from './BlockModal';

import { useControls } from '../../Contexts/ControlsContext';

export const OtherUserMenu = ({menu,closeMenu,anchorEl,contactId,email}) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)

  const {blockContact, deleteContact} = useControls()
  const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
      closeMenu()
  }
  const handleBlockModal = () =>{
      setBlockModal(!blockModal)
      closeMenu()
  }
  const handleBlock = async () =>{
    await blockContact(contactId)
    setBlockModal(!blockModal)
  }
  const handleDelete = async () => {
    await deleteContact(email,contactId)
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
        handleDelete={handleDelete}
      />
      <BlockModal
        handleBlock={handleBlock}
        blockModal={blockModal}
        handleBlockModal={handleBlockModal}
      />
      

    </>
  )
}
