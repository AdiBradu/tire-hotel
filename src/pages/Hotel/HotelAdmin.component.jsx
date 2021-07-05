import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function HotelAdmin(props) {
  const tblHeaderKeys = ["nr. crt.", "nr. inmatriculare", "KM", "Tip auto", "Actiuni"]
  const [showFilters, setShowFilters] = useState(false)
  const vehicleFilterInfo = ["TURISM", "SUV", "CARGO"]
  const actionsArr = [    
    {
      iconIndex: 1,
      name: "edit",
      actionHandler: props.editActionHandler
    }
  ]
  const filtersList = [
    {
      onFilterChange: props.handleVehicleTypeFilterChange,
      name: "tip auto",
      filterInfo: vehicleFilterInfo,
      currentFilter: props.vehicleTypeFilter  
    }
  ]
  

  let fleetDisplayData = props.hotelVehiclesList ? props.hotelVehiclesList.slice() : [];
  if(props.vehicleTypeFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.vehicle_type.toLowerCase() === props.vehicleTypeFilter.toLowerCase())
  }
 
  if(props.search){
    fleetDisplayData = fleetDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.reg_number.toLowerCase().indexOf(query) >= 0 
      )
    })
  }
  let dataSet = []
  if(fleetDisplayData.length) {
    dataSet = [
      {
        columns: [
          {title: "Nr. Inmatriculare", style: {font: {sz: "14", bold: true}}, width: {wpx: 320}}, 
          {title: "KM", style: {font: {sz: "14", bold: true}}, width: {wpx: 100}},
          {title: "Tip auto", style: {font: {sz: "14", bold: true}}, width: {wpx: 100}}
        ],
        data: fleetDisplayData.map((data, index) => [          
          {value: data.reg_number, style: {font: {sz: "12"}}},
          {value: data.vehicle_milage, style: {font: {sz: "12"}}},
          {value: data.vehicle_type, style: {font: {sz: "12"}}}
        ])
      }
    ]
  }

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Hotel"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />    
        <TableTitle 
          text="Portofoliu hotel vehicule"
          setShowFilters={setShowFilters}
          showFilters={showFilters} 
          dataSet={dataSet}
          xlsName={"Portofoliu hotel vehicule"}
          sheetName={"Portofoliu hotel vehicule"}
          elementsOnPageCount={fleetDisplayData.length}
        />
        <FilterTab 
          showFilters={showFilters}
          filtersList={filtersList}
        />
        {fleetDisplayData.length ? 
        <Table 
          tblHeader={tblHeaderKeys}
          tblBody={fleetDisplayData}
          tableMainClass={"table"}
          tableSecondaryClass={"table-layout"}
          renderArr={[1,2,3,4,5]}
          actionsArr={actionsArr}          
        />
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