import React from 'react'
import './ServiciuDetails.component.scss'
import InputField from '../InputField/InputField.component'
import SelectField from '../SelectField/SelectField.component'

export default function ServiciuDetails(props) {
  const hService = [{val: 0, text: "NU"}, {val: 1, text: "PROPRIU"}, {val: 2, text: "DINAMIC 92"}]
  const vehicleTypeOpts = ["TURISM","SUV","CARGO"]
  const costOpts = [{val: 0, text: "FIX"}, {val: 1, text: "UNITAR"}]

  let diameterOpts = []
  if(props?.tireOpts?.rimsList.length) {
    diameterOpts = props?.tireOpts?.rimsList.map( (f, index) => {
      return f.rim
    })
  }  

  return (
    <div className="serviciu-details">
      <p>Detalii serviciu</p>
      <InputField onChange={props.onChange} name="service_name" value={props.sData.service_name} type="text" label="nume" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>      
      <SelectField onChange={props.onChange} name="service_vehicle_type" value={props.sData.service_vehicle_type} fieldOptions={vehicleTypeOpts} optTextEqualsValue={true} label="tip vehicul" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
      <InputField onChange={props.onChange} name="service_cost" value={props.sData.service_cost} type="number" label="cost" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>     
      <SelectField onChange={props.onChange} name="hotel_service" value={props.sData.hotel_service} fieldOptions={hService} customValue={true} label="hotel" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
      <SelectField onChange={props.onChange} name="cost_type" value={props.sData.cost_type} fieldOptions={costOpts} customValue={true} label="tip cost" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
      <SelectField onChange={props.onChange} name="min_diameter" value={props.sData?.min_diameter} fieldOptions={diameterOpts} label="diametru minim" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
      <SelectField onChange={props.onChange} name="max_diameter" value={props.sData?.max_diameter} fieldOptions={diameterOpts} label="diametru maxim" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
    </div>  
  )
}
