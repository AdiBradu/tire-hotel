import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import Flota from './Flota.component'
import { useHistory } from 'react-router-dom'

export default function FlotaContainer() {
  const [loading, setLoading] = useState(true)  
  const [fleetData, setFleetData] = useState([])
  const [search, setSearch] = useState("")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("")
  const [fleetVehiclesList, setFleetVehiclesList] = useState(null)
  const history = useHistory()
  const [fleetId, setFleetId] = useState(null)
  const [canDelete, setCanDelete] = useState(true)
  const [showSpinner, setShowSpinner] = useState(true)

  const deleteVehicle = async vId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/vehicles/id/${vId}`)
      if(response){
        loadFleet()
        loadFleetVehicles(fleetId)
        setCanDelete(true)
      }
      setLoading(false)
    } catch (error) {
      setCanDelete(true)
      if(error?.response?.data?.status !== 401) {
        setLoading(false) 
      }
    }   
  }
 

  const loadFleet = async () => {
    try {        
      const response = await api.get(`/fleets/uid`)
      setFleetId(response?.data[0].fi_id)
      setFleetData(response?.data[0])
      return response?.data[0].fi_id
    } catch (error) {
      setFleetData([])
    }  
  }
  
  const loadFleetVehicles = async fId => {
    try {        
      const response = await api.get(`/fleets/getFleetVehicles`, {
        params: {
          fleet_id: fId
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
    if(mounted) loadFleet().then(res => {
      loadFleetVehicles(res)
    })
    return () => mounted = false
  },[])  
  
  const handleVehicleTypeFilterChange = newFilter => {    
    setVehicleTypeFilter(newFilter)    
  }
  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }
  const deleteActionHandler = e => {
    let vId = e.target.attributes.data.value
    if(vId && canDelete) {
      deleteVehicle(vId)
    }
  }
  const editActionHandler = e => {
    let vId = e.target.attributes.data.value
    if(vId) {
      history.push(`/dashboard/flote/editeaza/vehicul/${vId}`)
    }
  }
  
  return (!loading ? 
    <Flota 
      fleetData={fleetData}
      fleetVehiclesList={fleetVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}
      deleteActionHandler={deleteActionHandler}
      editActionHandler={editActionHandler}      
      showSpinner={showSpinner}
     />
     :
     null
   )
   
}