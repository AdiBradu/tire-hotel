import React from 'react'
import './PrimaryButton.component.scss'

export default function PrimaryButton(props) {
    return (
        <div className="primary-button">
            <button type={props.btnType ? props.btnType : 'button'} onClick={props.onClick ? props.onClick : null} disabled={props.btnDisabled ? 'disabled' : ''} style={{backgroundColor: props.bgcolor, color: props.color, fontWeight: props.weight, padding: props.padding}}><img src={props.img} alt=""/>{props.text}</button>
        </div>
    )
}
