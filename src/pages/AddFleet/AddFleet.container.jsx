import React, { useState } from 'react'
import AddFleet from './AddFleet.component'
import api from '../../utils/Api'

export default function AddFleetContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const [fData, setFData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: '',
    fleet_name: '',
    fleet_gov_id: '',
    fleet_j: '',
    fleet_address: '',
    fleet_region: '',
    fleet_city: '',
    fleet_percent: ''
  })

  const handleFleetCreation = async newFleetData => {
    return api.post('/users/fleet', newFleetData)
  }

  function updateFData(changedField, changedValue){
    const newFData = {...fData}
    newFData[changedField] = changedValue
    setFData(newFData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleFleetCreation(fData)
      if(response.status === 201) setSuccess(response.data)     
      setFData({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        confirm_password: '',
        fleet_name: '',
        fleet_gov_id: '',
        fleet_j: '',
        fleet_address: '',
        fleet_region: '',
        fleet_city: '',
        fleet_percent: ''
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
        setError("Creare flota esuata")
      }
      setLoading(false)

    }
    
  }

  return <AddFleet 
          fData={fData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateFData}
          />
}
