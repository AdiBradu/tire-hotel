import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceList.component.scss'

export default function ServiceList(props) {
  return (
    <div className="service-list">
      {props.availableServices ? props.availableServices.map((e,i) =>
        <p key={i} data_s_id={e.sl_id} data_s_name={e.service_name} onClick={props.addAvailableService}>{e.service_name}</p>
      ) : null}
      {props.selectedServices.length > 0 ? 
      <>
      <Link to="/dashboard/update/anvelope">
        <p>update anvelope</p>
      </Link>
      <Link to="/dashboard/update/km">
        <p>update km</p>
      </Link>
      </>
      :
      null
      }
      <Link to="/dashboard/adauga/alte_servicii">
        <p>alte servicii</p>
      </Link>
    </div>
  )
}
