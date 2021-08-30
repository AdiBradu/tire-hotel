import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import Cereri from './Cereri.component'

export default function CereriContainer() {
  const [loading, setLoading] = useState(true)     
  const [search, setSearch] = useState("")
  const [reqList, setReqList] = useState(null)
  const [showSpinner, setShowSpinner] = useState(true)   
  const [reqTypeFilter, setReqTypeFilter] = useState(null)
  const [reqStatusFilter, setReqStatusFilter] = useState(null)
  const [totalRequests, setTotalRequests] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const loadReqList = async (pageNo, itemLimit, searchStr, reqType, reqStatus) => {
    setShowSpinner(true)
    try {        
      const response = await api.get(`/hotelRequests/`, {
        params: {
          page: pageNo,
          limit: itemLimit,
          searchString: searchStr,
          reqType: reqType,
          reqStatus: reqStatus   
        }
      })
      setReqList(response.data.reqsList)
      setTotalRequests(response.data.reqsCount)
      setPageCount(Math.ceil(response.data.reqsCount / itemsPerPage))
      setShowSpinner(false)
      setLoading(false)
    } catch (error) {
      setReqList([])
      setTotalRequests(0)
      setPageCount(0)
      setShowSpinner(false)
      setLoading(false) 
    }   
  }

  const refreshRequests = useCallback(debounce(loadReqList, 300), [])

  useEffect(() => {
    let mounted  = true
    if(mounted) refreshRequests(pageNumber, itemsPerPage, search, reqTypeFilter, reqStatusFilter)
    return () => mounted = false
  },[pageNumber, search, reqTypeFilter, reqStatusFilter])
  
  const handleSearchChange = newSearch => {
    setPageNumber(0) 
    setSearch(newSearch.target.value)   
  }
  const handleReqTypeFilterChange = newFilter => {    
    setPageNumber(0)
    setReqTypeFilter(newFilter)    
  }
  const handleReqStatusFilterChange = newFilter => {
    setPageNumber(0)
    setReqStatusFilter(newFilter)      
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  return (!loading ? 
    <Cereri     
      reqList={reqList}
      search={search}
      handleSearchChange={handleSearchChange}     
      reqTypeFilter={reqTypeFilter}
      handleReqTypeFilterChange={handleReqTypeFilterChange} 
      reqStatusFilter={reqStatusFilter}
      handleReqStatusFilterChange={handleReqStatusFilterChange}
      showSpinner={showSpinner}          
      loading={loading}    
      pageCount={pageCount}
      changePage={changePage}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}     
      totalItems={totalRequests} 
     />
     :
     null
   )
   
}