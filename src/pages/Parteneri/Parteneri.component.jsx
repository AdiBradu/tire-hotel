import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import {ScaleLoader} from 'react-spinners';
import Table from '../../components/Table/Table.component'
const override =`
  width: 875px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`

export default function Parteneri(props) {
  const tblHeaderKeys = ["nr. crt.", "denumire", "judet", "actiuni"]
  const [showFilters, setShowFilters] = useState(false)
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
      onFilterChange: props.handleRegionFilterChange,
      name: "judet",
      filterInfo: props.regionFilterValues,
      currentFilter: props.regionFilter      
    }
  ]
  

  let partnersDisplayData = props.partners ? props.partners.slice() : [];
  if(props.regionFilter) {
    partnersDisplayData = partnersDisplayData.filter(item => item.partner_region.toLowerCase() === props.regionFilter.toLowerCase())
  }
  if(props.search){
    partnersDisplayData = partnersDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.partner_name.toLowerCase().indexOf(query) >= 0 ||
        item.partner_region.toLowerCase().indexOf(query) >= 0 
      )
    })
  }
  
  let dataSet = []
  if(props.partners) {
    dataSet = [
      {
        columns: [
          {title: "Denumire", style: {font: {sz: "14", bold: true}}, width: {wpx: 320}}, 
          {title: "Judet", style: {font: {sz: "14", bold: true}}, width: {wpx: 100}}
        ],
        data: partnersDisplayData.map((data, index) => [          
          {value: data.partner_name, style: {font: {sz: "12"}}},
          {value: data.partner_region, style: {font: {sz: "12"}}}
        ])
      }
    ]
  }
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Parteneri"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} 
        />
        <div className="add-section">
          <Link to="/dashboard/parteneri/adauga">
            <AddButton text={'adauga partener'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
          </Link>
          <Link to="/dashboard/parteneri/bulk">
            <AddButton text={'bulk import'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
          </Link>
        </div>
        <TableTitle 
          text="Portofoliu parteneri"
          setShowFilters={setShowFilters}
          showFilters={showFilters}
          dataSet={dataSet}
          xlsName={"Export parteneri"}
          sheetName={"Portofoliu parteneri"} 
          elementsOnPageCount={partnersDisplayData.length}
        />
        <FilterTab
          showFilters={showFilters}
          filtersList={filtersList}
        />
        {partnersDisplayData.length ?

          <Table
            tblHeader={tblHeaderKeys}
            tblBody={partnersDisplayData}
            tableMainClass={"partner-table"}
            tableSecondaryClass={"partner-table-layout"}
            renderArr={[1,2]}
            actionsArr={actionsArr}
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
