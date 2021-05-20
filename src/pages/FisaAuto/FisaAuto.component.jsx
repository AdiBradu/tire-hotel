import React from 'react'
import { Link } from 'react-router-dom'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Table from '../../components/Table/Table.component'
import './FisaAuto.component.scss'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
import Alert from '../../components/Alert/Alert.component'

export default function FisaAuto(props) {
  const tblTiresHeaderKeys = ["Nr. Crt.", "Pozitionare", "Dimensiuni", "Ind. viteza si sarcina", "Sezon", "Brand", "Model", "Tip auto", "DOT", "Uzura"]
  const tblServicesHeaderKeys = ["Nr. Crt.", "Data", "Tip serviciu", "Actiuni"]
  const tirePositions = ["fata/dreapta","fata/stanga","spate/dreapta","spate/stanga","spate/exterior/dreapta","spate/exterior/stanga"]
  const actionsArr = [
    {
      iconIndex: 0,
      name: "delete",
      actionHandler: props.deleteActionHandler
    }
  ]
  let tiresDisplayData = []
  if(props.vehicleTires) {
    for (const [i, el] of props.vehicleTires.entries()) { 
      let tireRow = [el.t_id,tirePositions[i], el.width+"/"+el.height+"/"+el.diameter, el.speed_index+" "+el.load_index, el.tire_season, el.brand, el.tire_model, el.vehicle_type, el.tire_dot, el.tire_tread_wear]
      tiresDisplayData.push(tireRow)
    }
  }
  let today = new Date();
  let d = today.getDate();
  /* if(d < 10) {
    d = "0" + d
  } */
  let m = today.getMonth()+1; 
  let y = today.getFullYear();

  let servicesDisplayData = []
  if(props.selectedServices) {
    for (const [i, el] of props.selectedServices.entries()) { 
      let sRow = [el.s_id,d+"/"+m+"/"+y,el.service_name]
      servicesDisplayData.push(sRow)
    }
  }
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Fisa auto"
          showSearchBar={false}
        />    
        <AutoPlate 
          reg_number={props.reg_number}
          vehicle_type={props.vehicle_type}
          vehicle_tire_count={props.vehicle_tire_count}
        />
        <SectionSubTitle
          text={"Anvelope montate pe masina"}
        /> 
        <Table
          tblHeader={tblTiresHeaderKeys}
          tblBody={tiresDisplayData}
          tableMainClass={"table-services-tires"}
          tableSecondaryClass={"table-services-tires-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9]}
        />
        <Link to="/dashboard/adauga/serviciu">
          <AddButton text={'ADAUGA SERVICIU'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
        </Link>
        <SectionSubTitle
          text={"Servicii operate"}
        /> 
        <Table
          tblHeader={tblServicesHeaderKeys}
          tblBody={servicesDisplayData}
          tableMainClass={"table-services"}
          tableSecondaryClass={"table-services-layout"}
          actionsArr={actionsArr}
          renderArr={[1,2,3]}
        />
        {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
        {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
        <AddButton 
          text={'FINALIZEAZA'}
          bgcolor={'rgb(255, 158, 0)'}
          color={'white'} 
          weight={'600'}
          onClick={props.completeOrder}
          btnDisabled={props.disableSubmitBtn}
        />
      </div>
    </div>
  )
}
