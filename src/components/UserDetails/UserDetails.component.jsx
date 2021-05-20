import React from 'react'
import './UserDetails.component.scss'
import InputField from '../InputField/InputField.component'

export default function UserDetails(props) {
  
  return (
    <div className="user-details">
      <p>Detalii utilizator</p>
      <InputField onChange={props.onChange} name="last_name" value={props.uDets.last_name} type="text" label="nume" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
      <InputField onChange={props.onChange} name="first_name" value={props.uDets.first_name} type="text" label="prenume" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
      <InputField onChange={props.onChange} name="email" value={props.uDets.email} type="email" label="email" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
      <InputField onChange={props.onChange} name="password" value={props.uDets.password}  type="password" label="parola" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
      <InputField onChange={props.onChange} name="confirm_password" value={props.uDets.confirm_password} type="password" label="confirma parola" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
      <InputField onChange={props.onChange} name="phone" value={props.uDets.phone} type="text" label="telefon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
    </div>  
  )
}
