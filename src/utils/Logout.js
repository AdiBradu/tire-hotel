import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Logout() {
  const { logout, setLoggedUser } = useAuth()
  const history = useHistory()
 
  logout().then(() => {
    setLoggedUser(null) 
    history.push("/")
  }).catch (error => {
    throw new Error(error)
  });

  return <Redirect to="/" />
}
