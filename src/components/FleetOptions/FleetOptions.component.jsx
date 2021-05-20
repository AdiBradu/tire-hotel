import React from 'react'
import './FleetOptions.component.scss'
import FleetOption from '../../components/FleetOption/FleetOption.component'
import Vehicle from '../../assets/vehicle.svg'
import Vehicles from '../../assets/vehicles.svg'

export default function FleetOptions() {
    return (
        <div className="fleet-options">
            <FleetOption text="adauga vehicul" icon={Vehicle}/>
            <FleetOption text="bulk import" icon={Vehicles}/>
        </div>
    )
}
