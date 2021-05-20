import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Anvelope from './Anvelope.component'

export default function AnvelopeContainer() {
  const [loading, setLoading] = useState(true)  
  const [fleets, setFleets] = useState([])
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState("")
  const [healthScoreFilter, setHealthScoreFilter] = useState("")
  const [healthScoreFilterValues, setHealthScoreFilterValues] = useState([])
  const [regionFilterValues, setRegionFilterValues] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true)
  const [totalTires, setTotalTires] = useState(null)
  const loadFleets = async () => {
    try {        
      const response = await api.get(`/fleets/`)         
      let fleetsDisplayData = null
      let healthScoreFVals=[]
      let totalT = 0
      if(response.data) {
        fleetsDisplayData = response.data.map( (f, index) => {
          let tireHealthScore = f.tiresCount !== 0 ? Math.ceil((f.excessiveUsageTires * 1 + f.mediumUsageTires * 2 + f.noUsageTires * 3) / (f.tiresCount * 3)*100) : 0
          let newF = {...f, tireHealthScore}
          if(healthScoreFVals.indexOf(tireHealthScore) === -1) {
            healthScoreFVals.push(tireHealthScore)
          }
          totalT = totalT + f.tiresCount
          return newF
        })
        setFleets(fleetsDisplayData)
        setHealthScoreFilterValues(healthScoreFVals)
        setTotalTires(totalT)
      }
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
        setFleets([])
        setHealthScoreFilterValues([])
        setShowSpinner(false)
        setLoading(false) 
        
    }  
  }
  const refreshFleets = useCallback(debounce(loadFleets, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshFleets()
    return () => mounted = false
  },[])

  /* load available filters values */
  const loadFleetFilters = async () => {
    try {        
      const response = await api.get(`/fleets/filtersValues`)
      if(response.data) {
        let regionFVals = []
        response.data[0].fleetsRegions.forEach(item => {
          regionFVals.push(item.fleet_region)  
        })
        setRegionFilterValues(regionFVals)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false) 
    }  
  }
  useEffect(() => {
    let mounted  = true
    if(mounted) {
      const getFleetFilters = async () => {
        return await loadFleetFilters()
      }
      getFleetFilters()
    }
    return () => mounted = false
  },[])
  
  const handleRegionFilterChange = newFilter => {    
    setRegionFilter(newFilter)    
  }
  const handleHealthScoreFilterChange = newFilter => {    
    setHealthScoreFilter(newFilter)    
  }
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
  }
  
  return (!loading ? 
    <Anvelope 
      fleets={fleets}
      search={search}
      handleSearchChange={handleSearchChange}
      regionFilter={regionFilter}
      handleRegionFilterChange={handleRegionFilterChange}
      regionFilterValues={regionFilterValues}
      healthScoreFilter={healthScoreFilter}
      handleHealthScoreFilterChange={handleHealthScoreFilterChange}
      healthScoreFilterValues={healthScoreFilterValues}
      totalTires={totalTires}
      showSpinner={showSpinner}
     />
     :
     null
   )
   
}