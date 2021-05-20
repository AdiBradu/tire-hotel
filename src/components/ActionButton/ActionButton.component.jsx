import React from 'react'
import './ActionButton.component.scss'

export default function ActionButton(props) {
    return (
        <div className="action-btn" onClick={props.onClick} style={{color: props.color}}>
            <p>{props.name}</p>
            <img src={props.icon} alt=""/>
        </div>
    )
}
