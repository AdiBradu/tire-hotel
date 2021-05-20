import React, { useState } from 'react'
import MyAccount from './MyAccount.component'
import api from '../../utils/Api'
import { useAuth } from '../../contexts/AuthContext'

export default function MyAccountContainer() {

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser, setLoggedUser } = useAuth()  
  const [fData, setFData] = useState({
    email: currentUser.email,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    phone: currentUser.phone,
    password: '',
    confirm_password: ''
  })

  function updateFData(changedField, changedValue){
      const newFData = {...fData}
      newFData[changedField] = changedValue
      setFData(newFData)
  }  

  function prepareFormData(){
    if(fData.password === '') {
      const {password, confirm_password, ...parsedDataToPost} = fData 
      return parsedDataToPost
    } else { 
      return fData
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formDataToPost = prepareFormData()

    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await api.patch('/users/self_update', formDataToPost)
      if(response.status === 200) setSuccess(response?.data?.message)
      setLoggedUser(response?.data?.usr)
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Actualizare date esuata")
      }
      setLoading(false)

    }
    
  }

  
  return (
    <MyAccount 
    error={error}
    success={success}
    loading={loading}
    fData={fData}
    handleSubmit={handleSubmit}
    updateFData={updateFData}
    showPartnerDetails={false}
    showFleetDetails={false} 
    />
  )
}
