import React from 'react'
import './Vehicle.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import TireDetailsMultipleSets from '../../components/TireDetails/TireDetailsMultipleSets.component'

export default function Vehicle(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Adauga vehicul" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
          <div className="fleet-dets">
            {!props.loading && <TireDetailsMultipleSets 
              onChange={props.onChange}
              vData={props.vData}
              hData={props.hData}
              tireOpts={props.tireOpts}
              updatePrefillStatus={props.updatePrefillStatus} 
              handleTiresFilterChange={props.handleTiresFilterChange}
              vehicleTireCount={props.vehicleTireCount}
              prefill={props.prefill}
              tireFilter={props.tireFilter}
              handleTiresSetsChange={props.handleTiresSetsChange}
              multipleTireSets={props.multipleTireSets}
              vehicleTireSetsCount={props.vehicleTireSetsCount}
              onHotelChange={props.onHotelChange}
              hotelsList={props.hotelsList}
            />}
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}
