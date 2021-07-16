import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import AddServiciu from './AddServiciu.component'

export default function AddServiciuContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)

  const [sData, setSData] = useState({
    service_name: '',
    service_vehicle_type: 'TURISM',
    service_cost: '',
    hotel_service: 0,
    cost_type: 0,
    min_diameter: 1,
    max_diameter: 1
  })

  /* Load available tire options */
  const loadTireOptions = async () => {
    try {        
      const response = await api.get(`/vehicles/getVehicleTireAttributes`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  const handleServiceCreation = async newServiceData => {
    return api.post('/services/createService', newServiceData)
  }

  function updateSData(changedField, changedValue){
    const newSData = {...sData}
    if(changedField === 'service_cost' && parseInt(changedValue) < 0) {
      newSData[changedField] = 0
    } else {
      newSData[changedField] = changedValue
    }
    setSData(newSData)
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {      
      loadTireOptions().then( res => {
        setTireOpts(res.data)         
      })
      setLoading(false)
    }
    return () => mounted = false
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleServiceCreation(sData)
      if(response.status === 201) setSuccess(response.data)     
      setSData({
        service_name: '',
        service_vehicle_type: 'TURISM',
        service_cost: '',
        hotel_service: 0,
        cost_type: 0,
        min_diameter: 1,
        max_diameter: 1
      })
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Creare serviciu esuata")
      }
      setLoading(false)
    }
    
  }

  return <AddServiciu
          sData={sData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateSData}
          tireOpts={tireOpts}
          />
}