import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../utils/Api'
import UpdateTires from './UpdateTires.component'

export default function UpdateTiresContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [vData, setVData] = useState(JSON.parse(sessionStorage.getItem('vehicle')))
  const [vehicleTires, setVehicleTires] = useState(JSON.parse(sessionStorage.getItem('vehicleTires')))
  const [vTiresData, setVTiresData] = useState(JSON.parse(sessionStorage.getItem('vTiresData')))
  const [selectedTire, setSelectedTire] = useState(null)
  const [tireOpts, setTireOpts] = useState(null)
  const history = useHistory()
  
  /* Load available tire options */
  const loadTireOptions = async () => {
    try {        
      const response = await api.get(`/vehicles/getVehicleTireAttributes`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  const loadVehicleTiresInfo = async vId => {
    try {        
      const response = await api.get(`/tires/getVehiclesTiresInfo`,{
        params: {
          vId
        }
      })
      return response;
    } catch (error) {
      return error;
    }   
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {     
      if(!vData || !vehicleTires) {
        history.push('/')
      }
      loadTireOptions().then( res => {
        setTireOpts(res.data)   
      })
      if(!vTiresData) {
        loadVehicleTiresInfo(vData.v_id).then(res => {
          setVTiresData(res.data)       
          setSelectedTire(res.data[0]) 
          setLoading(false)
        })      
      } else {
        setSelectedTire(vTiresData[0]) 
        setLoading(false)  
      }
    }
    return () => mounted = false
  },[])
 
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)    
    let newTiresData = vTiresData
    newTiresData[selectedTire.tire_position - 1] = selectedTire
    setVTiresData(newTiresData)
    let newVehicleTires = vehicleTires
    let newWidthObj = tireOpts.widthsList.filter(w => w.tw_id === parseInt(selectedTire.tire_width))
    newVehicleTires[selectedTire.tire_position - 1].width = newWidthObj[0].width
    let newHeightObj = tireOpts.heightsList.filter(h => h.th_id === parseInt(selectedTire.tire_height))
    newVehicleTires[selectedTire.tire_position - 1].height = newHeightObj[0].height 
    let newDiameterObj = tireOpts.rimsList.filter(r => r.tr_id === parseInt(selectedTire.tire_diameter))
    newVehicleTires[selectedTire.tire_position - 1].diameter = newDiameterObj[0].rim   
    let newSpeedIndexObj = tireOpts.speedIndexesList.filter(s => s.tsi_id === parseInt(selectedTire.tire_speed_index))
    newVehicleTires[selectedTire.tire_position - 1].speed_index = newSpeedIndexObj[0].speed_index   
    let newLoadIndexObj = tireOpts.loadIndexesList.filter(l => l.tli_id === parseInt(selectedTire.tire_load_index))
    newVehicleTires[selectedTire.tire_position - 1].load_index = newLoadIndexObj[0].load_index   
    let newTireBrand = tireOpts.brandsList.filter(b => b.tb_id === parseInt(selectedTire.tire_brand))
    newVehicleTires[selectedTire.tire_position - 1].brand = newTireBrand[0].brand    
    newVehicleTires[selectedTire.tire_position - 1].tire_model = selectedTire.tire_model
    newVehicleTires[selectedTire.tire_position - 1].tire_season = selectedTire.tire_season
    newVehicleTires[selectedTire.tire_position - 1].tire_dot = selectedTire.tire_dot
    newVehicleTires[selectedTire.tire_position - 1].tire_tread_wear = parseFloat(selectedTire.tire_tread_wear)
    setVehicleTires(newVehicleTires)
    sessionStorage.setItem('vehicleTires', JSON.stringify(vehicleTires))        
    sessionStorage.setItem('vTiresData', JSON.stringify(vTiresData))    
    let selectedServices = JSON.parse(sessionStorage.getItem('services'))
    let tiresUpdate = selectedServices.filter(item => item.s_id === 'tire_upd')
    if(tiresUpdate.length < 1) {
      selectedServices.push({s_id: "tire_upd", service_name: "UPDATE ANVELOPE"})
      sessionStorage.setItem('services', JSON.stringify(selectedServices))
    }
    setSuccess('Detalii anvelopa actualizate')
    setLoading(false) 
  }

  const onTireOptChange = (changedField, changedValue) => {
    const newTData = {...selectedTire}    
    if(changedField === "tire_tread_wear") changedValue = parseFloat(changedValue)
    newTData[changedField] = changedValue
    setSelectedTire(newTData)    
  }

  const onTireChange = (changedField, changedValue) => {
    setSelectedTire(vTiresData[changedValue-1])
  }

  return (!loading ? 
         <UpdateTires 
          vData={vData}
          error={error}
          success={success}
          loading={loading}
          handleSubmit={handleSubmit}
          onChange={onTireOptChange}
          onTireChange={onTireChange}
          tireOpts={tireOpts}
          vehicleTires={vehicleTires}
          selectedTire={selectedTire}
          />
          :
          null
        )
}