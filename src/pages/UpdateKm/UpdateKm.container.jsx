import React, { useEffect, useState } from 'react'
import UpdateKm from './UpdateKm.component'
import { useHistory } from 'react-router-dom'

export default function UpdateKmContainer() {
  const [loading, setLoading] = useState(true)
  const [vData, setVData] = useState(JSON.parse(sessionStorage.getItem('vehicle')))
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
    setLoading(false)
    sessionStorage.setItem('vehicle', JSON.stringify(vData))    
    sessionStorage.setItem('updatedMilage', vData.vehicle_milage)    
    let selectedServices = JSON.parse(sessionStorage.getItem('services'))    
    let milageUpdate = selectedServices.filter(item => item.s_id === 'km_upd')
    if(milageUpdate.length < 1) {
      selectedServices.push({s_id: "km_upd", service_name: "UPDATE KM"})
      sessionStorage.setItem('services', JSON.stringify(selectedServices))
    }
    history.push('/dashboard/fisa_auto')
  }

  const onKmChange = (changedField, changedValue) => {
    const newVData = {...vData}    
    newVData[changedField] = changedValue.replace(/[^0-9]+/gi, "")
    setVData(newVData)
  }

  return (!loading ? 
         <UpdateKm 
          vData={vData}         
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={onKmChange}
          />
          :
          null
        )
}