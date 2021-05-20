import React from 'react'
import './UpdateKm.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import InputField from '../../components/InputField/InputField.component'

export default function UpdateKm(props) {
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Update KM" />
        <form className="user-details" onSubmit={props.handleSubmit}>       
          <div className="tire-details">
            <p>Detalii identificare auto</p>            
            <div className="vehicle-row">
              <InputField disabled="true" name="reg_number" value={props.vData.reg_number} type="text" label="nr. inmatriculare" color={'#1D3557'} inputBackground={'#d3d3d3'} labelColor={'#1D3557'}/>
              <InputField disabled="true" name="vehicle_brand" value={props.vData.vehicle_brand} type="text" label="marca" color={'#1D3557'} inputBackground={'#d3d3d3'} labelColor={'#1D3557'}/>
              <InputField disabled="true" name="vehicle_model" value={props.vData.vehicle_model} type="text" label="model" color={'#1D3557'} inputBackground={'#d3d3d3'} labelColor={'#1D3557'}/>              
              <InputField onChange={props.onChange} name="vehicle_milage" value={props.vData.vehicle_milage} type="text" label="km" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            </div>
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
