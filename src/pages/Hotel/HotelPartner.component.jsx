import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import AddHotelRequest from '../../components/AddHotelRequest/AddHotelRequest.component'
import {ScaleLoader} from 'react-spinners'
import Alert from '../../components/Alert/Alert.component'
import ReactPaginate from "react-paginate"

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function HotelPartner(props) {
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
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
        {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
        <SectionTitle 
          text="Hotel"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />    
        <AddHotelRequest 
          onChange={props.handleRequestChange}
          reqRegNumber={props.reqRegNumber}
          loading={props.loading}
          btnClick={props.handleSubmit}
        />  
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