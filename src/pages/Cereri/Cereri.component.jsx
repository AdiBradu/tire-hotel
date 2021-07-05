import React, { useState } from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import Table from '../../components/Table/Table.component'
import {ScaleLoader} from 'react-spinners'

const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function Cereri(props) {
  const tblHeaderKeys = ["nr. crt.", "nr. inmatriculare", "Tip cerere", "Status cerere"]
  const [showFilters, setShowFilters] = useState(false)
  const reqTypeFilterInfo = ["Retragere", "Depozitare"]
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
  if(props.reqTypeFilter) {
    reqDisplayData = reqDisplayData.filter(item => item.request_type.toLowerCase() === props.reqTypeFilter.toLowerCase())
  }

  if(props.reqStatusFilter) {
    reqDisplayData = reqDisplayData.filter(item => item.request_status.toLowerCase() === props.reqStatusFilter.toLowerCase())
  }
 
 
  if(props.search){
    reqDisplayData = reqDisplayData.filter(item => {
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
        {reqDisplayData.length ? 
        <Table 
          tblHeader={tblHeaderKeys}
          tblBody={reqDisplayData}
          tableMainClass={"table"}
          tableSecondaryClass={"table-layout"}
          renderArr={[1,2,3]}        
          linkTo={"/dashboard/cerere"} 
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