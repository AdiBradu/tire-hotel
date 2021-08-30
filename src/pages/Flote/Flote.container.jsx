import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Flote from './Flote.component'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import fileSaver from 'file-saver'

export default function FloteContainer() {
  const [loading, setLoading] = useState(true)  
  const [fleets, setFleets] = useState([])
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState("")
  const [healthScoreFilter, setHealthScoreFilter] = useState("")
  const [healthScoreFilterValues, setHealthScoreFilterValues] = useState([])
  const [regionFilterValues, setRegionFilterValues] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true)
  const [canDelete, setCanDelete] = useState(true)
  const history = useHistory()
  const { currentUser } = useAuth()  
  const [totalFleets, setTotalFleets] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const deleteFleet = async pId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/fleets/id/${pId}`)
      if(response){
        refreshFleets()
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
        fileSaver.saveAs(blob, 'Export flote.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }
  const loadFleets = async (pageNo, itemLimit, searchStr, region, healthScore) => {
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
      if(response.data) {
        fleetsDisplayData = response.data.fleetList.map( (f, index) => {
          let tireHealthScore = f.tiresCount !== 0 ? Math.ceil((f.excessiveUsageTires * 1 + f.mediumUsageTires * 2 + f.noUsageTires * 3) / (f.tiresCount * 3)*100) : 0
          let newF = {...f, tireHealthScore}
          if(healthScoreFVals.indexOf(tireHealthScore) === -1) {
            healthScoreFVals.push(tireHealthScore)
          }
          return newF
        })
        setFleets(fleetsDisplayData)       
        setTotalFleets(response.data.fleetData?.fleetCount)
        setPageCount(Math.ceil(response.data.fleetData?.fleetCount / itemsPerPage))
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
    if(mounted) refreshFleets(pageNumber, itemsPerPage, search, regionFilter, healthScoreFilter)
    return () => mounted = false
  },[pageNumber, search,  regionFilter, healthScoreFilter])

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
    setRegionFilter(newFilter)    
    setPageNumber(0)
  }
  const handleHealthScoreFilterChange = newFilter => {        
    setHealthScoreFilter(newFilter)    
    setPageNumber(0)
  }
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
    setPageNumber(0)
  }

  const deleteActionHandler = e => {
    let fId = e.target.attributes.data.value
    if(fId && canDelete && currentUser.user_type === 1) {
      deleteFleet(fId)
    }
  }
  const editActionHandler = e => {
    let fId = e.target.attributes.data.value
    if(fId) {
      history.push(`/dashboard/editeaza/flota/${fId}`)
    }
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  return (!loading ? 
    <Flote 
      fleets={fleets}
      search={search}
      handleSearchChange={handleSearchChange}
      regionFilter={regionFilter}
      handleRegionFilterChange={handleRegionFilterChange}
      regionFilterValues={regionFilterValues}
      healthScoreFilter={healthScoreFilter}
      handleHealthScoreFilterChange={handleHealthScoreFilterChange}
      healthScoreFilterValues={healthScoreFilterValues}
      showSpinner={showSpinner}
      deleteActionHandler={deleteActionHandler}
      editActionHandler={editActionHandler}
      currentUserType={currentUser.user_type}
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
