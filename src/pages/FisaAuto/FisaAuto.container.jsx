import React, { useState, useEffect } from 'react'
import api from '../../utils/Api'
import { useHistory } from 'react-router-dom'
import FisaAuto from './FisaAuto.component'

export default function FisaAutoContainer() {
  const [loading, setLoading] = useState(true)
  const [vehicleTires, setVehicleTires] = useState(JSON.parse(sessionStorage.getItem('vehicleTires')) || null)
  const vData = JSON.parse(sessionStorage.getItem('vehicle'))
  const [selectedServices, setSelectedServices] = useState(JSON.parse(sessionStorage.getItem('services')) || [])
  const vTiresData = JSON.parse(sessionStorage.getItem('vTiresData'))
  const updatedMilage = JSON.parse(sessionStorage.getItem('updatedMilage'))
  const additionalServices = (JSON.parse(sessionStorage.getItem('additionalServices')) || [])
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()
  
  const handleServiceOrderCreation = async newServiceOrderData => {
    return api.post('/services', newServiceOrderData)
  }

  const loadVehicleTires = async vehicleId => {    
    try {        
      const response = await api.get(`/tires/getVehicleTires`, {
        params: {
          v_id: vehicleId
        }
      })      
      setVehicleTires(response.data)
      sessionStorage.setItem('vehicleTires', JSON.stringify(response.data))
      sessionStorage.setItem('oldVehicleTires', JSON.stringify(response.data))
    } catch (error) {
      sessionStorage.removeItem('vehicleTires')
      sessionStorage.removeItem('oldVehicleTires')
      setVehicleTires(null)
    }  
  }

  useEffect(() => {
    let mounted  = true
    if(mounted) {
      if(!vData || selectedServices.length < 1) {
        history.push('/')
      } else {        
        if(!vehicleTires) {
          const getCurrentVehicleTires = async () => {
            return await loadVehicleTires(vData.v_id)
          }
          getCurrentVehicleTires()
        }
      }
      setLoading(false)
    }
    return () => mounted = false
  },[])

  const serviceDeleteActionHandler = e => {    
    let sId = e.target.attributes.data.value   
    if(sId) {
      //let newServices = selectedServices.filter(item => item.s_id !== sId)     
      let newServices = []
      let serviceAlreadyRemoved = false
      for (const [index, el] of selectedServices.entries()) {  
        if(el.s_id !== sId || serviceAlreadyRemoved){
          newServices.push(el)
        }
        if(el.s_id === sId && !serviceAlreadyRemoved) {
          serviceAlreadyRemoved = true          
        }
      }
      
      sessionStorage.setItem('services', JSON.stringify(newServices))
      //let newAdditionalServices = additionalServices.filter(item => item.service_name !== sId)
      let newAdditionalServices = []
      let addServiceAlreadyRemoved = false
      for (const [index, el] of additionalServices.entries()) {  
        if(el.service_name !== sId || addServiceAlreadyRemoved){
          newAdditionalServices.push(el)
        }
        if(el.service_name === sId && !addServiceAlreadyRemoved) {
          addServiceAlreadyRemoved = true          
        }
      }
      
      setSelectedServices(newServices)
      sessionStorage.setItem('additionalServices',  JSON.stringify(newAdditionalServices))
    }
  }

  const completeOrder = async () => {    
    setDisableSubmitBtn(true)    
    let tiresUpdateDone = selectedServices.filter(item => item.s_id === 'tire_upd')
    let kmUpdateDone = selectedServices.filter(item=> item.s_id === 'km_upd')
    let chargeableServices = selectedServices.filter(item=> (item.s_id !== 'km_upd' && item.s_id !== 'tire_upd'))
  
    if(chargeableServices.length < 1) {
      setError("Minim un serviciu facturabil este obligatoriu")
      setDisableSubmitBtn(false)
    } else if(tiresUpdateDone.length < 1 || kmUpdateDone.length < 1) {
      setError("UPDATE KM si UPDATE ANVELOPE sunt obligatorii")
      setDisableSubmitBtn(false)
    } else {
      try {
        const response  = await handleServiceOrderCreation({vehicle_data: vData, services: selectedServices, additional_services: additionalServices, tires_data: vTiresData, milage_upd: updatedMilage})    
        if(response.status === 201) {
          sessionStorage.removeItem('vehicle')
          sessionStorage.removeItem('availableServices')
          sessionStorage.removeItem('services')
          sessionStorage.removeItem('vehicleTires')
          sessionStorage.removeItem('oldVehicleTires')
          sessionStorage.removeItem('vTiresData')
          sessionStorage.removeItem('updatedMilage')
          sessionStorage.removeItem('additionalServices')
          history.push('/dashboard/comenzi')  
        }
      } catch(error) {
        if(error?.response?.data?.status < 500) {
          if(error?.response?.data?.status === 400) {
            setError(error?.response?.data?.errors[0].msg)
          } else {
            setError(error?.response?.data?.message)
          }
        } else {
            setError("Finalizare fisa auto esuata")
        }
        setDisableSubmitBtn(false)
        setLoading(false)
      }
    }
  }

  return (!loading &&    
   <FisaAuto 
    selectedServices={selectedServices}
    reg_number={vData.reg_number}
    vehicle_type={vData.vehicle_type}
    vehicle_tire_count={vData.vehicle_tire_count}
    vehicleTires={vehicleTires}
    deleteActionHandler={serviceDeleteActionHandler}
    completeOrder={completeOrder}
    disableSubmitBtn={disableSubmitBtn}
    error={error}
    success={success}

   />
  )
}