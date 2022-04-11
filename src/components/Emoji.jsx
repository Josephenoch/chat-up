import { Menu, MenuList } from '@mui/material'
import React from 'react'
import Picker from "emoji-picker-react"

export const Emoji = ({modal,handleModal,setMessage,anchorEl}) => {
  return (
    <Menu
        open={modal}
        onClose={handleModal}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >  
        <Picker 
            preload={true}
            onEmojiClick={
                (e,emojiObject)=>
                setMessage(
                    prevState=>prevState
                    ?prevState+emojiObject.emoji:emojiObject.emoji)} 
        />
    </Menu>
  )
}
