import React, { useState, useEffect, useCallback } from 'react'
import Agenti from './Agenti.component'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useHistory } from 'react-router-dom'

export default function AgentiContainer() {
  const [loading, setLoading] = useState(true)  
  const [agents, setAgents] = useState([])
  const [search, setSearch] = useState("")
  const history = useHistory()  
  const [showSpinner, setShowSpinner] = useState(true)
  const [canDelete, setCanDelete] = useState(true)

  const deleteAgent = async aId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/users/id/${aId}`)
      if(response){
        refreshAgents()
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

  const loadAgents = async () => {
    try {        
      const response = await api.get(`/users/getAllAgents`)               
      setAgents(response.data)
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setAgents([])
      setShowSpinner(false)
      setLoading(false) 
    }  
  }
  const refreshAgents = useCallback(debounce(loadAgents, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshAgents()
    return () => mounted = false
  },[])

  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }

  const deleteActionHandler = e => {
    let aId = e.target.attributes.data.value
    if(aId && canDelete) {
      deleteAgent(aId)
    }
  }
  const editActionHandler = e => {
    let aId = e.target.attributes.data.value
    if(aId) {
      history.push(`/dashboard/agent/${aId}`)
    }
  }

  return (!loading ? 
    <Agenti 
      agents={agents}
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
