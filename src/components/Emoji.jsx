import { Modal } from '@mui/material'
import React from 'react'
import Picker from "emoji-picker-react"

export const Emoji = ({modal,handleModal,setMessage}) => {
  return (
    <Modal
        open={modal}
        onClose={handleModal}
        sx={{
            position: 'fixed',
            top: "59%",
            left: '35%',
            transform: 'translate(-50%, -50%)',
            width: "10vw",
            height:"20vh",
        }}
    >
        <Picker 
            preload={true}
            onEmojiClick={
                (e,emojiObject)=>setMessage(
                    prevState=>prevState
                    ?prevState+emojiObject.emoji:emojiObject.emoji)} />
    </Modal>
  )
}
