import React from 'react'
import './Segment.component.scss'

export default function Segment(props) {
    return (
        <div className="segment">
            <img src={props.img} alt=""/>
            <p style={{color: props.color}}>{props.segment}</p>
            <div className="stats-data">
                <p><span>Auto: </span>{props.auto}</p>
                <p><span>Anvelope: </span>{props.anvelope}</p>
                <p><span>Dimensiuni: </span>{props.dimensiuni}</p>
            </div>
        </div>
    )
}
