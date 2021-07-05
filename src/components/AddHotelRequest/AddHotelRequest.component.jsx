import React from 'react'
import './AddHotelRequest.component.scss'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import InputField from '../InputField/InputField.component'

export default function AddHotelRequest(props) {
  return (
    <div className="add-request">
      <InputField onChange={props.onChange}  name="new_request" value={props.reqRegNumber}  width="70px" type="text" label="Nr. inmatriculare" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>         
      <AddButton text={'adauga cerere'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} btnDisabled={props.loading}  onClick={props.btnClick} />
    </div>
  )
}