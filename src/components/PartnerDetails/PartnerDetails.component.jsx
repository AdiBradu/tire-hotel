import React from 'react'
import './PartnerDetails.component.scss'
import InputField from '../InputField/InputField.component'

export default function PartnerDetails(props) {
    return (
        <div className="partner-details">
            <p>Detalii partener</p>
            <InputField onChange={props.onChange} name="partner_name" value={props.uDets.partner_name} type="text" label="denumire companie" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="partner_gov_id" value={props.uDets.partner_gov_id} type="text" label="CUI" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="partner_j" value={props.uDets.partner_j} type="text" label="registrul comertului" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="partner_address" value={props.uDets.partner_address} type="text" label="adresa" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="partner_region" value={props.uDets.partner_region} type="text" label="judet" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="partner_city" value={props.uDets.partner_city} type="text" label="oras" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
        </div>
    )
}