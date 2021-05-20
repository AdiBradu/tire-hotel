import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import FleetEdit from './FleetEdit.component'

export default function FleetEditContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [showSpinner, setShowSpinner] = useState(true)
  const { fId } = useParams()
  const [timePeriodFilter, setTimePeriodFilter] = useState("")  
  const [orders, setOrders] = useState([])
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

  const loadOrders = async () => {
    try {        
      const response = await api.get(`/services/getServiceOrdersByFleetId`, {
        params: {
          fleetId: fId   
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
          newO.order_total = parseFloat(newO.order_total.toFixed(2))
          return newO
        })
        setOrders(formattedOrders)        
      }      
      setLoading(false)
      setShowSpinner(false)
    } catch (error) {
      setOrders([])              
      setLoading(false)      
      setShowSpinner(false)   
    }  
  }
  const refreshOrders = useCallback(debounce(loadOrders, 300), [])


  const handleFleetUpdate = async newFleetData => {
    return api.patch(`/fleets/id/${fId}`, newFleetData)
  }


  const loadFleetInfo = async pId => {
    try {        
      const response = await api.get(`/fleets/getWithUserDataByFleetId/${fId}`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadFleetInfo(fId).then(res => {
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
          fleet_city: res.data.fleet_city,
          fleet_percent: parseFloat(res.data.fleet_percent.toFixed(2)).toString()
        })
        setLoading(false)
      })
      refreshOrders()
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
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Actualizare flota esuata")
      }
      setLoading(false)

    }
    
  }

  const handleTimePeriodFilterChange = newFilter => {    
    setTimePeriodFilter(newFilter)    
  }

  return (!loading && <FleetEdit 
          orders={orders}
          fData={fData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={updateFData}
          timePeriodFilter={timePeriodFilter}
          handleTimePeriodFilterChange={handleTimePeriodFilterChange}      
          showSpinner={showSpinner}
          />)
}