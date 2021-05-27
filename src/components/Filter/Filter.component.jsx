import React, { useEffect, useState } from 'react'
import './Filter.component.scss'
import FilterLogo from '../../assets/downArrow.png'
import '../SelectField/SelectField.component.scss'

export default function Filter(props) {

    return (
      <div className="select-field">
        <label htmlFor={props.type} style={{color: props.labelColor}}>{props.label}</label>
        <select 
          name={props.name} 
          value={props.currentFilter}         
          onChange={(e) => props.onFilterChange(e.target.value)} 
          style={{ backgroundColor: "#FFD185", color: "#1D3557", width: (props.width ? props.width : "")}}>
              <option key={"noVal"} value="">{props.name}</option>
            {props.filterInfo ? 
              props.filterInfo.map( (o, index) => 
              <option key={index} value={o}>{o}</option>
            )
            :
            null
            }
        </select>
      </div>
    )
}
