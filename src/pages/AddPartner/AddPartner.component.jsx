import React from 'react'
import './AddPartner.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import UserDetails from '../../components/UserDetails/UserDetails.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import PartnerDetails from '../../components/PartnerDetails/PartnerDetails.component'
import InputField from '../../components/InputField/InputField.component'

export default function AddPartner(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Adauga partener" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
          <div className="partner-dets">
            <UserDetails onChange={props.onChange} uDets={props.pData} />
            <PartnerDetails onChange={props.onChange} uDets={props.pData} />
            <div className="partner-details">
               <p>Detalii comenzi</p> 
              <InputField onChange={props.onChange} name="partner_percent" value={props.pData.partner_percent} type="text" label="adaos" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            </div>
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
