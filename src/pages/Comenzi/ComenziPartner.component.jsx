import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners';
import FilterOrders from '../../components/FilterOrders/FilterOrders.component'
import './Comenzi.component.scss'
import ReactPaginate from "react-paginate"

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`
export default function ComenziPartner(props) {
  const tblHeaderKeys = ["nr. crt.", "data", "nr. inmatriculare", "km", "cost interventie"]
  const [showFilters, setShowFilters] = useState(false)
  const filtersList = [
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "luna curenta",
      currentFilter: props.timePeriodFilter  
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "luna trecuta",
      currentFilter: props.timePeriodFilter    
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "anul curent",      
      currentFilter: props.timePeriodFilter    
    },
    {
      onFilterChange: props.handleTimePeriodFilterChange,
      name: "anul trecut",
      currentFilter: props.timePeriodFilter    
    } 
  ]
  
  let ordersDisplayData = props.orders ? props.orders.slice() : [];

 
  
  let dataSet = []
  
  let totalOrderCost = 0
  if(ordersDisplayData.length) {
    ordersDisplayData.forEach(el => totalOrderCost +=parseFloat(el.order_total))  
  }
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Comenzi"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} />               
        <TableTitle 
          text="Istoric comenzi"
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          dataSet={dataSet}
          xlsName={"Export comenzi"}
          sheetName={"Istoric comenzi"} 
          elementsOnPageCount={ordersDisplayData.length}
          getExportData={props.getExportData}
          totalItems={props.totalItems}
        />
        <FilterOrders 
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
            tblBody={ordersDisplayData}
            linkTo={"/dashboard/comenzi/detalii"}
            tableMainClass={"table-orders"}
            tableSecondaryClass={"table-orders-layout"}
            renderArr={[1,3,4,5]}
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
          <TableTitle 
            text={`TOTAL Cost: ${totalOrderCost.toFixed(2)} Lei`}          
            dataSet={[]}
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