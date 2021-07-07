import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useHistory } from 'react-router-dom'
import ManageriHotel from './ManageriHotel.component'

export default function ManageriHotelContainer() {
  const [loading, setLoading] = useState(true)  
  const [manageriHotel, setManageriHotel] = useState([])
  const [search, setSearch] = useState("")
  const history = useHistory()  
  const [showSpinner, setShowSpinner] = useState(true)
  const [canDelete, setCanDelete] = useState(true)

  const deleteManager = async aId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/users/id/${aId}`)
      if(response){
        refreshManagers()
        setCanDelete(true)
      }
      setLoading(false)
    } catch (error) {
      setCanDelete(true)
      if(error?.response?.data?.status !== 401) {
        setLoading(false) 
      }
    }   
  }

  const loadManagers = async () => {
    try {        
      const response = await api.get(`/users/getAllManagers`)               
      setManageriHotel(response.data)
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setManageriHotel([])
      setShowSpinner(false)
      setLoading(false) 
    }  
  }
  const refreshManagers = useCallback(debounce(loadManagers, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshManagers()
    return () => mounted = false
  },[])

  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }

  const deleteActionHandler = e => {
    let aId = e.target.attributes.data.value
    if(aId && canDelete) {
      deleteManager(aId)
    }
  }
  const editActionHandler = e => {
    let aId = e.target.attributes.data.value
    if(aId) {
      history.push(`/dashboard/managerHotel/${aId}`)
    }
  }

  return (!loading ? 
    <ManageriHotel 
      manageriHotel={manageriHotel}
      search={search}
      handleSearchChange={handleSearchChange}
      showSpinner={showSpinner}
      deleteActionHandler={deleteActionHandler}
      editActionHandler={editActionHandler}
     />
     :
     null
   )
}
