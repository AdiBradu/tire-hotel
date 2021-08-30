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

export default function CereriPartner(props) {
  const tblHeaderKeys = ["nr. crt.", "nr. inmatriculare", "Tip cerere", "Status cerere"]
  const [showFilters, setShowFilters] = useState(false)
  const reqTypeFilterInfo = ["Retragere", "Depozitare hotel Dinamic 92", "Depozitare hotel propriu"]
  const reqStatusFilterInfo = ["In asteptare", "Aprobata", "Procesata"]
     
  const filtersList = [
    {
      onFilterChange: props.handleReqTypeFilterChange,
      name: "tip cerere",
      filterInfo: reqTypeFilterInfo,
      currentFilter: props.reqTypeFilter  
    },
    {
      onFilterChange: props.handleReqStatusFilterChange,
      name: "status cerere",
      filterInfo: reqStatusFilterInfo,
      currentFilter: props.reqStatusFilter  
    }
  ]
  

  let reqDisplayData = props.reqList ? props.reqList.slice() : [];
 
  let dataSet = [] 

  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">    
        <SectionTitle 
          text="Cereri"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />           
        <TableTitle 
          text="Lista cereri"
          setShowFilters={setShowFilters}
          showFilters={showFilters} 
          dataSet={dataSet}
          xlsName={"Lista cereri"}
          sheetName={"Lista cereri"}
          elementsOnPageCount={reqDisplayData.length}
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
            tblBody={reqDisplayData}
            tableMainClass={"table-cereri-partener"}
            tableSecondaryClass={"table-layout-cereri-partener"}
            renderArr={[1,2,3]}         
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