import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Comenzi from './Comenzi.component'
import fileSaver from 'file-saver'

export default function ComenziAgentContainer() {
  const [loading, setLoading] = useState(true)  
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [timePeriodFilter, setTimePeriodFilter] = useState("")  
  const [showSpinner, setShowSpinner] = useState(true)
  const [totalOrders, setTotalOrders] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const getExportData = () => {
    if(!showSpinner){
      setShowSpinner(true)
      api.get(`/services/servicesToExcel`, {
        responseType: 'arraybuffer',
        params: {
          totalOrders: totalOrders,
          searchString: search,
          timePeriodFilter: timePeriodFilter
        }
      }).then(res => {
        setShowSpinner(false)  
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileSaver.saveAs(blob, 'Export comenzi.xlsx')
      }).catch(err => {
        setShowSpinner(false)  
      })         
    }
  }

  const loadOrders = async (pageNo, itemLimit, searchStr, timeFilter) => {
    try {        
      const response = await api.get(`/services/getServiceOrders`, {
        params: {
          page: pageNo,
          limit: itemLimit,
          searchString: searchStr,
          timePeriodFilter: timeFilter
        }
      })         
      if(response.data.orderList) {
        let formattedOrders = []
        formattedOrders = response.data.orderList.map( (o, index) => {
          let t = new Date(o.created);
          let d = t.getDate();       
          let m = t.getMonth()+1; 
          let y = t.getFullYear();
          let formattedDate = d+'/'+m+'/'+y
          let {so_id, ...restOfO} = {...o}
          
          let newO = {so_id,formattedDate,...restOfO}
          newO.order_total = parseFloat(newO.order_total.toFixed(2))
          newO.order_total_fleet = parseFloat(newO.order_total_fleet.toFixed(2))
          return newO
        })
        setOrders(formattedOrders)     
        setTotalOrders(response.data.ordersCount)
        setPageCount(Math.ceil(response.data.ordersCount / itemsPerPage))   
      } else {
        setOrders([])     
        setTotalOrders(0)
        setPageCount(0)  
      }
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setOrders([])     
      setTotalOrders(0)
      setPageCount(0)         
      setShowSpinner(false)
      setLoading(false)         
    }  
  }
  const refreshOrders = useCallback(debounce(loadOrders, 300), [])
  
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshOrders(pageNumber, itemsPerPage, search, timePeriodFilter)
    return () => mounted = false
  },[pageNumber, search, timePeriodFilter])

 
  const handleTimePeriodFilterChange = newFilter => {    
    setPageNumber(0)
    setTimePeriodFilter(newFilter)    
  }
 
  const handleSearchChange = newSearch => {    
    setSearch(newSearch.target.value)    
    setPageNumber(0)
  }
  
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (!loading ? 
    <Comenzi 
      orders={orders}
      search={search}
      handleSearchChange={handleSearchChange}
      timePeriodFilter={timePeriodFilter}
      handleTimePeriodFilterChange={handleTimePeriodFilterChange}      
      showSpinner={showSpinner}
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      getExportData={getExportData}
      totalItems={totalOrders}
     />
     :
     null
   )
   
}