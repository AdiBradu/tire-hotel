import React from 'react'
import './AutoPlate.component.scss'


export default function AutoPlate(props) {
    return (
        <div className="auto-plate"> 
            <div className="plate-no">
                <p>{props.reg_number}</p>
            </div>
            <div className="auto-info">
                <p>{props.vehicle_type}</p>
                <p>roti</p>
                <p>{props.vehicle_tire_count}</p>
            </div>
        </div>
    )
}
