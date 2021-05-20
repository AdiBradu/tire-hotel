import React from 'react'
import './LandingPage.component.scss'
import LoginGroup from '../../components/LoginGroup/LoginGroup.component'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
export default function LandingPage() {
  const { currentUser } = useAuth()

  return !currentUser ? (
      <div className="landing-page">
          <Link
          to={{pathname:`/auth`}}
          >
              <LoginGroup/>
          </Link>
      </div>
  )
  :
  <Redirect to="/dashboard" />
}
