import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import { useHistory, useParams } from 'react-router-dom'
import VehicleDetails from './VehicleDetails.component'

export default function VehicleDetailsContainer() {
  const [loading, setLoading] = useState(true)
  const [vehicleHotel, setVehicleHotel] = useState(null) 
  const [vehicleTires, setVehicleTires] = useState(null)  
  const [vehicleHotelTires, setVehicleHotelTires] = useState(null)  
  const [vData, setVData] = useState(null)
  const [orders, setOrders] = useState([])
  const { vId } = useParams()
  const history = useHistory()

  const loadOrders = async () => {
    try {        
      const response = await api.get(`/services/getVehicleOrders`,
      {
        params: {
          v_id: vId
        }
      }
      )         
      if(response.data) {
        let formattedOrders = []
        formattedOrders = response.data.map( (o, index) => {
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
      }
    } catch (error) {
      setOrders([])             
    }  
  }

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
    if(mounted) {           
      loadOrders()
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
  
  return (!loading &&    
   <VehicleDetails    
    reg_number={vData.regNumber}
    vehicle_type={vData.vehicleType}
    vehicle_tire_count={vData.vehicle_tire_count}
    vehicleTires={vehicleTires}
    vehicleHotelTires={vehicleHotelTires}
    editActionHandler={editHandler}
    vehicleHotel={vehicleHotel}
    orders={orders}
   />
  )
}