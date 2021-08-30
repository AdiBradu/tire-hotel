import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Anvelope from './Anvelope.component'
import fileSaver from 'file-saver'

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
  const [totalFleets, setTotalFleets] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const getExportData = () => {
    if(!showSpinner){
      setShowSpinner(true)
      api.get(`/fleets/fleetsToExcel`, {
        responseType: 'arraybuffer',
        params: {
          totalFleets: totalFleets,
          searchString: search,
          region: regionFilter,
          healthScore: healthScoreFilter   
        }
      }).then(res => {
        setShowSpinner(false)  
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileSaver.saveAs(blob, 'Export portofoliu anvelope.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }

  const loadFleets = async (pageNo, itemLimit, searchStr, region, healthScore) => {
    setShowSpinner(true)    
    try {        
      const response = await api.get(`/fleets/`, {
        params: {
          page: pageNo,
          limit: itemLimit,
          searchString: searchStr,
          region: region,
          healthScore: healthScore   
        }
      })         
      let fleetsDisplayData = null
      let healthScoreFVals=[]
      let totalT = 0
      if(response.data) {
        
        fleetsDisplayData = response.data.fleetList.map( (f, index) => {
          let tireHealthScore = f.tiresCount !== 0 ? Math.ceil((f.excessiveUsageTires * 1 + f.mediumUsageTires * 2 + f.noUsageTires * 3) / (f.tiresCount * 3)*100) : 0
          let newF = {...f, tireHealthScore}
          if(healthScoreFVals.indexOf(tireHealthScore) === -1) {
            healthScoreFVals.push(tireHealthScore)
          }
          totalT = totalT + f.tiresCount
          return newF
        })
        setFleets(fleetsDisplayData)       
        setTotalTires(response.data.fleetData?.fleetTiresCount)
        setTotalFleets(response.data.fleetData?.fleetCount)
        setPageCount(Math.ceil(response.data.fleetData?.fleetCount / itemsPerPage))
      }
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
        setFleets([])
        setHealthScoreFilterValues([])
        setTotalFleets(0)
        setShowSpinner(false)
        setLoading(false) 
    }  
  }
  const refreshFleets = useCallback(debounce(loadFleets, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshFleets(pageNumber, itemsPerPage, search, regionFilter, healthScoreFilter)
    return () => mounted = false
  },[pageNumber, search, regionFilter, healthScoreFilter])

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

        let healthScoreFVals = []
        response.data[0].fleetsHealthScores.forEach(item => {
          if(!isNaN(parseInt(item.healthScore))) {
            healthScoreFVals.push(parseInt(item.healthScore))  
          } else {
            healthScoreFVals.push(0)  
          }
        })        
        
        setHealthScoreFilterValues(healthScoreFVals.sort(function (a, b) {  return a - b;  }))
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
    setPageNumber(0)
    setRegionFilter(newFilter)    
  }
  const handleHealthScoreFilterChange = newFilter => {    
    setPageNumber(0)
    setHealthScoreFilter(newFilter)    
  }
  const handleSearchChange = newSearch => {    
    setSearch(newSearch.target.value)    
    setPageNumber(0)
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      getExportData={getExportData}
      totalItems={totalFleets}
     />
     :
     null
   )
   
}