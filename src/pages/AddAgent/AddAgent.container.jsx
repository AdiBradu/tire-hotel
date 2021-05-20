import React, { useState } from 'react'
import api from '../../utils/Api'
import AddAgent from './AddAgent.component'

export default function AddAgentContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const [aData, setAData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: ''
  })

  const handleAgentCreation = async newAgentData => {
    return api.post('/users/agent', newAgentData)
  }

  function updatePData(changedField, changedValue){
    const newPData = {...aData}
    newPData[changedField] = changedValue
    setAData(newPData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleAgentCreation(aData)
      if(response.status === 201) setSuccess(response.data)     
      setAData({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        confirm_password: ''
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
        setError("Creare agent esuata")
      }
      setLoading(false)
    }
    
  }

  return <AddAgent
          aData={aData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updatePData}
          />
}