import React from 'react'
import './WelcomeUser.component.scss'
import { useAuth } from '../../contexts/AuthContext'

export default function WelcomeUser() {
  const { currentUser } = useAuth()
  return (
    <div className="welcome-user">
      <p>Bine ai venit, <span>{currentUser.first_name}</span>!</p>
    </div>
  )
}
