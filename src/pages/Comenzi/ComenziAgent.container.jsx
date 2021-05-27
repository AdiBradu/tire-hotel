import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Comenzi from './Comenzi.component'

export default function ComenziAgentContainer() {
  const [loading, setLoading] = useState(true)  
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [timePeriodFilter, setTimePeriodFilter] = useState("")  
  const [showSpinner, setShowSpinner] = useState(true)
  
  const loadOrders = async () => {
    try {        
      const response = await api.get(`/services/getServiceOrders`)         
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
          newO.order_total_fleet = parseFloat(newO.order_total_fleet.toFixed(2))
          return newO
        })
        setOrders(formattedOrders)        
      }
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setOrders([])        
      setShowSpinner(false)
      setLoading(false)         
    }  
  }
  const refreshOrders = useCallback(debounce(loadOrders, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshOrders()
    return () => mounted = false
  },[])

 
  const handleTimePeriodFilterChange = newFilter => {    
    setTimePeriodFilter(newFilter)    
  }
 
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }
  
  return (!loading ? 
    <Comenzi 
      orders={orders}
      search={search}
      handleSearchChange={handleSearchChange}
      timePeriodFilter={timePeriodFilter}
      handleTimePeriodFilterChange={handleTimePeriodFilterChange}      
      showSpinner={showSpinner}
     />
     :
     null
   )
   
}