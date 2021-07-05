import React from 'react'
import './SideMenu.component.scss'
import { ReactComponent as HomeLogo } from '../../assets/home.svg';
import { ReactComponent as AccountLogo } from '../../assets/account.svg';
import { ReactComponent as AgentLogo } from '../../assets/agent.svg';
import { ReactComponent as FleetLogo } from '../../assets/fleet.svg';
import { ReactComponent as PartnerLogo } from '../../assets/partner.svg';
import { ReactComponent as OrderLogo } from '../../assets/order.svg';
import { ReactComponent as TyreLogo } from '../../assets/tyre.svg';
import { ReactComponent as LogoutLogo } from '../../assets/logout.svg';
import { ReactComponent as Logo } from '../../assets/LogoHotelulderoti.svg';
import { ReactComponent as AdminLogo } from '../../assets/admin.svg';
import { ReactComponent as HotelLogo } from '../../assets/hotel.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function SideMenu() {
  const { currentUser } = useAuth()

  return (
    <div className="side-menu">
        
        <Link
        to={{pathname:`/dashboard`}}
        >
          <div className="menu-link">
            <HomeLogo/>
            <p>Home</p>
          </div>
        </Link>

        <Link
        to={{pathname:`/dashboard/cont`}}
        >
          <div className="menu-link">
            <AccountLogo/>
            <p>Contul meu</p>
          </div>
        </Link>


        {(currentUser.user_type === 1 &&
        <Link
        to={{pathname:`/dashboard/agenti`}}
        >
          <div className="menu-link">
            <AgentLogo/>
            <p>Agenti</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type < 3 &&
        <Link
        to={{pathname:`/dashboard/flote`}}
        >
          <div className="menu-link">
            <FleetLogo/>
            <p>Flote</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type === 5 &&
        <Link
        to={{pathname:`/dashboard/flote`}}
        >
          <div className="menu-link">
            <FleetLogo/>
            <p>Flote</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type === 3 &&
        <Link
        to={{pathname:`/dashboard/flota`}}
        >
          <div className="menu-link">
            <FleetLogo/>
            <p>Flota</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type < 3 &&
        <Link
        to={{pathname:`/dashboard/parteneri`}}
        >
          <div className="menu-link">
            <PartnerLogo/>
            <p>Parteneri</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type < 5 &&
        <Link
        to={{pathname:`/dashboard/comenzi`}}
        >
          <div className="menu-link">
            <OrderLogo/>
            <p>Comenzi</p>
          </div>
        </Link>
        )}
        {(currentUser.user_type < 4 && 
        <Link
        to={{pathname:`/dashboard/anvelope`}}
        >
          <div className="menu-link">
            <TyreLogo/>
            <p>Anvelope</p>
          </div>
        </Link>
        )}

        <Link
        to={{pathname:`/dashboard/hotel`}}
        >
          <div className="menu-link">
            <HotelLogo/>
            <p>Hotel</p>
          </div>
        </Link>

        {(currentUser.user_type !== 3 && 
        <Link
        to={{pathname:`/dashboard/cereri`}}
        >
          <div className="menu-link">
            <AdminLogo/>
            <p>Cereri</p>
          </div>
        </Link>
        )}

        <Link
        to={{pathname:`/logout`}}
        >
          <div className="menu-link">
            <LogoutLogo/>
            <p>Logout</p>
          </div>
        </Link>

      </div>
  )
}
