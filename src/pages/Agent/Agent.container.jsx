import React, { useState, useEffect } from 'react'
import Agent from './Agent.component'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'

export default function AgentContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { aId } = useParams()

  const [aData, setAData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: ''
  })

  const handleAgentUpdate = async newAgentData => {
    return api.patch(`/users/id/${aId}`, newAgentData)
  }


  const loadAgentInfo = async pId => {
    try {        
      const response = await api.get(`/users/id/${aId}`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadAgentInfo(aId).then(res => {
        setAData({
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

  function updateAData(changedField, changedValue){
    const newAData = {...aData}
    newAData[changedField] = changedValue
    setAData(newAData)
  }

  function prepareFormData(){
    if(aData.password === '') {
      const {password, confirm_password, ...parsedDataToPost} = aData 
      return parsedDataToPost
    } else { 
      return aData
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formDataToPost = prepareFormData()
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleAgentUpdate(formDataToPost)
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
        setError("Actualizare agent esuata")
      }
      setLoading(false)

    }
    
  }

  return <Agent 
          aData={aData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateAData}
          />
}