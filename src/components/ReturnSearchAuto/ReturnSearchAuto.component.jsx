import React from 'react'
import './ReturnSearchAuto.component.scss'

export default function ReturnSearchAuto(props) {
    return (
        <div className="return-search-auto"> 
            <p>{props.text}</p>
            <button style={{backgroundColor: props.bgcolor, color: props.color}} type="button" onClick={props.onClick}><p>{props.action}</p></button>
        </div>
    )
}
