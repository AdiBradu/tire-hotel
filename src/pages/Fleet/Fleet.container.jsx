import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Flote from './Fleet.component'
import { useParams, useHistory } from 'react-router-dom'
import fileSaver from 'file-saver'

export default function FloteContainer() {
  const [loading, setLoading] = useState(true)  
  const [fleetData, setFleetData] = useState([])
  const [search, setSearch] = useState("")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("")
  const [fleetVehiclesList, setFleetVehiclesList] = useState(null)
  const history = useHistory()
  const { fleetId } = useParams()
  const [canDelete, setCanDelete] = useState(true)
  const [showSpinner, setShowSpinner] = useState(true)
  const [totalFleetVehicles, setTotalFleetVehicles] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const deleteVehicle = async vId => {
    setCanDelete(false)
    try {        
      const response = await api.delete(`/vehicles/id/${vId}`)
      if(response){
        loadFleet()
        loadFleetVehicles()
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
 

  const loadFleet = async () => {
    try {        
      const response = await api.get(`/fleets/id/${fleetId}`)
      setFleetData(response?.data[0])
      setLoading(false)
    } catch (error) {
      setFleetData([])
      if(error?.response?.data?.status !== 401) {
        setLoading(false) 
      }
    }  
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) loadFleet()
    return () => mounted = false
  },[])

  const getExportData = () => {
    if(!showSpinner){
      setShowSpinner(true)
      api.get(`/fleets/fleetVehiclesToExcel`, {
        responseType: 'arraybuffer',
        params: {
          fleet_id: fleetId,
          totalFleetVehicles: totalFleetVehicles,
          searchString: search,
          vehicleTypeFilter: vehicleTypeFilter,
        }
      }).then(res => {
        setShowSpinner(false)  
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileSaver.saveAs(blob, fleetData.fleet_name + '.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }
  
  const loadFleetVehicles = async (pageNo, itemLimit, searchStr, vehicleTypeFilter) => {
    try {        
      const response = await api.get(`/fleets/getFleetVehicles`, {
        params: {
          fleet_id: fleetId,
          page: pageNo,
          limit: itemLimit,
          searchString: searchStr,
          vehicleTypeFilter: vehicleTypeFilter,
        }
      })
      setFleetVehiclesList(response.data.fleetVehicleList)
      setTotalFleetVehicles(response.data.fleetVehicleCount)
      setPageCount(Math.ceil(response.data.fleetVehicleCount / itemsPerPage))
      setShowSpinner(false)
      setLoading(false)
      
    } catch (error) {
      setFleetVehiclesList([])
      setTotalFleetVehicles(0)
      setPageCount(0)
      setShowSpinner(false)
      setLoading(false) 
    }   
  }
  const refreshFleetVehicles = useCallback(debounce(loadFleetVehicles, 300), [])

  useEffect(() => {
    let mounted  = true
    if(mounted) refreshFleetVehicles(pageNumber, itemsPerPage, search, vehicleTypeFilter)
    return () => mounted = false
  },[pageNumber, search, vehicleTypeFilter])
  
  const handleVehicleTypeFilterChange = newFilter => {    
    setVehicleTypeFilter(newFilter)    
    setPageNumber(0)
  }
  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
    setPageNumber(0)
  }
  const deleteActionHandler = e => {
    let vId = e.target.attributes.data.value
    if(vId && canDelete) {
      deleteVehicle(vId)
    }
  }
  const editActionHandler = e => {
    let vId = e.target.attributes.data.value
    if(vId) {
      history.push(`/dashboard/flote/editeaza/vehicul/${vId}`)
    }
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  return (!loading ? 
    <Flote 
      fleetData={fleetData}
      fleetVehiclesList={fleetVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}
      deleteActionHandler={deleteActionHandler}
      editActionHandler={editActionHandler}      
      showSpinner={showSpinner}
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      getExportData={getExportData}
      totalItems={totalFleetVehicles}
     />
     :
     null
   )
   
}