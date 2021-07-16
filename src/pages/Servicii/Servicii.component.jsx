import React from 'react'
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

export default function Servicii(props) {
  const tblHeaderKeys = ["nr. crt.", "nume", "tip vehicul", "cost", "hotel", "tip cost", "actiuni"]  
  const actionsArr = [   
    {
      iconIndex: 1,
      name: "edit",
      actionHandler: props.editActionHandler
    }
  ]
 
  let servicesDisplayData = props.services ? props.services.slice() : [];
  
  if(props.search){
    servicesDisplayData = servicesDisplayData.filter(item => {
      const query = props.search.toLowerCase();
      return (
        item.service_name.toLowerCase().indexOf(query) >= 0 ||
        item.service_vehicle_type.toLowerCase().indexOf(query) >= 0 
      )
    })
  }
 
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle 
          text="Servicii"
          showSearchBar={true}
          onSearchBarChange={props.handleSearchChange}
          searchBarVal={props.search} 
        />
        <div className="add-section">
          <Link to="/dashboard/servicii/adauga">
            <AddButton text={'adauga serviciu'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
          </Link>
        </div>
        <TableTitle 
          text="Lista servicii"          
          dataSet={[]}
        />        
        {servicesDisplayData.length ?

          <Table
            tblHeader={tblHeaderKeys}
            tblBody={servicesDisplayData}
            tableMainClass={"services-table"}
            tableSecondaryClass={"services-table-layout"}
            renderArr={[1,2,3,4,6]}
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