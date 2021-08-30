import React, { useState, useEffect, useCallback } from 'react'
import api from '../../utils/Api'
import debounce from 'lodash.debounce'
import { useHistory, useParams } from 'react-router-dom'
import VehicleDetailsFleet from './VehicleDetailsFleet.component'

export default function VehicleDetailsFleetContainer() {
  const [loading, setLoading] = useState(true)
  const [vehicleHotel, setVehicleHotel] = useState(null) 
  const [vehicleTires, setVehicleTires] = useState(null)  
  const [vehicleHotelTires, setVehicleHotelTires] = useState(null)  
  const [vData, setVData] = useState(null)
  const [orders, setOrders] = useState([])
  const { vId } = useParams()
  const history = useHistory()
  const [showSpinner, setShowSpinner] = useState(true)
  const [totalOrders, setTotalOrders] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 50
  const [pageCount, setPageCount] = useState(0)

  const loadOrders = async (pageNo, itemLimit) => {
    setShowSpinner(true)
    try {        
      const response = await api.get(`/services/getVehicleOrders`,
      {
        params: {
          v_id: vId,
          page: pageNo,
          limit: itemLimit
        }
      }
      )         
      if(response.data.vehicleOrders) {
        let formattedOrders = []
        formattedOrders = response.data.vehicleOrders.map( (o, index) => {
          let t = new Date(o.created);
          let d = t.getDate();       
          let m = t.getMonth()+1; 
          let y = t.getFullYear();
          let formattedDate = d+'/'+m+'/'+y
          let {so_id, ...restOfO} = {...o}          
          let newO = {so_id,formattedDate,...restOfO}
          newO.order_total = parseFloat(newO.order_total.toFixed(2))         
          return newO
        })
        setShowSpinner(false)
        setOrders(formattedOrders)        
        setTotalOrders(response.data.vehicleOrdersCount)
        setPageCount(Math.ceil(response.data.vehicleOrdersCount / itemsPerPage))
      }
    } catch (error) {
      setShowSpinner(false)
      setOrders([])        
      setTotalOrders(0)
      setPageCount(0)                    
    }  
  }

  const refreshOrders = useCallback(debounce(loadOrders, 300), [])
  
  const loadVehicleInfo = async vId => {
    try {        
      const response = await api.get(`/vehicles/getVehiclesWithTires`,{
        params: {
          vId
        }
      })
      return response;
    } catch (error) {
      return error;
    }   
  }
  
  const loadVehicleTires = async vehicleId => {    
    try {        
      const response = await api.get(`/tires/getVehicleTires`, {
        params: {
          v_id: vehicleId
        }
      })      
      setVehicleTires(response.data)      
    } catch (error) {      
      setVehicleTires(null)
    }  
  }

  const loadVehicleHotelTires = async vehicleId => {    
    try {        
      const response = await api.get(`/hotelTires/getVehicleTires`, {
        params: {
          v_id: vehicleId
        }
      })      
      setVehicleHotelTires(response.data)      
    } catch (error) {      
      setVehicleHotelTires(null)
    }  
  }

  const loadVehicleHotel = async vehicleId => {    
    try {        
      const response = await api.get(`/hotelTires/getHotelByVehicle`, {
        params: {
          v_id: vehicleId
        }
      })      
      setVehicleHotel(response.data)      
    } catch (error) {      
      setVehicleHotel(null)
    }  
  }
  useEffect(() => {
    let mounted  = true
    if(mounted) refreshOrders(pageNumber, itemsPerPage)
    return () => mounted = false
  },[pageNumber])

  useEffect(() => {
    let mounted  = true
    if(mounted) {                 
      const getCurrentVehicleTires = async () => {
        return await loadVehicleTires(vId)
      }
      getCurrentVehicleTires()
      const getCurrentVehicleHotelTires = async () => {
        return await loadVehicleHotelTires(vId)
      }
      getCurrentVehicleHotelTires()
      loadVehicleHotel(vId)
      loadVehicleInfo(vId).then(res => {
        setVData(res.data)
        setLoading(false)
      })
    }
    return () => mounted = false
  },[])
 
  const editHandler = () => {
    history.push(`/dashboard/flote/editeaza/vehicul/${vId}`)
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  
  return (!loading &&    
   <VehicleDetailsFleet    
    reg_number={vData.regNumber}
    vehicle_type={vData.vehicleType}
    vehicle_tire_count={vData.vehicle_tire_count}
    vehicleTires={vehicleTires}
    vehicleHotelTires={vehicleHotelTires}
    editActionHandler={editHandler}
    vehicleHotel={vehicleHotel}
    orders={orders}
    showSpinner={showSpinner}
    pageCount={pageCount}
    changePage={changePage}
    pageNumber={pageNumber}
    itemsPerPage={itemsPerPage}    
    totalItems={totalOrders}
   />
  )
}