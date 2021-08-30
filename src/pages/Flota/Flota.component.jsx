import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import FleetStats from '../../components/FleetStats/FleetStats.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import AddSection from '../../components/AddSection/AddSection.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners';
import ReactPaginate from "react-paginate";
const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function Flota(props) {
  const tblHeaderKeys = ["nr. crt.", "nr. inmatriculare", "KM", "Tip auto", "Actiuni"]
  const [showFilters, setShowFilters] = useState(false)
  const vehicleFilterInfo = ["TURISM", "SUV", "CARGO"] 
  const actionsArr = [
    {
      iconIndex: 0,
      name: "delete",
      actionHandler: props.deleteActionHandler
    },
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

  let fleetDisplayData = props.fleetVehiclesList ? props.fleetVehiclesList.slice() : [];
 
  let dataSet = []

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Flota"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />    
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
          noUsageTires={props.fleetData.noUsageTires}           
        />
        <AddSection fleetId={props.fleetData.fi_id} />        
        <TableTitle 
          text="Portofoliu vehicule in flota"
          setShowFilters={setShowFilters}
          showFilters={showFilters} 
          dataSet={dataSet}
          xlsName={props.fleetData.fleet_name}
          sheetName={"Portofoliu vehicule flota"}
          elementsOnPageCount={fleetDisplayData.length}
          getExportData={props.getExportData}
          totalItems={props.totalItems}
        />        
        <FilterTab 
          showFilters={showFilters}
          filtersList={filtersList}
        />
        {!props.showSpinner ? 
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
            tableMainClass={"table"}
            tableSecondaryClass={"table-layout"}
            renderArr={[1,2,3,4,5]}
            actionsArr={actionsArr}
            linkTo={`/dashboard/fisa_auto`}
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