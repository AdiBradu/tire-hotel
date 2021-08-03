import React from 'react'
import './LandingPage.component.scss'
import LoginGroup from '../../components/LoginGroup/LoginGroup.component'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ReactComponent as Logo } from '../../assets/LogoHotelulderoti.svg'

export default function LandingPage() {
  const { currentUser } = useAuth()

  return !currentUser ? (
      <div className="landing-page">
          <Link
          to={{pathname:`/auth`}}
          >
              <LoginGroup/>
          </Link>
          <div className="version">
            <Logo/>
            <p>hotelulderoti.ro</p>
            <p>v1.0</p>
          </div>
      </div>
  )
  :
  <Redirect to="/dashboard" />
}
