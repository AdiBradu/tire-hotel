import React, { useState } from 'react'
import AddPartner from './AddPartner.component'
import api from '../../utils/Api'

export default function AddPartnerContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const [pData, setPData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: '',
    partner_name: '',
    partner_gov_id: '',
    partner_j: '',
    partner_address: '',
    partner_region: '',
    partner_city: '',
    partner_percent: ''
  })

  const handlePartnerCreation = async newPartnerData => {
    return api.post('/users/partner', newPartnerData)
  }

  function updatePData(changedField, changedValue){
    const newPData = {...pData}
    newPData[changedField] = changedValue
    setPData(newPData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handlePartnerCreation(pData)
      if(response.status === 201) setSuccess(response.data)     
      setPData({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        confirm_password: '',
        partner_name: '',
        partner_gov_id: '',
        partner_j: '',
        partner_address: '',
        partner_region: '',
        partner_city: '',
        partner_percent: ''
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
        setError("Creare partener esuata")
      }
      setLoading(false)

    }
    
  }

  return <AddPartner 
          pData={pData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updatePData}
          />
}