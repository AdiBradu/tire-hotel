import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom'
import Admin from './Admin.routes'
import Agent from './Agent.routes'
import Flota from './Flota.routes'
import Partener from './Partener.routes'
import HotelManager from './HotelManager.routes'

export default function AuthenticatedRoutes() {
  const { currentUser } = useAuth()

  return (
    <>
      {(currentUser.user_type === 1 &&
        <Admin/>)
      || (currentUser.user_type === 2 && 
        <Agent />)
      || (currentUser.user_type === 3 && 
        <Flota />)    
      || (currentUser.user_type === 4 && 
        <Partener />) 
      || (currentUser.user_type === 5 && 
        <HotelManager />) 
      ||
        <Redirect to="/" />
      }    
    </>
  );
}
