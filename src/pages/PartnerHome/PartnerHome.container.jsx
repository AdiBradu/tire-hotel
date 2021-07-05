import React, { useState } from 'react'
import PartnerHome from './PartnerHome.component'
import api from '../../utils/Api'
import { useHistory } from 'react-router-dom'

export default function PartnerHomeContainer() {
  const [vehicle, setVehicle] = useState(null)
  const [searchCompleted, setSearchCompleted] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [search, setSearch] = useState("")
  const history = useHistory()

  const loadVehicleData = async searchString => {
    setSearchLoading(true)
    try {        
      const response = await api.get(`/vehicles/getVehicleByRegNumber`, {
        params: {
          searchString: searchString
        }
      })      
      setVehicle(response.data)
      sessionStorage.setItem('vehicle', JSON.stringify(response.data))
      sessionStorage.removeItem('availableServices')
      sessionStorage.removeItem('services')
      sessionStorage.removeItem('vehicleTires')
      sessionStorage.removeItem('oldVehicleTires')
      sessionStorage.removeItem('vTiresData')
      sessionStorage.removeItem('updatedMilage')
      sessionStorage.removeItem('additionalServices')      
      setSearchCompleted(true)
    } catch (error) {
      sessionStorage.removeItem('vehicle')
      sessionStorage.removeItem('availableServices')
      sessionStorage.removeItem('services')
      sessionStorage.removeItem('vehicleTires')
      sessionStorage.removeItem('oldVehicleTires')
      sessionStorage.removeItem('vTiresData')
      sessionStorage.removeItem('updatedMilage')
      sessionStorage.removeItem('additionalServices')
      setVehicle(null)
      setSearchCompleted(true)
    }  
  }

  const resetSearchHandler = () => {    
    setSearchCompleted(false)  
  }

  const searchHandler = searchedString => {    
    if(searchedString && searchedString.length > 5 && !searchLoading) { 
      setSearch(searchedString)
      loadVehicleData(searchedString).then(() => {
        setSearchLoading(false)  
      })
    }
  }

  const startServiceHandler = () => {
    if(vehicle) {
      history.push(`/dashboard/adauga/serviciu`)
    } else {
      setVehicle(null)
      setSearchCompleted(true)
      setSearchLoading(false)    
    }
  }

  return (!searchLoading && 
   <PartnerHome
    search={search}
    vehicle={vehicle}
    searchCompleted={searchCompleted}
    searchHandler={searchHandler}
    resetSearchHandler={resetSearchHandler}
    startServiceHandler={startServiceHandler}
   />   
  )
}
