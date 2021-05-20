import React, { useState } from 'react'
import './Partener.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import UserDetails from '../../components/UserDetails/UserDetails.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'
import PartnerDetails from '../../components/PartnerDetails/PartnerDetails.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterOrders from '../../components/FilterOrders/FilterOrders.component'
import {ScaleLoader} from 'react-spinners';
import Table from '../../components/Table/Table.component'
const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function Partener(props) {
  const [showFilters, setShowFilters] = useState(false)
  const tblHeaderKeys = ["nr. crt.", "data", "nr. inmatriculare", "cost interventie"]

  const filtersList = [
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "luna curenta",
      currentFilter: props.timePeriodFilter  
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "luna trecuta",
      currentFilter: props.timePeriodFilter    
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "anul curent",      
      currentFilter: props.timePeriodFilter    
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "anul trecut",
      currentFilter: props.timePeriodFilter    
    } 
  ]
  
  let ordersDisplayData = props.orders ? props.orders.slice() : [];

  if(props.timePeriodFilter) {
    ordersDisplayData = ordersDisplayData.filter(item => {
      let startTimestamp = 0
      let endTimestamp = 0
      switch(props.timePeriodFilter.toLowerCase()) {
        case 'luna trecuta':
          let now = new Date()
          endTimestamp  = new Date(now.getFullYear(), now.getMonth()-1, 0).getTime()
          startTimestamp = new Date(now.getFullYear(), now.getMonth()-1, 1).getTime()
          break;
        case 'anul curent':
          let n = new Date()
          startTimestamp  = new Date(n.getFullYear(), 0, 1).getTime()
          endTimestamp = Date.now()
          break;  
        case 'anul trecut':
          startTimestamp  = new Date(new Date().getFullYear() - 1, 0, 1).getTime()
          endTimestamp = new Date(new Date().getFullYear() - 1, 11, 0).getTime()
          break;  
        default:
          let d = new Date()
          d.setMonth(d.getMonth() - 1)
          d.setDate(0)
          d.setHours(0, 0, 0, 0)
          startTimestamp = d.getTime()
          endTimestamp = Date.now()
          break;
      }
      return (
        item.created >= startTimestamp &&
        endTimestamp >= item.created
      )
    })
  }
  let dataSet = []
  if(ordersDisplayData.length) {
    dataSet = [
      {
        columns: [
          {title: "Data", style: {font: {sz: "14", bold: true}}, width: {wpx: 120}}, 
          {title: "Nr. inmatriculare", style: {font: {sz: "14", bold: true}}, width: {wpx: 150}},
          {title: "KM", style: {font: {sz: "14", bold: true}}, width: {wpx: 150}}, 
          {title: "Cost interventie", style: {font: {sz: "14", bold: true}}, width: {wpx: 200}}
        ],
        data: ordersDisplayData.map((data, index) => [          
          {value: data.formattedDate, style: {font: {sz: "12"}}},
          {value: data.reg_number, style: {font: {sz: "12"}}},
          {value: data.vehicle_mileage, style: {font: {sz: "12"}}},
          {value: data.order_total, style: {font: {sz: "12"}}}
        ])
      }
    ]
  }
  let totalOrderCost = 0
  if(ordersDisplayData.length) {
    ordersDisplayData.forEach(el => totalOrderCost +=parseFloat(el.order_total))  
  }
  console.log('ordersDisplayData', ordersDisplayData)

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <div className="partner-listing">
          <div className="partner-section">
            <SectionTitle text="Fisa partener" />
            <SectionSubTitle 
              text={props.pData.partner_name}
              data={[]}
              name={""}/> 
            <TableTitle 
              text="Portofoliu comenzi"
              setShowFilters={setShowFilters}
              showFilters={showFilters}
              dataSet={dataSet}
              xlsName={`Export comenzi partener ${props.pData.partner_name}`}
              sheetName={"Portofoliu comenzi"} 
              elementsOnPageCount={ordersDisplayData.length}
            />   
            <FilterOrders 
              showFilters={showFilters}
              filtersList={filtersList}
            />        
            {ordersDisplayData.length ? 
              <>
              <Table
                tblHeader={tblHeaderKeys}
                tblBody={ordersDisplayData}
                linkTo={"/dashboard/comenzi/detalii"}
                tableMainClass={"table-orders"}
                tableSecondaryClass={"table-orders-layout"}
                renderArr={[1,3,5]}
              />           
              <TableTitle 
                text={`TOTAL Cost: ${totalOrderCost.toFixed(2)} Lei`}          
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
          <div className="partner-section">
            <form className="user-details" onSubmit={props.handleSubmit}>
              {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
              {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
              <div className="partner-dets">
                <UserDetails onChange={props.onChange} uDets={props.pData} />
                <PartnerDetails onChange={props.onChange} uDets={props.pData} />
              </div>
              <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}