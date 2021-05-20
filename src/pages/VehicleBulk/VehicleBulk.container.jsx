import React, { useState, useEffect } from 'react'
import VehicleBulk from './VehicleBulk.component'
import { useParams } from 'react-router-dom'
import api from "../../utils/Api"
import { validateVehicleBulkImport  } from "../../utils/Validators"

export default function VehicleBulkContainer() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const { fleetId } = useParams()

  const handleVehicleBulkCreation = async newVehiclesData => {
    return api.post('/vehicles/bulk', newVehiclesData)
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
  
  const handleFileUpload = async fileContents => {
    let {err, vehiclesList} = validateVehicleBulkImport(fileContents, tireOpts, fleetId)
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
          <VehicleBulk
            handleFileUpload={handleFileUpload}
            error={error}
            success={success}            
          />
          :
          null
          )
}
