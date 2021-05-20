import React from 'react'
import './InputField.component.scss'

export default function InputField(props) {
    return (
        <div className="input-field">
            <label htmlFor={props.type} style={{color: props.labelColor}}>{props.label}</label>
            <input 
            type={props.type} 
            name={props.name} 
            value={props.value} 
            onChange={(e) => props.onChange(e.target.name, e.target.value)} 
            placeholder={props.label} 
            disabled={props.disabled ? "disabled" : ""}
            style={{ backgroundColor: props.inputBackground, color: props.color}}/>
        </div>
    )
}
