import React from 'react'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import SectionSubTitle from '../../components/SectionSubTitle/SectionSubTitle.component'
import FleetStats from '../../components/FleetStats/FleetStats.component'
import AddSection from '../../components/AddSection/AddSection.component'
import Table from '../../components/Table/Table.component'
import TableTitle from '../../components/TableTitle/TableTitle.component'
import FilterTab from '../../components/FilterTab/FilterTab.component'
import Navigation from '../../components/Navigation/Navigation.component'

export default function Comenzi() {
    return (
        <div className="dashboard">
                <Navigation/>
                <div className="workspace">
                    <SectionTitle text="Comenzi"/>
                    <TableTitle text="Portofoliu comenzi" elementsOnPageCount={false} dataSet={[]} />
                    {/* <FilterTab/>
                    <Table/> */}
                </div>
        </div>
    )
}
