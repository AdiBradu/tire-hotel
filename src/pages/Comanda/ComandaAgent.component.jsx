import React from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners';
import './Comanda.component.scss'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`
export default function ComandaAgent(props) {
  const tblHeaderKeys = ["nr. crt.", "serviciu", "cost partener", "cost flota", "partener", "flota"]  
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Detalii comanda"
          showSearchBar={false}
        />       
        <AutoPlate 
          reg_number={props.orderDisplayData.vehicle_reg_number}
          vehicle_type={props.orderDisplayData.vehicle_type}
          vehicle_tire_count={props.orderDisplayData.vehicle_tire_count}
        />
        <TableTitle 
          text="Istoric comanda"
          dataSet={[]}
        />        
        {props.orderDisplayData ? 
          <>
          <Table 
            tblHeader={tblHeaderKeys}
            tblBody={props.orderDisplayData.order_details}           
            tableMainClass={"table-admin-order-details"}
            tableSecondaryClass={"table-admin-order-details-layout"}
            renderArr={[1,2,3,5,6]}
          />           
          <TableTitle 
            text={`Total partener: ${parseFloat(props.orderDisplayData.order_total.toFixed(2))} Lei`}          
            dataSet={[]}
          />
          <TableTitle 
            text={`Total flota: ${parseFloat(props.orderDisplayData.order_total_fleet.toFixed(2))} Lei`}          
            dataSet={[]}
          />
          </>
        :         
        <ScaleLoader 
        css={override}
        height='50px'
        width='5px'
        color={"#457B9D"}
        loading={props.showSpinner}
        />
        }
      </div>
    </div>
  )
}