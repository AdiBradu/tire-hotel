import React from 'react'
import '../Dashboard/Dashboard.component'
import Navigation from '../../components/Navigation/Navigation.component'
import SearchAuto from '../../components/SearchAuto/SearchAuto.component'
import ReturnSearchAuto from '../../components/ReturnSearchAuto/ReturnSearchAuto.component'

export default function PartnerHome(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        {
          !props.searchCompleted
          ?
          <SearchAuto searchHandler={props.searchHandler} />
          :
          (
            !props.vehicle 
            ?
            <ReturnSearchAuto text={`${props.search.toUpperCase()} nu a fost gasit`} bgcolor={"#FF9E00"} color={"#1D3557"} onClick={props.resetSearchHandler} action={"Cauta din nou"} />
            :  
            <ReturnSearchAuto text={`${props.search.toUpperCase()} a fost gasit.`} bgcolor={"#06D6A0"} color={"#1D3557"} onClick={props.startServiceHandler} action={"START SERVICE"} /> 
          )
        }
      </div>
    </div>
  )
}
