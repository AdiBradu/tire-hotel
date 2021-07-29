import React from 'react'
import '../Dashboard/Dashboard.component'
import Navigation from '../../components/Navigation/Navigation.component'
import van from '../../assets/hotelulderotivanoriginal.png'
import MapInteractive from '../../components/MapInteractive/MapInteractive.component'
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser.component'

export default function Home() {

    return (
        <div className="dashboard">
            <Navigation/>
            <div className="workspace">
                <WelcomeUser/>
                <MapInteractive/>
                {/* <img className="van" src={van} alt="" /> */}
            </div>
        </div>
    )
}
