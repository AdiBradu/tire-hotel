import React from 'react'
import './TireDetails.component.scss'
import InputField from '../InputField/InputField.component'
import SelectField from '../SelectField/SelectField.component'
import SectionSubTitle from '../SectionSubTitle/SectionSubTitle.component';
import Filter from '../Filter/Filter.component';
import CheckBox from '../CheckBox/CheckBox.component';

export default function TireDetails(props) { 
  const tiresFilterInfo = [4, 6]
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
  for(let i=0;i < 12;i += 0.1) {
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
  const vehicleTypeOpts = ["TURISM","SUV","CARGO"]
  
  return (
    <div className="vehicle-wrapper">
      <div className="filter-tab active">
          <Filter name={'Nr roti'} onFilterChange={props.handleTiresFilterChange} filterInfo={tiresFilterInfo} currentFilter={props.tireFilter} />
      </div>
      <CheckBox name={"prefill"} checked={props.prefill} onChange={props.updatePrefillStatus} />  
      <div className="vehicle-tires">    
        <div className="tire-details">
          <p>Detalii anvelope</p>

          <div className="tires-wrapper">
            <div className="tire-layout">
              <SectionSubTitle text="" data="" name={"Fata/Dreapta"}/>
              <div className="tire-row">
                <SelectField onChange={props.onChange} name="widths_0" value={props.vData.vehicleTires?.widths[0]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="heights_0" value={props.vData.vehicleTires?.heights[0]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="diameters_0" value={props.vData.vehicleTires?.diameters[0]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="speedIndexes_0" value={props.vData.vehicleTires?.speedIndexes[0]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="loadIndexes_0" value={props.vData.vehicleTires?.loadIndexes[0]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="brands_0" value={props.vData.vehicleTires?.brands[0]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="models_0" value={props.vData.vehicleTires?.models[0]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="seasons_0" value={props.vData.vehicleTires?.seasons[0]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="dots_0" value={props.vData.vehicleTires?.dots[0]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="rims_0" value={props.vData.vehicleTires?.rims[0]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="treadUsages_0" value={props.vData.vehicleTires?.treadUsages[0]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </div>
            </div>

            <div className="tire-layout">
              <SectionSubTitle text="" data="" name={"Fata/Stanga"}/>
              <div className="tire-row">
                <SelectField onChange={props.onChange} name="widths_1" value={props.vData.vehicleTires?.widths[1]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="heights_1" value={props.vData.vehicleTires?.heights[1]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="diameters_1" value={props.vData.vehicleTires?.diameters[1]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="speedIndexes_1" value={props.vData.vehicleTires?.speedIndexes[1]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="loadIndexes_1" value={props.vData.vehicleTires?.loadIndexes[1]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="brands_1" value={props.vData.vehicleTires?.brands[1]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="models_1" value={props.vData.vehicleTires?.models[1]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="seasons_1" value={props.vData.vehicleTires?.seasons[1]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="dots_1" value={props.vData.vehicleTires?.dots[1]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="rims_1" value={props.vData.vehicleTires?.rims[1]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="treadUsages_1" value={props.vData.vehicleTires?.treadUsages[1]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </div>
            </div>

            <div className="tire-layout">
              <SectionSubTitle text="" data="" name={"Spate/Dreapta"}/>
              <div className="tire-row">
                <SelectField onChange={props.onChange} name="widths_2" value={props.vData.vehicleTires?.widths[2]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="heights_2" value={props.vData.vehicleTires?.heights[2]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="diameters_2" value={props.vData.vehicleTires?.diameters[2]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="speedIndexes_2" value={props.vData.vehicleTires?.speedIndexes[2]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="loadIndexes_2" value={props.vData.vehicleTires?.loadIndexes[2]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="brands_2" value={props.vData.vehicleTires?.brands[2]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="models_2" value={props.vData.vehicleTires?.models[2]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="seasons_2" value={props.vData.vehicleTires?.seasons[2]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="dots_2" value={props.vData.vehicleTires?.dots[2]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="rims_2" value={props.vData.vehicleTires?.rims[2]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="treadUsages_2" value={props.vData.vehicleTires?.treadUsages[2]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </div>
            </div>

            <div className="tire-layout">
              <SectionSubTitle text="" data="" name={"Spate/Stanga"}/>
              <div className="tire-row">
                <SelectField onChange={props.onChange} name="widths_3" value={props.vData.vehicleTires?.widths[3]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="heights_3" value={props.vData.vehicleTires?.heights[3]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="diameters_3" value={props.vData.vehicleTires?.diameters[3]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="speedIndexes_3" value={props.vData.vehicleTires?.speedIndexes[3]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="loadIndexes_3" value={props.vData.vehicleTires?.loadIndexes[3]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="brands_3" value={props.vData.vehicleTires?.brands[3]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="models_3" value={props.vData.vehicleTires?.models[3]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="seasons_3" value={props.vData.vehicleTires?.seasons[3]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="dots_3" value={props.vData.vehicleTires?.dots[3]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="rims_3" value={props.vData.vehicleTires?.rims[3]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="treadUsages_3" value={props.vData.vehicleTires?.treadUsages[3]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </div>
            </div>

            <div className="tire-layout">
              {props.vehicleTireCount > 4 && 
              <SectionSubTitle text="" data="" name={"Spate/Exterior/Dreapta"}/>}
              {props.vehicleTireCount > 4 &&
              <div className="tire-row">
                <SelectField onChange={props.onChange} name="widths_4" value={props.vData.vehicleTires?.widths[4]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="heights_4" value={props.vData.vehicleTires?.heights[4]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="diameters_4" value={props.vData.vehicleTires?.diameters[4]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="speedIndexes_4" value={props.vData.vehicleTires?.speedIndexes[4]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="loadIndexes_4" value={props.vData.vehicleTires?.loadIndexes[4]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="brands_4" value={props.vData.vehicleTires?.brands[4]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="models_4" value={props.vData.vehicleTires?.models[4]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="seasons_4" value={props.vData.vehicleTires?.seasons[4]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <InputField onChange={props.onChange}  name="dots_4" value={props.vData.vehicleTires?.dots[4]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
                <SelectField onChange={props.onChange} name="rims_4" value={props.vData.vehicleTires?.rims[4]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
                <SelectField onChange={props.onChange} name="treadUsages_4" value={props.vData.vehicleTires?.treadUsages[4]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </div>
              }
            </div>

            <div className="tire-layout">
            {props.vehicleTireCount > 4 &&
            <SectionSubTitle text="" data="" name={"Spate/Exterior/Stanga"}/>}
            {props.vehicleTireCount > 4 &&
            <div className="tire-row">
              <SelectField onChange={props.onChange} name="widths_5" value={props.vData.vehicleTires?.widths[5]} fieldOptions={widthOpts} label="latime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="heights_5" value={props.vData.vehicleTires?.heights[5]} fieldOptions={heightOpts} label="inaltime" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="diameters_5" value={props.vData.vehicleTires?.diameters[5]} fieldOptions={diameterOpts} label="diametru" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="speedIndexes_5" value={props.vData.vehicleTires?.speedIndexes[5]} fieldOptions={speedIndexesOpts} label="ind. viteza" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="loadIndexes_5" value={props.vData.vehicleTires?.loadIndexes[5]} fieldOptions={loadIndexesOpts} label="ind. sarcina" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="brands_5" value={props.vData.vehicleTires?.brands[5]} fieldOptions={brandOpts} label="brand" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <InputField onChange={props.onChange}  name="models_5" value={props.vData.vehicleTires?.models[5]} type="text" label="model" width="180px" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
              <SelectField onChange={props.onChange} name="seasons_5" value={props.vData.vehicleTires?.seasons[5]} fieldOptions={seasonOpts} optTextEqualsValue={true} label="sezon" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <InputField onChange={props.onChange}  name="dots_5" value={props.vData.vehicleTires?.dots[5]}  width="70px" type="text" label="DOT" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
              <SelectField onChange={props.onChange} name="rims_5" value={props.vData.vehicleTires?.rims[5]} fieldOptions={rimOpts} label="janta" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              <SelectField onChange={props.onChange} name="treadUsages_5" value={props.vData.vehicleTires?.treadUsages[5]} fieldOptions={treadUsageOpts} optTextEqualsValue={true} label="uzura" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            </div>}
          </div>
          </div>
        </div>  
        <div className="tire-details">
          <p>Detalii identificare auto</p>
          <SectionSubTitle text="" data="" name=""/>
          <div className="vehicle-row">
            <InputField onChange={props.onChange} name="regNumber" value={props.vData.regNumber} type="text" label="nr. inmatriculare" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="vechicleBrand" value={props.vData.vechicleBrand} type="text" label="marca" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <InputField onChange={props.onChange} name="vechicleModel" value={props.vData.vechicleModel} type="text" label="model" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
            <SelectField onChange={props.onChange} name="vehicleType" value={props.vData.vehicleType} fieldOptions={vehicleTypeOpts} optTextEqualsValue={true} label="tip" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
            <InputField onChange={props.onChange} name="vechicleMilage" value={props.vData.vechicleMilage} type="text" label="km" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'}/>
          </div>
        </div>
      </div> 
    </div>      
  )
}
