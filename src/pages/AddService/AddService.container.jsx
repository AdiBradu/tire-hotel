import React, { useState, useEffect } from 'react'
import AddService from './AddService.component'
import api from '../../utils/Api'
import { useHistory } from 'react-router-dom'

export default function AddServiceContainer() {
  const [loading, setLoading] = useState(true)
  const [availableServices, setAvailableServices] = useState(JSON.parse(sessionStorage.getItem('availableServices')) || null)
  const vData = JSON.parse(sessionStorage.getItem('vehicle'))
  const selectedServices = (JSON.parse(sessionStorage.getItem('services')) || [])
  const history = useHistory()
  
  const loadAvailableServices = async (vehicleId, vType) => {
    
    try {        
      const response = await api.get(`/services/getAvailableServices`, {
        params: {
          v_id: vehicleId,
          vehicle_type: vType
        }
      })      
      setAvailableServices(response.data)
      sessionStorage.setItem('availableServices', JSON.stringify(response.data))
    } catch (error) {
      sessionStorage.removeItem('availableServices')
      setAvailableServices(null)
    }  
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) {
      if(!vData) {
        history.push('/')
      } else {        
        if(!availableServices) {
          const getAvailableServices = async () => {
            return await loadAvailableServices(vData.v_id, vData.vehicle_type)
          }
          getAvailableServices()
        }
      }
      setLoading(false)
    }
    return () => mounted = false
  },[])

  const addAvailableService = e => {
    let sId = e.target.attributes.data_s_id.value
    let sName = e.target.attributes.data_s_name.value
    if(sId) {
      selectedServices.push({s_id: sId, service_name: sName})   
      sessionStorage.setItem('services', JSON.stringify(selectedServices))
      history.push('/dashboard/fisa_auto')
    }
  }

  return ( !loading &&    
   <AddService 
    selectedServices={selectedServices}
    availableServices={availableServices}
    addAvailableService={addAvailableService}
   />
  )
}
