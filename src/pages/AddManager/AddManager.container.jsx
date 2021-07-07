import React, { useState } from 'react'
import api from '../../utils/Api'
import AddManager from './AddManager.component'

export default function AddManagerContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const [mData, setMData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: ''
  })

  const handleManagerCreation = async newManagerData => {
    return api.post('/users/manager', newManagerData)
  }

  function updateMData(changedField, changedValue){
    const newMData = {...mData}
    newMData[changedField] = changedValue
    setMData(newMData)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleManagerCreation(mData)
      if(response.status === 201) setSuccess(response.data)     
      setMData({
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
        setError("Creare manager hotel esuata")
      }
      setLoading(false)
    }
    
  }

  return <AddManager
          mData={mData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateMData}
          />
}