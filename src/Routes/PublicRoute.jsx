import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { useChats } from '../contexts/ChatsContext'

export const PublicRoute = ({children}) => {
    const {user} = useChats()
  
    return !user ? children : <Navigate to="/chats"/>
}
