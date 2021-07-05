import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import HotelFlota from './HotelFlota.component'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function HotelFlotaContainer() {
  const [loading, setLoading] = useState(true)    
  const [search, setSearch] = useState("")  
  const [hotelVehiclesList, setHotelVehiclesList] = useState(null) 
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("") 
  const [showSpinner, setShowSpinner] = useState(true) 
  const history = useHistory()
  const { currentUser } = useAuth()  

  const loadFleet = async () => {
    try {        
      const response = await api.get(`/fleets/uid`)     
      return response?.data[0].fi_id
    } catch (error) {
     
    }  
  }
  
  const loadHotelVehicles = async fId => {
    try {        
      const response = await api.get(`/hotelTires/getFleetHotelVehicles`, {
        params: {
          fleet_id: fId
        }
      })
      setHotelVehiclesList(response.data)
      setShowSpinner(false)
      setLoading(false)
      
    } catch (error) {
      setHotelVehiclesList([])
      setShowSpinner(false)
      setLoading(false) 
    }   
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) loadFleet().then(res => {
      loadHotelVehicles(res)
    })
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
    <HotelFlota 
      hotelVehiclesList={hotelVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}    
      editActionHandler={editActionHandler}     
      showSpinner={showSpinner}     
      currentUserType={currentUser.user_type}
     />
     :
     null
   )
   
}