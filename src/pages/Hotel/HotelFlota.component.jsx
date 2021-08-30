import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners'
import ReactPaginate from "react-paginate"

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function HotelFlota(props) {
  const tblHeaderKeys = ["nr. crt.", "nr. inmatriculare", "KM", "Tip auto"]
  const [showFilters, setShowFilters] = useState(false)
  const vehicleFilterInfo = ["TURISM", "SUV", "CARGO"]
 
  const filtersList = [
    {
      onFilterChange: props.handleVehicleTypeFilterChange,
      name: "tip auto",
      filterInfo: vehicleFilterInfo,
      currentFilter: props.vehicleTypeFilter  
    }
  ]
  

  let fleetDisplayData = props.hotelVehiclesList ? props.hotelVehiclesList.slice() : [];
 
  let dataSet = []
 

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