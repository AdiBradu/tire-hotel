import React from 'react'
import './Dashboard.component.scss'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import FleetStats from '../../components/FleetStats/FleetStats.component'
import AddSection from '../../components/AddSection/AddSection.component'
import Table from '../../components/Table/Table.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'
import AutoPlate from '../../components/AutoPlate/AutoPlate.component'
import TableAction from '../../components/TableAction/TableAction.component'
import edit from '../../assets/edit.png'
import del from '../../assets/delete.png'
import DragDrop from '../../components/DragDrop/DragDrop.component'
import AddTire from '../../components/AddTire/AddTire.component'
import FleetOptions from '../../components/FleetOptions/FleetOptions.component'
import SearchAuto from '../../components/SearchAuto/SearchAuto.component'
import ReturnSearchAuto from '../../components/ReturnSearchAuto/ReturnSearchAuto.component'
import ServiceList from '../../components/ServiceList/ServiceList.component' 


export default function Dashboard() {
    return (
        <div className="dashboard">
                <Navigation/>
                <div className="workspace">
                    <ServiceList/>
                    {/* <ReturnSearchAuto text="B123WTS a fost gasit." action="start service" bgcolor={"#06D6A0"} color="#1D3557"/> */}
                    {/* <ReturnSearchAuto text="B123WTS nu a fost gasit." action="cauta din nou" bgcolor={"#FF9E00"} color="#1D3557"/> */}
                    {/* <SearchAuto/> */}
                    {/* <FleetOptions/> */}
                    {/* <SectionTitle text="Adauga vehicul"/> */}
                    {/* <AutoPlate/> */}
                    {/* <SectionSubTitle text="Klass Wagen GMBH" data="1364" name="vehicule"/> */}
                    {/* <FleetStats/> */}
                    {/* <AddSection/> */}
                    {/* <TableTitle text="Portofoliu flote"/> */}
                    {/* <FilterTab/> */}
                    {/* <TableAction icon={edit} name="edit"/>
                    <TableAction icon={del} name="delete"/> */}
                    {/* <Table/> */}
                    {/* <DragDrop/> */}
                    {/* <AddTire/> */}
                </div>
        </div>
    )
}
