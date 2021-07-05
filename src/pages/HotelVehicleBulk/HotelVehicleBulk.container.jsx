import React, { useState, useEffect } from 'react'
import HotelVehicleBulk from './HotelVehicleBulk.component'
import { useParams } from 'react-router-dom'
import api from "../../utils/Api"
import { validateHotelVehicleBulkImport  } from "../../utils/Validators"

export default function HotelVehicleBulkContainer() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const [hotelsList, setHotelsList] = useState(null)
  const { fleetId } = useParams()

  const handleVehicleBulkCreation = async newVehiclesData => {
    return api.post('/hotelTires/bulk', newVehiclesData)
  }

  /* Load available tire options */
  const loadTireOptions = async () => {
    try {        
      const response = await api.get(`/vehicles/getVehicleTireAttributes`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  /* Load available tire hotels list */
  const loadHotelsList = async () => {
    try {        
      const response = await api.get(`/hotelTires/getHotelsList`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadHotelsList().then( res => {
        setHotelsList(res.data)          
      })
      loadTireOptions().then( res => {
        setTireOpts(res.data)   
      
      })
      setLoading(false)
    }
    return () => mounted = false
  },[])
  
  const handleFileUpload = async fileContents => {
    let {err, vehiclesList} = validateHotelVehicleBulkImport(fileContents, tireOpts, hotelsList, fleetId)
    if(!err && vehiclesList.length > 0) {
     
      try {
        const response  = await handleVehicleBulkCreation({vehiclesList})    
        if(response.status === 201) setLoading(false)
      } catch(error) {
        if(error?.response?.data?.status < 500) {
          if(error?.response?.data?.status === 400) {
            err = error?.response?.data?.errors[0].msg
          } else {
            err = error?.response?.data?.message
          }
        } else {
            err = "Creare vehicule bulk esuata"
        }
        setLoading(false)
      }
    }
    return (err ? {error: err} : {success: 'Date importate'})
  }

  return (!loading ? 
          <HotelVehicleBulk
            handleFileUpload={handleFileUpload}
            error={error}
            success={success}            
          />
          :
          null
          )
}