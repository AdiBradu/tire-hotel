import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import HotelAdmin from './HotelAdmin.component'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function HotelAdminContainer() {
  const [loading, setLoading] = useState(true)    
  const [search, setSearch] = useState("")
  const [hotelVehiclesList, setHotelVehiclesList] = useState(null) 
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("") 
  const [showSpinner, setShowSpinner] = useState(true) 
  const history = useHistory()
  const { currentUser } = useAuth()  

  
  const loadHotelVehicles = async () => {
    try {        
      const response = await api.get(`/hotelTires/getAllHotelVehicles`)
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
    if(mounted) loadHotelVehicles()
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
    <HotelAdmin 
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