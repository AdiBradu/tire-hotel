import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'
import Serviciu from './Serviciu.component'

export default function ServiciuContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const { sId } = useParams()

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

  const handleServiceUpdate = async newServiceData => {
    return api.patch(`/services/id/${sId}`, newServiceData)
  }


  const loadServiceInfo = async sId => {
    try {        
      const response = await api.get(`/services/id/${sId}`)
      return response;
    } catch (error) {
      return error;
    }   
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
      loadServiceInfo(sId).then(res => {
        setSData({        
          service_name: res.data.service_name,
          service_vehicle_type: res.data.service_vehicle_type,
          service_cost: parseFloat(res.data.service_cost).toFixed(2),
          hotel_service: parseInt(res.data.hotel_service),
          cost_type: parseInt(res.data.cost_type),
          min_diameter: parseInt(res.data.min_diameter),
          max_diameter: parseInt(res.data.max_diameter)
        })
        setLoading(false)
      })
    }
    return () => mounted = false
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleServiceUpdate(sData)
      if(response.status === 200) setSuccess(response?.data)         
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Actualizare serviciu esuata")
      }
      setLoading(false)
    }
    
  }

  return <Serviciu
          sData={sData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateSData}
          tireOpts={tireOpts}
          />
}