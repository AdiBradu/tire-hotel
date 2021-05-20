import React from 'react'
import '../Dashboard/Dashboard.component'
import Navigation from '../../components/Navigation/Navigation.component'
import van from '../../assets/hotelulderotivanoriginal.png'

export default function Home() {
    return (
        <div className="dashboard">
                <Navigation/>
                <div className="workspace">
                    <img className="van" src={van} alt="" />
                </div>
        </div>
    )
}
