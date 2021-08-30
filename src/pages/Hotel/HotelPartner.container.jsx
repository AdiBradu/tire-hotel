import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import HotelPartner from './HotelPartner.component'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import fileSaver from 'file-saver'

export default function HotelPartnerContainer() {
  const [loading, setLoading] = useState(true)    
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [hotelVehiclesList, setHotelVehiclesList] = useState(null) 
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("") 
  const [reqRegNumber, setReqRegNumber] = useState("")
  const [showSpinner, setShowSpinner] = useState(true)   
  const { currentUser } = useAuth()  
  const history = useHistory()
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


  const handleRequestCreation = async reqRegN => {
    return api.post('/hotelRequests/', reqRegN)
  }
  
  const loadHotelVehicles = async (pageNo, itemLimit, searchStr, vehicleTypeFilter) => {
    try {        
      const response = await api.get(`/hotelTires/getPartnerHotelVehicles`, {
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
  const handleRequestChange = (fname, newReq) => {   
    let newReqVal = newReq.toUpperCase().replace(/[^0-9A-Z]+/gi, "")  
    setReqRegNumber(newReqVal)
  }
  async function handleSubmit(e) {
    e.preventDefault()    
    if(reqRegNumber === "") {
      setError("Nr. Inmatriculare este obligatoriu")
      setLoading(false)
      return false
    }
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleRequestCreation({reg_number: reqRegNumber})    
      if(response.status === 201) {
        history.push(`/dashboard/cereri/`)  
      }
    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Creare cerere esuata")
      }
      setLoading(false)
    } 
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (!loading ? 
    <HotelPartner 
      error={error}
      success={success}
      hotelVehiclesList={hotelVehiclesList}
      search={search}
      handleSearchChange={handleSearchChange}
      vehicleTypeFilter={vehicleTypeFilter}
      handleVehicleTypeFilterChange={handleVehicleTypeFilterChange}         
      showSpinner={showSpinner}     
      currentUserType={currentUser.user_type}
      reqRegNumber={reqRegNumber}
      handleRequestChange={handleRequestChange}
      loading={loading}
      handleSubmit={handleSubmit}
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