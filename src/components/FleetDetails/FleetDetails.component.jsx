import React from 'react'
import './FleetDetails.component.scss'
import InputField from '../InputField/InputField.component'
import SelectField from '../SelectField/SelectField.component'
import judete from '../../data/judete.json'

export default function FleetDetails(props) {
    let regionOpts = []
    judete.forEach(e => regionOpts.push(e.nume))    
    return (
        <div className="fleet-details">
            <p>Detalii flota</p>
            <InputField onChange={props.onChange} name="fleet_name" value={props.uDets.fleet_name} type="text" label="denumire companie" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="fleet_gov_id" value={props.uDets.fleet_gov_id} type="text" label="CUI" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="fleet_j" value={props.uDets.fleet_j} type="text" label="registrul comertului" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="fleet_address" value={props.uDets.fleet_address} type="text" label="adresa" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>            
            <SelectField onChange={props.onChange} name="fleet_region" value={props.uDets.fleet_region} fieldOptions={regionOpts} optTextEqualsValue={true} label="judet" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <InputField onChange={props.onChange} name="fleet_city" value={props.uDets.fleet_city} type="text" label="oras" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
        </div>
    )
}
