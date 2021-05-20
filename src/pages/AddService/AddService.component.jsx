import React from 'react'
import '../Dashboard/Dashboard.component'
import Navigation from '../../components/Navigation/Navigation.component'
import ServiceList from '../../components/ServiceList/ServiceList.component'

export default function AddService(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <ServiceList
          availableServices={props.availableServices}
          addAvailableService={props.addAvailableService}
          selectedServices={props.selectedServices}
        />
      </div>
    </div>
  )
}
