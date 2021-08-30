import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import {ScaleLoader} from 'react-spinners';
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import Table from '../../components/Table/Table.component'
import ReactPaginate from "react-paginate"

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
  
  let dataSet = []

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
          getExportData={props.getExportData}
          xlsName={"Export portofoliu anvelope"}
          sheetName={"Portofoliu anvelope"} 
          elementsOnPageCount={fleetsDisplayData.length}
          totalItems={props.totalItems}
        />
         
        {fleetsDisplayData.length ?
        <FilterTab 
          showFilters={showFilters}
          filtersList={filtersList}
        />
        :
        null
        }
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
            tblBody={fleetsDisplayData}            
            linkTo={"/dashboard/flote/anvelope"}
            tableMainClass={"table-anvelope"}
            tableSecondaryClass={"table-layout-anvelope"}
            renderArr={[1,2,3,4,8]}
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
