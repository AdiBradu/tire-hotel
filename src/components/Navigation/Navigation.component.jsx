import React, { Fragment, useState } from 'react'
import './Navigation.component.scss'
import SideMenu from '../../components/SideMenu/SideMenu.component'
import { ReactComponent as Toggler } from './navToggler.svg'
import { ReactComponent as Back } from './backArrow.svg'
import { ReactComponent as Logo } from '../../assets/LogoHotelulderoti.svg'

export default function Navigation() {

    const [showMenu, setShowMenu] = useState(false)

    let menu

    if(showMenu){
        menu =  
        <div className="collapse-area" onClick={ () => setShowMenu(false)}>
            <SideMenu/>
        </div>
    }

    let toggler

    if(showMenu){
        toggler =
        <Back id="navToggler" onClick={() => setShowMenu(!showMenu)}/>
    } else {
        toggler =
        <Toggler id="navToggler" onClick={() => setShowMenu(!showMenu)}/>
    }

    return (
        <div className="navbar">
            <nav className="navigation">
                <div className="toggler">
                    {toggler}
                    {/* <Toggler id="navToggler" onClick={() => setShowMenu(!showMenu)}/> */}
                </div>
                {menu}
            </nav>
            <div className="logo">
                <Logo style={ showMenu ? {display:"none"} : {width:"2.5rem", height:"auto"}}/>
            </div>
        
        </div>
    )
}
