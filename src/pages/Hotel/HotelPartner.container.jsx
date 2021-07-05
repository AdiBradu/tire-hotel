import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import HotelPartner from './HotelPartner.component'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function HotelPartnerContainer() {
  const [loading, setLoading] = useState(true)    
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [hotelVehiclesList, setHotelVehiclesList] = useState(null) 
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("") 
  const [reqRegNumber, setReqRegNumber] = useState("")
  const [showSpinner, setShowSpinner] = useState(true)   
  const { currentUser } = useAuth()  
  const history = useHistory()

  const handleRequestCreation = async reqRegN => {
    return api.post('/hotelRequests/', reqRegN)
  }
  
  const loadHotelVehicles = async () => {
    try {        
      const response = await api.get(`/hotelTires/getPartnerHotelVehicles`)
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
  const handleRequestChange = (fname, newReq) => {   
    let newReqVal = newReq.toUpperCase().replace(/[^0-9A-Z]+/gi, "")  
    setReqRegNumber(newReqVal)
  }
  async function handleSubmit(e) {
    e.preventDefault()    
    if(reqRegNumber === "") {
      setError("Nr. Inmatriculare este obligatoriu")
      setLoading(false)
      return false
    }
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleRequestCreation({reg_number: reqRegNumber})    
      if(response.status === 201) {
        history.push(`/dashboard/cereri/`)  
      }
    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Creare cerere esuata")
      }
      setLoading(false)
    } 
  }
  return (!loading ? 
    <HotelPartner 
      error={error}
      success={success}
      hotelVehiclesList={hotelVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}         
      showSpinner={showSpinner}     
      currentUserType={currentUser.user_type}
      reqRegNumber={reqRegNumber}
      handleRequestChange={handleRequestChange}
      loading={loading}
      handleSubmit={handleSubmit}
     />
     :
     null
   )
   
}