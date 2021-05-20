import React from 'react'
import './FleetOption.component.scss'

export default function FleetOption(props) {
    return (
        <div className="fleet-option">
            <img src={props.icon} alt="icon"/>
            <p>{props.text}</p>
        </div>
    )
}
