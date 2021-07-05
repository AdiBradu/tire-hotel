import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import Cereri from './Cereri.component'

export default function CereriContainer() {
  const [loading, setLoading] = useState(true)     
  const [search, setSearch] = useState("")
  const [reqList, setReqList] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true)   
  const [reqTypeFilter, setReqTypeFilter] = useState(null)
  const [reqStatusFilter, setReqStatusFilter] = useState(null)
  
  const loadReqList = async () => {
    try {        
      const response = await api.get(`/hotelRequests/`)
     
      setReqList(response.data)
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setReqList([])
      setShowSpinner(false)
      setLoading(false) 
    }   
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) loadReqList()
    return () => mounted = false
  },[])
  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }
  const handleReqTypeFilterChange = newFilter => {    
    setReqTypeFilter(newFilter)    
  }
  const handleReqStatusFilterChange = newFilter => {
    setReqStatusFilter(newFilter)      
  }
  return (!loading ? 
    <Cereri     
      reqList={reqList}
      search={search}
      handleSearchChange={handleSearchChange}     
      reqTypeFilter={reqTypeFilter}
      handleReqTypeFilterChange={handleReqTypeFilterChange} 
      reqStatusFilter={reqStatusFilter}
      handleReqStatusFilterChange={handleReqStatusFilterChange}
      showSpinner={showSpinner}          
      loading={loading}     
     />
     :
     null
   )
   
}