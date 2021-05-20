import React, { useState, useEffect, useCallback } from 'react'
import Partener from './Partener.component'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'

export default function PartnerContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { pId } = useParams()
  const [timePeriodFilter, setTimePeriodFilter] = useState("")  
  const [orders, setOrders] = useState([])
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
    partner_city: ''
  })



  const loadOrders = async () => {
    try {        
      const response = await api.get(`/services/getServiceOrdersByPartnerId`, {
        params: {
          partnerId: pId   
        }
      })         
      if(response.data) {
        let formattedOrders = []
        formattedOrders = response.data.map( (o, index) => {
          let t = new Date(o.created);
          let d = t.getDate();        
          let m = t.getMonth()+1; 
          let y = t.getFullYear();
          let formattedDate = d+'/'+m+'/'+y
          let {so_id, ...restOfO} = {...o}
          
          let newO = {so_id,formattedDate,...restOfO}
          return newO
        })
        setOrders(formattedOrders)        
      }      
      setLoading(false)
    } catch (error) {
      setOrders([])              
      setLoading(false)         
    }  
  }
  const refreshOrders = useCallback(debounce(loadOrders, 300), [])


  const handlePartnerUpdate = async newPartnerData => {
    return api.patch(`/partners/id/${pId}`, newPartnerData)
  }


  const loadPartnerInfo = async pId => {
    try {        
      const response = await api.get(`/partners/id/${pId}`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadPartnerInfo(pId).then(res => {
        setPData({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone: res.data.phone,
          password: '',
          confirm_password: '',
          partner_name: res.data.partner_name,
          partner_gov_id: res.data.partner_gov_id,
          partner_j: res.data.partner_j,
          partner_address: res.data.partner_address,
          partner_region: res.data.partner_region,
          partner_city: res.data.partner_city
        })
        
        setLoading(false)
      })
      refreshOrders()
    }
    return () => mounted = false
  },[])

  function updatePData(changedField, changedValue){
    const newPData = {...pData}
    newPData[changedField] = changedValue
    setPData(newPData)
  }

  function prepareFormData(){
    if(pData.password === '') {
      const {password, confirm_password, ...parsedDataToPost} = pData 
      return parsedDataToPost
    } else { 
      return pData
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formDataToPost = prepareFormData()
    try {
      
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handlePartnerUpdate(formDataToPost)
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
        setError("Creare partener esuata")
      }
      setLoading(false)

    }
    
  }

  const handleTimePeriodFilterChange = newFilter => {    
    setTimePeriodFilter(newFilter)    
  }

  return <Partener 
          orders={orders}
          pData={pData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updatePData}
          timePeriodFilter={timePeriodFilter}
          handleTimePeriodFilterChange={handleTimePeriodFilterChange}      
          />
}