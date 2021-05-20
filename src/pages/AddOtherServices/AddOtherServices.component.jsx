import React from 'react'
import './AddOtherServices.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import InputField from '../../components/InputField/InputField.component'
import Alert from '../../components/Alert/Alert.component'

export default function AddOtherServices(props) {
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Alte servicii" />
        <form className="user-details" onSubmit={props.handleSubmit}>       
          <div className="tire-details">
            <p>Detalii serviciu</p>            
            {props.error && <Alert alertClass="alert-error" message={props.error} /> } 
            <div className="vehicle-row">
              <InputField onChange={props.onChange} name="service_name" value={props.newService.service_name} type="text" label="denumire serviciu" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
              <InputField onChange={props.onChange} name="service_price" value={props.newService.service_price} type="text" label="pret serviciu" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            </div>
          </div>
           
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
