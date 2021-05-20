import React from 'react'
import './SectionSubTitle.component.scss'

export default function SectionSubTitle(props) {
    return (
        <div className="section-subtitle">
            <h3>{props.text}</h3>
            <h5>{props.data} {props.name}</h5>
        </div>
    )
}

