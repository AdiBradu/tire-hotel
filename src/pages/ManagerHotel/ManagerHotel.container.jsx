import React, { useState, useEffect } from 'react'
import ManagerHotel from './ManagerHotel.component'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'

export default function ManagerHotelContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { mId } = useParams()

  const [mData, setMData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: ''
  })

  const handleManagerUpdate = async newManagerData => {
    return api.patch(`/users/id/${mId}`, newManagerData)
  }


  const loadManagerInfo = async mId => {
    try {        
      const response = await api.get(`/users/id/${mId}`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadManagerInfo(mId).then(res => {
        setMData({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone: res.data.phone,
          password: '',
          confirm_password: ''
        })
        setLoading(false)
      })
    }
    return () => mounted = false
  },[])

  function updateMData(changedField, changedValue){
    const newMData = {...mData}
    newMData[changedField] = changedValue
    setMData(newMData)
  }

  function prepareFormData(){
    if(mData.password === '') {
      const {password, confirm_password, ...parsedDataToPost} = mData 
      return parsedDataToPost
    } else { 
      return mData
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formDataToPost = prepareFormData()
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleManagerUpdate(formDataToPost)
      if(response.status === 200) setSuccess(response?.data?.message)         
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Actualizare manager esuata")
      }
      setLoading(false)

    }
    
  }

  return <ManagerHotel 
          mData={mData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateMData}
          />
}