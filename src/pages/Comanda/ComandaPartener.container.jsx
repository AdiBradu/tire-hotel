import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom'
import Comanda from './Comanda.component'

export default function ComandaPartnerContainer() {
  const [loading, setLoading] = useState(true)  
  const [order, setOrder] = useState([])  
  const [showSpinner, setShowSpinner] = useState(true)
  const { orderId } = useParams()

  const loadOrder = async orderId => {
    try {        
      const response = await api.get(`/services/getPartnerOrderDetails`, {
        params: {
          order_id: orderId  
        }
      })         
      if(response.data) {
        let orderInfo = response.data
        orderInfo.order_details.forEach(o => {
          o.order_detail_cost = parseFloat(o.order_detail_cost.toFixed(2))
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
    <Comanda
      orderDisplayData={order}      
      showSpinner={showSpinner}
     />
     :
     null
   )
}