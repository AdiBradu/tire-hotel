import React from 'react'
import './Wear.component.scss'

export default function Wear(props) {
    return (
        <div className="wear">
            <img src={props.img} alt=""/>
            <p style={{color: props.color}}>{props.text}</p>
            <div className="wear-data">
                <p>{props.data}</p>
            </div>
        </div>
    )
}
