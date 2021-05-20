import React from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import UserDetails from '../../components/UserDetails/UserDetails.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import PartnerDetails from '../../components/PartnerDetails/PartnerDetails.component'
import FleetDetails from '../../components/FleetDetails/FleetDetails.component'

export default function MyAccount(props) {
  
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Contul meu" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
          {!props.showPartnerDetails & !props.showFleetDetails ? <UserDetails onChange={props.updateFData} uDets={props.fData} /> : null}
          {props.showPartnerDetails ? 
          <div className="partner-dets"> 
            <UserDetails onChange={props.updateFData} uDets={props.fData} />
            <PartnerDetails onChange={props.updateFData} uDets={props.fData} /> 
          </div> 
          : null}
          {props.showFleetDetails ? 
          <div className="fleet-dets">
            <UserDetails onChange={props.updateFData} uDets={props.fData} />
            <FleetDetails onChange={props.updateFData} uDets={props.fData} />
          </div>
          : null}          
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
