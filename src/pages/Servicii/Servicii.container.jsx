import React, { useState, useEffect, useCallback } from 'react'
import Servicii from './Servicii.component'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useHistory } from 'react-router-dom'

export default function ServiciiContainer() {
  const [loading, setLoading] = useState(true)  
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("")
  const history = useHistory()  
  const [showSpinner, setShowSpinner] = useState(true)

  const loadServices = async () => {
    try {        
      const response = await api.get(`/services/getServicesList`)     
      if(response.data) {  
        let formattedServices = []
        formattedServices = response.data.map( (s, index) => {
          let newS = {...s}          
          newS.service_cost = parseFloat(newS.service_cost.toFixed(2))
          return newS
        })
        setServices(formattedServices)        
      }
      
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setServices([])
      setShowSpinner(false)
      setLoading(false) 
    }  
  }
  const refreshServices = useCallback(debounce(loadServices, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshServices()
    return () => mounted = false
  },[])

  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }

  const editActionHandler = e => {
    let sId = e.target.attributes.data.value
    if(sId) {
      history.push(`/dashboard/serviciu/${sId}`)
    }
  }

  return (!loading ? 
    <Servicii 
      services={services}
      search={search}
      handleSearchChange={handleSearchChange}
      showSpinner={showSpinner}     
      editActionHandler={editActionHandler}
     />
     :
     null
   )
}