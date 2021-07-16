import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import { useHistory, useParams } from 'react-router-dom'
import Cerere from './Cerere.component'

export default function CerereContainer() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [rData, setRData] = useState(null)  
  const [selectedHotel, setSelectedHotel] = useState("0_1")
  const [hotelsList, setHotelsList] = useState(null)
  const { rId } = useParams()
  const history = useHistory()

  const handleRequestUpdate = async (rId, updData) => {
    return api.patch(`/hotelRequests/id/${rId}`, updData)
  }
  const loadReqInfo = async rId => {
    try {        
      const response = await api.get(`/hotelRequests/getRequestInfo`,{
        params: {
          rId
        }
      })
      return response;
    } catch (error) {
      return error;
    }   
  }
  /* Load available tire hotels list */
  const loadHotelsList = async () => {
    try {        
      const response = await api.get(`/hotelTires/getInternalHotelsList`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) {                
      loadHotelsList().then( res => {
        setHotelsList(res.data)          
      })
      loadReqInfo(rId).then(res => {
        setRData(res.data)
        setLoading(false)
      })
    }
    return () => mounted = false
  },[]) 

  
  const onHotelChange = (changedField, changedValue) => {    
    setSelectedHotel(changedValue)    
  }
  async function handleSubmit(e) {
    e.preventDefault()    
    try {
      setError("")      
      setLoading(true)
      const response  = await handleRequestUpdate(rId, {selected_hotel: selectedHotel, req_type: rData.request_type, req_status: rData.request_status})    
      if(response.status === 200) {
          history.push(`/dashboard/cereri`)  
      }
    } catch(error) {      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Actualizare cerere esuata")
      }
      setLoading(false)
    }   

  }
  
  return (!loading &&    
   <Cerere    
    rData={rData}
    loading={loading}
    onHotelChange={onHotelChange}
    hotelsList={hotelsList}
    selectedHotel={selectedHotel}
    btnClick={handleSubmit}
    error={error}
   />
  )
}