import React, { useState, useEffect, useCallback } from 'react'
import Parteneri from './Parteneri.component'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useHistory } from 'react-router-dom'

export default function ParteneriContainer() {
  const [loading, setLoading] = useState(true)  
  const [partners, setPartners] = useState([])
  const [search, setSearch] = useState("")
  const history = useHistory()
  const [regionFilter, setRegionFilter] = useState("")
  const [regionFilterValues, setRegionFilterValues] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true)
  const [canDelete, setCanDelete] = useState(true)

  const deletePartner = async pId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/partners/id/${pId}`)
      if(response){
        refreshPartners()
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

  const loadPartners = async () => {
    try {        
      const response = await api.get(`/partners/`)         
      setPartners(response.data)
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setPartners([])
      setShowSpinner(false)
      setLoading(false) 
    }  
  }
  const refreshPartners = useCallback(debounce(loadPartners, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshPartners()
    return () => mounted = false
  },[])

  /* load available filters values */
  const loadPartnerFilters = async () => {
    try {        
      const response = await api.get(`/partners/filtersValues`)
      if(response.data) {
        let regionPVals = []
        response.data[0].partnersRegions.forEach(item => {
          regionPVals.push(item.partner_region)  
        })
        setRegionFilterValues(regionPVals)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false) 
    }  
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) {
      const getPartnerFilters = async () => {
        return await loadPartnerFilters()
      }
      getPartnerFilters()
    }
    return () => mounted = false
  },[])
  
  const handleRegionFilterChange = newFilter => {    
    setRegionFilter(newFilter)    
  }

  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }

  const deleteActionHandler = e => {
    let pId = e.target.attributes.data.value
    if(pId && canDelete) {
      deletePartner(pId)
    }
  }
  
  const editActionHandler = e => {
    let pId = e.target.attributes.data.value
    if(pId) {
      history.push(`/dashboard/partener/${pId}`)
    }
  }

  return (!loading ? 
    <Parteneri 
      partners={partners}
      search={search}
      handleSearchChange={handleSearchChange}
      regionFilter={regionFilter}
      handleRegionFilterChange={handleRegionFilterChange}
      regionFilterValues={regionFilterValues}
      showSpinner={showSpinner}
      deleteActionHandler={deleteActionHandler}
      editActionHandler={editActionHandler}
     />
     :
     null
   )
}
