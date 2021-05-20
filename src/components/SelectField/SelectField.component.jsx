import React from 'react'
import './SelectField.component.scss'

export default function SelectField(props) {
    return (
        <div className="select-field">
            <label htmlFor={props.type} style={{color: props.labelColor}}>{props.label}</label>
            <select 
            name={props.name} 
            value={props.value} 
            onChange={(e) => props.onChange(e.target.name, e.target.value)} 
            style={{ backgroundColor: props.inputBackground, color: props.color, width: (props.width ? props.width : "")}}>
              {props.fieldOptions.map( (o, index) => 
                <option key={index} value={props.optTextEqualsValue ? o : index+1}>{o}</option>
              )}
            </select>
        </div>
    )
}
