import React from 'react'
import './CheckBox.component.scss'

export default function CheckBox(props) {
    return (
        <div className="option-check">
            <input type="checkbox" name={props.name} onChange={(e) => props.onChange(e)} value="1" checked={props.checked ? "checked" : ""}></input>
            <label htmlFor={props.name}> Auto-fill</label><br></br>
        </div>
    )
}
