import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import FleetStats from '../../components/FleetStats/FleetStats.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import {ScaleLoader} from 'react-spinners'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Table from '../../components/Table/Table.component'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;
export default function Tires(props) {
  const tblHeaderKeys = ["nr. crt.", "latime", "inaltime", "diametru", "ind. viteza", "ind. sarcina", "sezon", "brand", "tip auto", "uzura", "DOT"]
  const [showFilters, setShowFilters] = useState(false)   
  const filtersList = [
    {
      onFilterChange: props.handleWidthFilterChange,
      name: "latime",
      filterInfo: props.tiresWidthFilterValues,
      currentFilter: props.tiresWidthFilter      
    },
    {
      onFilterChange: props.handleHeightFilterChange,
      name: "inaltime",
      filterInfo: props.tiresHeightFilterValues,
      currentFilter: props.tiresHeightFilter      
    },
    {
      onFilterChange: props.handleDiameterFilterChange,
      name: "diametru",
      filterInfo: props.tiresDiameterFilterValues,
      currentFilter: props.tiresDiameterFilter       
    },
    {
      onFilterChange: props.handleSeasonFilterChange,
      name: "sezon",
      filterInfo: props.tiresSeasonFilterValues,
      currentFilter: props.tiresSeasonFilter     
    },
    {
      onFilterChange: props.handleBrandFilterChange,
      name: "brand",
      filterInfo: props.tiresBrandFilterValues,
      currentFilter: props.tiresBrandFilter     
    },
    {
      onFilterChange: props.handleVehicleTypeFilterChange,
      name: "tip auto",
      filterInfo: props.tiresVehicleTypeFilterValues,
      currentFilter: props.vehicleTypeFilter     
    },
    {
      onFilterChange: props.handleTreadUsageFilterChange,
      name: "uzura",
      filterInfo: props.tiresTreadUsageFilterValues,
      currentFilter: props.tiresTreadUsageFilter   
    },
    {
      onFilterChange: props.handleDotFilterChange,
      name: "DOT",
      filterInfo: props.tiresDotFilterValues,
      currentFilter: props.tiresDotFilter   
    }
  ]


  let fleetDisplayData = props.fleetTiresList ? props.fleetTiresList.slice() : [];  
  
  if(props.tiresWidthFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.width.toLowerCase() === props.tiresWidthFilter.toLowerCase())
  }
  if(props.tiresHeightFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.height.toLowerCase() === props.tiresHeightFilter.toLowerCase())
  }
  if(props.tiresDiameterFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.diameter.toLowerCase() === props.tiresDiameterFilter.toLowerCase())
  }
  if(props.tiresSeasonFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.tire_season.toLowerCase() === props.tiresSeasonFilter.toLowerCase())
  }
  if(props.tiresBrandFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.brand.toLowerCase() === props.tiresBrandFilter.toLowerCase())
  }
  if(props.vehicleTypeFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.vehicle_type.toLowerCase() === props.vehicleTypeFilter.toLowerCase())
  }
  if(props.tiresTreadUsageFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.tread_wear.toLowerCase() === props.tiresTreadUsageFilter.toLowerCase())
  }
  if(props.tiresDotFilter) {
    fleetDisplayData = fleetDisplayData.filter(item => item.tire_dot.toLowerCase() === props.tiresDotFilter.toLowerCase())
  }
 
  let dataSet = []
  if(fleetDisplayData.length) {
    dataSet = [
      {
        columns: [
          {title: "Latime", style: {font: {sz: "14", bold: true}}}, 
          {title: "Inaltime", style: {font: {sz: "14", bold: true}}},
          {title: "Diametru", style: {font: {sz: "14", bold: true}}},
          {title: "Ind. viteza", style: {font: {sz: "14", bold: true}}},
          {title: "Ind. sarcina", style: {font: {sz: "14", bold: true}}},
          {title: "Sezon", style: {font: {sz: "14", bold: true}}},
          {title: "Brand", style: {font: {sz: "14", bold: true}}},
          {title: "Tip auto", style: {font: {sz: "14", bold: true}}},
          {title: "Uzura", style: {font: {sz: "14", bold: true}}},
          {title: "DOT", style: {font: {sz: "14", bold: true}}}

        ],
        data: fleetDisplayData.map((data, index) => [          
          {value: data.width, style: {font: {sz: "12"}}},
          {value: data.height, style: {font: {sz: "12"}}},
          {value: data.diameter, style: {font: {sz: "12"}}},
          {value: data.speed_index, style: {font: {sz: "12"}}},
          {value: data.load_index, style: {font: {sz: "12"}}},
          {value: data.tire_season, style: {font: {sz: "12"}}},
          {value: data.brand, style: {font: {sz: "12"}}},
          {value: data.vehicle_type, style: {font: {sz: "12"}}},
          {value: data.tread_wear, style: {font: {sz: "12"}}},
          {value: data.tire_dot, style: {font: {sz: "12"}}}
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
          showSearchBar={false}
         />    
        <SectionSubTitle 
          text={props.fleetData.fleet_name}
          data={props.fleetData.vehiclesCount}
          name={"vehicule"}/>     
        <FleetStats 
          fleetTurismCount={props.fleetData.fleetTurismCount}
          fleetTurismTireCount={props.fleetData.fleetTurismTireCount}
          fleetTurismSizesCount={props.fleetData.fleetTurismSizesCount}
          fleetSuvCount={props.fleetData.fleetSuvCount}
          fleetSuvTireCount={props.fleetData.fleetSuvTireCount}
          fleetSuvSizesCount={props.fleetData.fleetSuvSizesCount}
          fleetCargoCount={props.fleetData.fleetCargoCount}
          fleetCargoTireCount={props.fleetData.fleetCargoTireCount}
          fleetCargoSizesCount={props.fleetData.fleetCargoSizesCount}
          excessiveUsageTires={props.fleetData.excessiveUsageTires}
          mediumUsageTires={props.fleetData.mediumUsageTires}
          noUsageTires={props.fleetData.noUsageTires} />
        <TableTitle 
          text="Portofoliu anvelope"
          setShowFilters={setShowFilters}
          showFilters={showFilters} 
          dataSet={dataSet}
          xlsName={props.fleetData.fleet_name}
          sheetName={"Portofoliu anvelope"}
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
          tableMainClass={"table-tires"}
          tableSecondaryClass={"table-tires-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9,10]}    
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