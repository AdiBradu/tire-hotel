import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
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
export default function Flote(props) {
  const tblHeaderKeys = ["nr. crt.", "denumire", "judet", "vehicule", "anvelope", "Health score", "Actiuni"]
  const [showFilters, setShowFilters] = useState(false)
  let actionsArr = []
  if(props.currentUserType === 1) {
    actionsArr = [
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
  } else if(props.currentUserType === 2) {
    actionsArr = [     
      {
        iconIndex: 1,
        name: "edit",
        actionHandler: props.editActionHandler
      }
    ]
  }
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
          text="Flote"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />       
        <div className="add-section">
          <Link to="/dashboard/flote/adauga">
            <AddButton 
              text={'adauga flota'}
              bgcolor={'#06D6A0'}
              color={'#1D3557'}
              weight={'600'}
              img={AddLogo}/>
          </Link>
        </div>
        <TableTitle 
          text="Portofoliu flote"
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          dataSet={dataSet}
          xlsName={"Export flote"}
          sheetName={"Portofoliu flote"} 
          elementsOnPageCount={fleetsDisplayData.length}
          totalItems={props.totalItems}
          getExportData={props.getExportData}
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
            tblBody={fleetsDisplayData}
            linkTo={"/dashboard/flota"}
            tableMainClass={"table-flote"}
            tableSecondaryClass={"table-layout-flote"}
            renderArr={[1,2,3,4,8]}
            actionsArr={actionsArr}
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
