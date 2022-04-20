import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const ProtectedRoute = ({children}) => {
    const {mainUser} = useAuth()

    return mainUser? children :<Navigate to="/signin"/>
}
