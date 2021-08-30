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
import ReactPaginate from "react-paginate";

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;
export default function Tires(props) {
  const tblHeaderKeys = ["nr. crt.", "latime", "inaltime", "diametru", "ind. viteza", "ind. sarcina", "sezon", "brand", "tip auto", "uzura", "uzura (mm)", "DOT"]
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
      onFilterChange: props.handleTreadUsageMmFilterChange,
      name: "uzura (mm)",
      filterInfo: props.tiresTreadUsageMmFilterValues,
      currentFilter: props.tiresTreadUsageMmFilter   
    },
    {
      onFilterChange: props.handleDotFilterChange,
      name: "DOT",
      filterInfo: props.tiresDotFilterValues,
      currentFilter: props.tiresDotFilter   
    }
  ]
  let fleetDisplayData = props.fleetTiresList ? props.fleetTiresList.slice() : [];  
  let dataSet = []
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
          getExportData={props.getExportData}
          totalItems={parseInt(props.fleetData.excessiveUsageTires + props.fleetData.mediumUsageTires + props.fleetData.noUsageTires)}
        />
        <FilterTab
          showFilters={showFilters}
          filtersList={filtersList}
        />
        {!props.showSpinner && fleetDisplayData.length ? 
        <>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={props.pageCount}
          onPageChange={props.changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={5}
          forcePage={props.pageNumber}
        />
        <Table
          tblHeader={tblHeaderKeys}
          tblBody={fleetDisplayData}     
          tableMainClass={"table-tires"}
          tableSecondaryClass={"table-tires-layout"}
          renderArr={[1,2,3,4,5,6,7,8,9,10,11]}    
          pageNumber={props.pageNumber}
          itemsPerPage={props.itemsPerPage}
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={props.pageCount}
          onPageChange={props.changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={5}
          forcePage={props.pageNumber}
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