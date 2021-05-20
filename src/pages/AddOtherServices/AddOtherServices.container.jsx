import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddOtherServices from './AddOtherServices.component'

export default function AddOtherServicesContainer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vData, setVData] = useState(JSON.parse(sessionStorage.getItem('vehicle')))
  const [newService, setNewService] = useState({service_name: "", service_price: ""})
  const [additionalServicesList, setAdditionalServicesList] = useState(JSON.parse(sessionStorage.getItem('additionalServices')) || [])
  const history = useHistory()

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      if(!vData) {
        history.push('/')
      }
      setLoading(false)
    }
    return () => mounted = false
  },[])
 
  const handleSubmit = (e) => {
    e.preventDefault()    
    
    if(newService.service_name !== "" && newService.service_price !== "") {      
      if(!isNaN(parseFloat(newService.service_price))) {
        let newAddS = additionalServicesList
        newAddS.push(newService)
        setAdditionalServicesList(newAddS)
        sessionStorage.setItem('additionalServices', JSON.stringify(newAddS))    
        let selectedServices = (JSON.parse(sessionStorage.getItem('services')) || [])  
        selectedServices.push({s_id: newService.service_name, service_name: newService.service_name})
        sessionStorage.setItem('services', JSON.stringify(selectedServices))
        history.push('/dashboard/fisa_auto')
      } else {
        setError("Pret Serviciu nu are o valoare numerica")  
      }
    } else {
      setError("Denumire Serviciu si Pret Serviciu sunt obligatorii")
    }
  }

  const onServiceDetailsChange = (changedField, changedValue) => {
    const newSData = {...newService}   
    if(changedField === 'service_price'){     
      newSData[changedField] = changedValue.replace(",", ".")
    } else { 
      newSData[changedField] = changedValue
    }
    setNewService(newSData)
  }

  return (!loading ? 
         <AddOtherServices 
          vData={vData}         
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
          onChange={onServiceDetailsChange}
          newService={newService}
          />
          :
          null
        )
}