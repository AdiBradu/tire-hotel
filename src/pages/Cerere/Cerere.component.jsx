import React from 'react'
import './Cerere.component.scss'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Table from '../../components/Table/Table.component'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import SelectField from '../../components/SelectField/SelectField.component'
import Alert from '../../components/Alert/Alert.component'

export default function Cerere(props) {
  const tblTiresHeaderKeys = ["Nr. Crt.", "Pozitionare", "Dimensiuni", "Ind. viteza si sarcina", "Sezon", "Brand", "Model", "Tip auto", "DOT", "Uzura"]
  const tirePositions = ["fata/dreapta","fata/stanga","spate/dreapta","spate/stanga","spate/exterior/dreapta","spate/exterior/stanga"]

  let tiresDisplayData = []
  if(props.rData.vehicleTires) {
    for (const [i, el] of props.rData.vehicleTires.entries()) { 
      let tireRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear.toFixed(2)]
      tiresDisplayData.push(tireRow)
    }
  }
  let actionBtnTxt = 'Aprobat';
  if(props.rData.request_status === 1) {
    actionBtnTxt = 'Procesat';
  }

  let hList = []
  if(props?.hotelsList?.length) {
    hList = props?.hotelsList.map( (v, index) => {
      return {val: v.hId, text: v.hName}
    })  
  }
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Detalii cerere"
          showSearchBar={false}
        />    
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
        <AutoPlate 
          reg_number={props.rData.reg_number}
          vehicle_type={props.rData.vehicle_type}
          vehicle_tire_count={props.rData.vehicle_tire_count}
        />
        <SectionSubTitle
          text={`Anvelope cerute`}
        /> 
        <Table
          tblHeader={tblTiresHeaderKeys}
          tblBody={tiresDisplayData}
          tableMainClass={"table-vehicle-dets"}
          tableSecondaryClass={"table-vehicle-dets-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9]}
        />    
        <SectionSubTitle
          text={`Detalii cerere`}
        />    
        <div className="request-dets">
          <span>{`Partener: ${props.rData.partner_name}`}</span>
          <span>{`Tip cerere: ${props.rData.req_text_type}`}</span>
          <span>{`Status cerere: ${props.rData.req_text_status}`}</span>
          {props.rData.request_status < 2 ?
          <>
            {props.rData.request_type === 1 & props.rData.request_status === 1 ?
              <span>
                <SelectField onChange={props.onHotelChange} name="req_hotel" value={props.selectedHotel} fieldOptions={hList} customValue={true} label="hotel" color={'#1D3557'} inputBackground={'#FFD185'} labelColor={'#1D3557'} />
              </span>
            :
            null
            }
           
          <span>
            <AddButton text={actionBtnTxt} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} btnDisabled={props.loading}  onClick={props.btnClick} />
          </span>
          </>
          :
          null
          }
        </div>         
      </div>
    </div>
  )
}