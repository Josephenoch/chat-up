import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useChats } from '../contexts/ChatsContext'

export const ProtectedRoute = ({children}) => {
    const {user} = useChats()

    return user? children :<Navigate to="/login"/>
}
