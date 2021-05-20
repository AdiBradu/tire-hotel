import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
import TableTitle from '../../components/TableTitle/TableTitle.component'
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

export default function Agenti(props) {
  const tblHeaderKeys = ["nr. crt.", "email", "nume", "prenume", "actiuni"]  
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
 
  let agentsDisplayData = props.agents ? props.agents.slice() : [];
  
  if(props.search){
    agentsDisplayData = agentsDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.first_name.toLowerCase().indexOf(query) >= 0 ||
        item.last_name.toLowerCase().indexOf(query) >= 0 ||
        item.email.toLowerCase().indexOf(query) >= 0 
      )
    })
  }
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Agenti"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} 
        />
        <div className="add-section">
          <Link to="/dashboard/agenti/adauga">
            <AddButton text={'adauga agent'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
          </Link>
        </div>
        <TableTitle 
          text="Portofoliu agenti"          
          dataSet={[]}
        />        
        {agentsDisplayData.length ?

          <Table
            tblHeader={tblHeaderKeys}
            tblBody={agentsDisplayData}
            tableMainClass={"agent-table"}
            tableSecondaryClass={"agent-table-layout"}
            renderArr={[2,3,4]}
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