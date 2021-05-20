import React from 'react'
import './LoginPage.component.scss'
import InputGroup from '../../components/InputGroup/InputGroup.component'
import { useAuth } from '../../contexts/AuthContext'
import { Redirect } from 'react-router-dom'

export default function LoginPage() {
  const { currentUser } = useAuth()
 
  return !currentUser ? (
  <div className="login-page">
    <InputGroup  />
  </div>
  )
  :
  <Redirect to="/dashboard" />
}
