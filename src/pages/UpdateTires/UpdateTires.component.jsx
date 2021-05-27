import React from 'react'
import './UpdateTires.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import { Link } from 'react-router-dom'
import TireDetails from '../../components/TireDetails/TireDetails.component'

export default function UpdateTires(props) {
  
  let tireWidths = []
  let tireHeights = []
  let tireDiameters = []
  let tireSpeedIndexes = []
  let tireLoadIndexes = []
  let tireBrands = []
  let tireModels = []
  let tireSeasons = []
  let tireDots = []
  let tireRims = []
  let tireTreadUsages = []

  if(props.vTiresData) {
    props.vTiresData.forEach( e => {
      tireWidths.push(e.tire_width)
      tireHeights.push(e.tire_height)
      tireDiameters.push(e.tire_diameter)
      tireSpeedIndexes.push(e.tire_speed_index)
      tireLoadIndexes.push(e.tire_load_index)
      tireBrands.push(e.tire_brand)
      tireModels.push(e.tire_model)
      tireSeasons.push(e.tire_season)
      tireDots.push(e.tire_dot)
      tireRims.push(e.tire_rim)
      tireTreadUsages.push(e.tire_tread_wear)
    })
  }
  const vehicleTiresData = {vehicleTires: {
    widths: tireWidths,
    heights: tireHeights,
    diameters: tireDiameters,
    speedIndexes: tireSpeedIndexes,
    loadIndexes: tireLoadIndexes,
    brands: tireBrands,
    models: tireModels,
    seasons: tireSeasons,
    dots: tireDots,
    rims: tireRims,
    treadUsages: tireTreadUsages
  }}
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Update anvelope" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> } 
          {!props.loading && <TireDetails 
            onChange={props.onChange}
            vData={vehicleTiresData}
            tireOpts={props.tireOpts}
            updatePrefillStatus={props.updatePrefillStatus}             
            vehicleTireCount={props.vData.vehicle_tire_count}
            prefill={props.prefill}
            updateTiresService={true}
          />}
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
          {props.success &&
            <Link to="/dashboard/fisa_auto">
              <SaveButton btnType={'button'} btnDisabled={props.loading} text={'finalizeaza update anvelope'} bgcolor={'rgb(255, 158, 0)'} color={'#1D3557'}/>  
            </Link>
          }
        </form>
        
      </div>
    </div>
  )
}
