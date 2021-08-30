import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import HotelAdmin from './HotelAdmin.component'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import fileSaver from 'file-saver'

export default function HotelAdminContainer() {
  const [loading, setLoading] = useState(true)    
  const [search, setSearch] = useState("")
  const [hotelVehiclesList, setHotelVehiclesList] = useState(null) 
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("") 
  const [showSpinner, setShowSpinner] = useState(true) 
  const history = useHistory()
  const { currentUser } = useAuth()  
  const [totalHotelVehicles, setTotalHotelVehicles] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)
  
  const getExportData = () => {
    if(!showSpinner){
      setShowSpinner(true)
      api.get(`/hotelTires/hotelVehiclesToExcel`, {
        responseType: 'arraybuffer',
        params: {
          totalHotelVehicles: totalHotelVehicles,
          searchString: search,
          vehicleTypeFilter: vehicleTypeFilter
        }
      }).then(res => {
        setShowSpinner(false)  
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileSaver.saveAs(blob, 'Portofoliu hotel vehicule.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }

  const loadHotelVehicles = async (pageNo, itemLimit, searchStr, vehicleTypeFilter) => {
    try {        
      const response = await api.get(`/hotelTires/getAllHotelVehicles`, {
        params: {
          page: pageNo,
          limit: itemLimit,
          searchString: searchStr,
          vehicleTypeFilter: vehicleTypeFilter
        }
      })
      setHotelVehiclesList(response.data.hotelVehiclesList)
      setTotalHotelVehicles(response.data.hotelVehiclesCount)
      setPageCount(Math.ceil(response.data.hotelVehiclesCount / itemsPerPage))
      setShowSpinner(false)
      setLoading(false)
      
    } catch (error) {
      setHotelVehiclesList([])
      setTotalHotelVehicles(0)
      setPageCount(0)
      setShowSpinner(false)
      setLoading(false) 
    }   
  }
  const refreshHotelVehicles = useCallback(debounce(loadHotelVehicles, 300), [])
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshHotelVehicles(pageNumber, itemsPerPage, search, vehicleTypeFilter)
    return () => mounted = false
  },[pageNumber, search, vehicleTypeFilter])
  
  const handleVehicleTypeFilterChange = newFilter => {    
    setPageNumber(0)
    setVehicleTypeFilter(newFilter)    
  }
  
  const handleSearchChange = newSearch => {
    setSearch(newSearch.target.value)    
    setPageNumber(0)
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
    <HotelAdmin 
      hotelVehiclesList={hotelVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}    
      editActionHandler={editActionHandler}     
      showSpinner={showSpinner}     
      currentUserType={currentUser.user_type}
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      getExportData={getExportData}
      totalItems={totalHotelVehicles}
     />
     :
     null
   )
   
}