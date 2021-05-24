import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import {ScaleLoader} from 'react-spinners';
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import Table from '../../components/Table/Table.component'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;

export default function Anvelope(props) {
  const tblHeaderKeys = ["nr. crt.", "denumire", "judet", "vehicule", "anvelope", "Health score"]
  const [showFilters, setShowFilters] = useState(false)
  const filtersList = [
    {
      onFilterChange: props.handleRegionFilterChange,
      name: "judet",
      filterInfo: props.regionFilterValues,
      currentFilter: props.regionFilter  
    },
    {
      onFilterChange: props.handleHealthScoreFilterChange,
      name: "health score",
      filterInfo: props.healthScoreFilterValues,
      currentFilter: props.healthScoreFilter    
    } 
  ]
  
  let fleetsDisplayData = props.fleets ? props.fleets.slice() : [];
  if(props.regionFilter) {
    fleetsDisplayData = fleetsDisplayData.filter(item => item.fleet_region.toLowerCase() === props.regionFilter.toLowerCase())
  }
  if(props.healthScoreFilter !== "" && props.healthScoreFilter !== null && props.healthScoreFilter !== undefined) {
    fleetsDisplayData = fleetsDisplayData.filter(item => item.tireHealthScore === props.healthScoreFilter)
  }
  if(props.search){
    fleetsDisplayData = fleetsDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.fleet_name.toLowerCase().indexOf(query) >= 0 ||
        item.fleet_region.toLowerCase().indexOf(query) >= 0 
      )
    })
  }
  
  let dataSet = []
  if(fleetsDisplayData.length) {
    dataSet = [
      {
        columns: [
          {title: "Denumire", style: {font: {sz: "14", bold: true}}, width: {wpx: 320}}, 
          {title: "Judet", style: {font: {sz: "14", bold: true}}, width: {wpx: 100}},
          {title: "Vehicule", style: {font: {sz: "14", bold: true}}, width: {wpx: 100}}, 
          {title: "Anvelope", style: {font: {sz: "14", bold: true}}, width: {wpx: 140}}, 
          {title: "Health Score", style: {font: {sz: "14", bold: true}}, width: {wpx: 135}}, 
            
        ],
        data: fleetsDisplayData.map((data, index) => [          
          {value: data.fleet_name, style: {font: {sz: "12"}}},
          {value: data.fleet_region, style: {font: {sz: "12"}}},
          {value: data.vehiclesCount, style: {font: {sz: "12"}}},
          {value: data.tiresCount, style: {font: {sz: "12"}}},
          {value: data.tireHealthScore, style: {font: {sz: "12"}}},
        ])
      }
    ]
  }

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Anvelope"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} 
        />       
        <SectionSubTitle text="Toate" data={props.totalTires} name={"anvelope"}/>
        <TableTitle
          text="Portofoliu anvelope"
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          dataSet={dataSet}
          xlsName={"Export portofoliu anvelope"}
          sheetName={"Portofoliu anvelope"} 
          elementsOnPageCount={fleetsDisplayData.length}
        />
        {fleetsDisplayData.length ?
        <FilterTab 
          showFilters={showFilters}
          filtersList={filtersList}
        />
        :
        null
        }
        {fleetsDisplayData.length ?
          <Table
            tblHeader={tblHeaderKeys}
            tblBody={fleetsDisplayData}            
            linkTo={"/dashboard/flote/anvelope"}
            tableMainClass={"table"}
            tableSecondaryClass={"table-layout"}
            renderArr={[1,2,3,4,8]}
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
