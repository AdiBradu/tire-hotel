import React, { useState, useEffect } from 'react'
import MyAccount from './MyAccount.component'
import api from '../../utils/Api'
import { useAuth } from '../../contexts/AuthContext'

export default function MyAccountFleetContainer() {

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
    confirm_password: '',
    fleet_name: '',
    fleet_gov_id: '',
    fleet_j: '',
    fleet_address: '',
    fleet_region: '',
    fleet_city: ''
  })


  const handleFleetUpdate = async newFleetData => {
    return api.patch(`/fleets/selfUpdate`, newFleetData)
  }

  const loadUserInfo = async () => {
    try {        
      const response = await api.get(`/fleets/me`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadUserInfo().then(res => {
        setFData({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone: res.data.phone,
          password: '',
          confirm_password: '',
          fleet_name: res.data.fleet_name,
          fleet_gov_id: res.data.fleet_gov_id,
          fleet_j: res.data.fleet_j,
          fleet_address: res.data.fleet_address,
          fleet_region: res.data.fleet_region,
          fleet_city: res.data.fleet_city
        })
        setLoading(false)
      })
    }
    return () => mounted = false
  },[])

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
      const response  = await handleFleetUpdate(formDataToPost)
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
    showFleetDetails={true}
    />
  )
}