import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import HotelFleet from './HotelFleet.component'
import { useParams, useHistory } from 'react-router-dom'

export default function HotelFleetContainer() {
  const [loading, setLoading] = useState(true)  
  const [fleetData, setFleetData] = useState([])
  const [search, setSearch] = useState("")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("")
  const [fleetVehiclesList, setFleetVehiclesList] = useState(null)
  const history = useHistory()
  const { fleetId } = useParams()  
  const [showSpinner, setShowSpinner] = useState(true)

  const loadFleet = async () => {
    try {        
      const response = await api.get(`/fleets/id/${fleetId}`)
      setFleetData(response?.data[0])
      setLoading(false)
    } catch (error) {
      setFleetData([])
      if(error?.response?.data?.status !== 401) {
        setLoading(false) 
      }
    }  
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) loadFleet()
    return () => mounted = false
  },[])

  
  const loadFleetVehicles = async () => {
    try {        
      const response = await api.get(`/fleets/getFleetVehicles`, {
        params: {
          fleet_id: fleetId
        }
      })
      setFleetVehiclesList(response.data)
      setShowSpinner(false)
      setLoading(false)
      
    } catch (error) {
      setFleetVehiclesList([])
      setShowSpinner(false)
      setLoading(false) 
    }   
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) loadFleetVehicles()
    return () => mounted = false
  },[])
  
  const handleVehicleTypeFilterChange = newFilter => {    
    setVehicleTypeFilter(newFilter)    
  }
  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }
  
  const editActionHandler = e => {
    let vId = e.target.attributes.data.value
    if(vId) {
      history.push(`/dashboard/flote/editeaza/vehicul/${vId}`)
    }
  }
  
  return (!loading ? 
    <HotelFleet 
      fleetData={fleetData}
      fleetVehiclesList={fleetVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}     
      editActionHandler={editActionHandler}      
      showSpinner={showSpinner}
     />
     :
     null
   )
   
}