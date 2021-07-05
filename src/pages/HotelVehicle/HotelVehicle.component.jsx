import React from 'react'
import './HotelVehicle.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import HotelTireDetails from '../../components/HotelTireDetails/HotelTireDetails.component'

export default function HotelVehicle(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Adauga vehicul" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
          <div className="fleet-dets">
            {!props.loading && <HotelTireDetails
              onChange={props.onChange}
              vData={props.vData}
              tireOpts={props.tireOpts}
              hotelsList={props.hotelsList}
              updatePrefillStatus={props.updatePrefillStatus} 
              handleTiresFilterChange={props.handleTiresFilterChange}
              vehicleTireCount={props.vehicleTireCount}
              prefill={props.prefill}
              tireFilter={props.tireFilter}
            />}
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
