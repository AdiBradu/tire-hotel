import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners';
import FilterOrders from '../../components/FilterOrders/FilterOrders.component'
import './Comenzi.component.scss'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`
export default function ComenziPartner(props) {
  const tblHeaderKeys = ["nr. crt.", "data", "nr. inmatriculare", "km", "cost interventie"]
  const [showFilters, setShowFilters] = useState(false)
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
  
  
  if(props.search){
    ordersDisplayData = ordersDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.reg_number.toLowerCase().indexOf(query) >= 0 
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
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Comenzi"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />               
        <TableTitle 
          text="Istoric comenzi"
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          dataSet={dataSet}
          xlsName={"Export comenzi"}
          sheetName={"Istoric comenzi"} 
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
            renderArr={[1,3,4,5]}
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
    </div>
  )
}