import React from 'react'
import './UpdateTires.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import SelectField from '../../components/SelectField/SelectField.component'
import InputField from '../../components/InputField/InputField.component'
import { Link } from 'react-router-dom'

export default function UpdateTires(props) {
  let positionOpts = ["fata/dreapta","fata/stanga","spate/dreapta","spate/stanga"]
  if(props.vData.vehicle_tire_count > 4) {
    positionOpts.push(["spate/exterior/dreapta","spate/exterior/stanga"])  
  }
  let heightOpts = []
  if(props?.tireOpts?.heightsList.length) {
    heightOpts = props?.tireOpts?.heightsList.map( (f, index) => {
      return f.height
    })
  }
  let widthOpts = []
  if(props?.tireOpts?.widthsList.length) {
    widthOpts = props?.tireOpts?.widthsList.map( (f, index) => {
      return f.width
    })
  }
  let diameterOpts = []
  if(props?.tireOpts?.rimsList.length) {
    diameterOpts = props?.tireOpts?.rimsList.map( (f, index) => {
      return f.rim
    })
  }  

  let speedIndexesOpts = []
  if(props?.tireOpts?.speedIndexesList.length) {
    speedIndexesOpts = props?.tireOpts?.speedIndexesList.map( (f, index) => {
      return f.speed_index
    })
  } 

  let loadIndexesOpts = []
  if(props?.tireOpts?.loadIndexesList.length) {
    loadIndexesOpts = props?.tireOpts?.loadIndexesList.map( (f, index) => {
      return f.load_index
    })
  } 

  let treadUsageOpts = []
  for(let i=0;i < 12;i += 0.5) {
    treadUsageOpts.push(i.toFixed(1)) 
  }

  let brandOpts = []
  if(props?.tireOpts?.brandsList.length) {
    brandOpts = props?.tireOpts?.brandsList.map( (f, index) => {
      return f.brand
    })
  }   
  const seasonOpts = ["Iarna","Vara","All season"]
  const rimOpts = ["DA", "NU"]

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Update anvelope" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          <div className="tire-details">            
            <SelectField onChange={props.onTireChange} name="selectedTire" width="240px" value={parseInt(props.selectedTire.tire_position)} fieldOptions={positionOpts} label="pozitie" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_width" width="240px" value={props.selectedTire.tire_width} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_height" width="240px" value={props.selectedTire.tire_height} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_diameter" width="240px" value={props.selectedTire.tire_diameter} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_speed_index" width="240px" value={props.selectedTire.tire_speed_index} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_load_index" width="240px" value={props.selectedTire.tire_load_index} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_brand" width="240px" value={props.selectedTire.tire_brand} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <InputField onChange={props.onChange}  name="tire_model" width="240px" value={props.selectedTire.tire_model} type="text" label="model" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <SelectField onChange={props.onChange} name="tire_season" width="240px" value={props.selectedTire.tire_season} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <InputField onChange={props.onChange}  name="tire_dot" width="240px" value={props.selectedTire.tire_dot} type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <SelectField onChange={props.onChange} name="tire_rim" width="240px" value={props.selectedTire.tire_rim} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <SelectField onChange={props.onChange} name="tire_tread_wear" width="240px" value={props.selectedTire.tire_tread_wear.toFixed(1)} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
        {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
        {props.success && <Alert alertClass="alert-success" message={props.success} /> } 
        {props.success &&
          <Link to="/dashboard/fisa_auto">
            <SaveButton btnType={'button'} btnDisabled={props.loading} text={'finalizeaza update anvelope'} bgcolor={'rgb(255, 158, 0)'} color={'#1D3557'}/>  
          </Link>
        }
      </div>
    </div>
  )
}
