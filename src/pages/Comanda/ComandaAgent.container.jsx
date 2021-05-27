import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom'
import ComandaAgent from './ComandaAgent.component'

export default function ComandaAgentContainer() {
  const [loading, setLoading] = useState(true)  
  const [order, setOrder] = useState([])  
  const [showSpinner, setShowSpinner] = useState(true)
  const { orderId } = useParams()

  const loadOrder = async orderId => {
    try {        
      const response = await api.get(`/services/getOrderDetails`, {
        params: {
          order_id: orderId  
        }
      })         
      if(response.data) {
        let orderInfo = response.data        
        orderInfo.order_details.forEach(o => {
          o.order_detail_cost = parseFloat(o.order_detail_cost.toFixed(2))
          o.order_detail_cost_fleet = parseFloat(o.order_detail_cost_fleet.toFixed(2))
          o.partner_name = orderInfo.partner_name
          o.fleet_name = orderInfo.fleet_name
        }) 
        setOrder(orderInfo)          
      }
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setOrder([])        
      setShowSpinner(false)
      setLoading(false)         
    }  
  }
  const refreshOrder = useCallback(debounce(loadOrder, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshOrder(orderId)
    return () => mounted = false
  },[])
 
  return (!loading ? 
    <ComandaAgent
      orderDisplayData={order}      
      showSpinner={showSpinner}
     />
     :
     null
   )
}