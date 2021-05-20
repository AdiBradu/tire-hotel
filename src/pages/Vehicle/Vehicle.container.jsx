import React, { useEffect, useState } from 'react'
import Vehicle from './Vehicle.component'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'

export default function VehicleContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const [prefill, setPrefill] = useState(false) 
  const [tireFilter, setTireFilter] = useState("")
  const [vehicleTireCount, setVehicleTireCount] = useState(4) 
  const { fleetId } = useParams()

  /* Load available tire options */
  const loadTireOptions = async () => {
    try {        
      const response = await api.get(`/vehicles/getVehicleTireAttributes`)
      return response;
    } catch (error) {
      return error;
    }   
  }
  
  const handleVehicleCreation = async newVehicleData => {
    return api.post('/vehicles/', newVehicleData)
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadTireOptions().then( res => {
        setTireOpts(res.data)   
      
      })
      setLoading(false)
    }
    return () => mounted = false
  },[])
  
  const [vData, setVData] = useState({
    fleetId: fleetId,
    regNumber : '',
    vehicle_tire_count: 4,
    vechicleBrand: '',
    vechicleModel: '',
    vehicleType:  'TURISM',
    vechicleMilage : '',
    vehicleTires: {
      widths: ["1","1","1","1","1","1"], 
      heights: ["1","1","1","1","1","1"], 
      diameters: ["1","1","1","1","1","1"], 
      speedIndexes: ["1","1","1","1","1","1"], 
      loadIndexes: ["1","1","1","1","1","1"], 
      brands: ["1","1","1","1","1","1"], 
      models: ["","","","","",""],
      seasons: ["Iarna","Iarna","Iarna","Iarna","Iarna","Iarna"],
      dots: ["","","","","",""],
      rims: ["1","1","1","1","1","1"], 
      treadUsages: ["0.0","0.0","0.0","0.0","0.0","0.0"]
    }
  })
  
  function updatePrefillStatus(e) {
    setPrefill(!prefill)    
  }

  function updateVData(changedField, changedValue) {
    const newVData = {...vData}
    if (changedField.indexOf('_') > -1)
    {
      let tireAttr = changedField.split('_')      
      if(prefill) {
        for(let i=0;i<vehicleTireCount;i+=1){
          newVData['vehicleTires'][tireAttr[0]][i] = changedValue
        }
      } else {
        newVData['vehicleTires'][tireAttr[0]][tireAttr[1]] = changedValue
      }
      setVData(newVData)
    }
    else
    {      
      newVData[changedField] = changedValue
      setVData(newVData)
    }

  }
 
  async function handleSubmit(e) {
    e.preventDefault()
    let vehiclePostData = vData
    
    if(vData.regNumber === "") {
      setError("Nr. Inmatriculare este obligatoriu")
      setLoading(false)
      return false
    }
    if(vData.vechicleBrand === "") {
      setError("Marca vehiculului este obligatorie")
      setLoading(false)
      return false
    }
    if(vData.vechicleModel === "") {
      setError("Modelul vehiculului este obligatoriu")
      setLoading(false)
      return false
    }
    if(vData.vechicleMilage === "") {
      setError("KM vehiculului este obligatoriu")
      setLoading(false)
      return false
    }

    let tireModelsErrors = false
    vData.vehicleTires.models.forEach((v, i) => {if(i <= vData.vehicle_tire_count-1 && v === "") tireModelsErrors=true})
    if(tireModelsErrors) {
      setError("Modelul este obligatoriu pentru toate anvelopele")
      setLoading(false)
      return false
    } 
    
    let tireDotsErrors = false
    vData.vehicleTires.dots.forEach((v, i) => {if(i <= vData.vehicle_tire_count-1 && v === "") tireDotsErrors=true})
    if(tireDotsErrors) {
      setError("DOT este obligatoriu pentru toate anvelopele")
      setLoading(false)
      return false
    }
  
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleVehicleCreation(vehiclePostData)    
      if(response.status === 201) setSuccess(response.data)     
      setVData({
        fleetId: fleetId,
        regNumber : '',
        vehicle_tire_count: vData.vehicle_tire_count,
        vechicleBrand: '',
        vechicleModel: '',
        vehicleType:  'TURISM',
        vechicleMilage : '',
        vehicleTires: {
          widths: ["1","1","1","1","1","1"], 
          heights: ["1","1","1","1","1","1"], 
          diameters: ["1","1","1","1","1","1"], 
          speedIndexes: ["1","1","1","1","1","1"], 
          loadIndexes: ["1","1","1","1","1","1"], 
          brands: ["1","1","1","1","1","1"], 
          models: ["","","","","",""],
          seasons: ["Iarna","Iarna","Iarna","Iarna","Iarna","Iarna"],
          dots: ["","","","","",""],
          rims: ["1","1","1","1","1","1"], 
          treadUsages: ["0.0","0.0","0.0","0.0","0.0","0.0"]
        }
      })
      setLoading(false)

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Creare vehicul esuata")
      }
      setLoading(false)

    }
    
  }
  const handleTiresFilterChange = value => {
    setTireFilter(value) 
    let newTireCount = value ? value : 4
    setVehicleTireCount(newTireCount)
    const newVData = {...vData}
    newVData['vehicle_tire_count'] = newTireCount
    setVData(newVData)
    
  }

  return (!loading ? 
         <Vehicle 
          vData={vData}
          error={error}
          success={success}
          loading={loading}
          tireOpts={tireOpts}
          handleSubmit={handleSubmit}
          onChange={updateVData}
          updatePrefillStatus={updatePrefillStatus}
          handleTiresFilterChange={handleTiresFilterChange}
          vehicleTireCount={vehicleTireCount}
          prefill={prefill}
          tireFilter={tireFilter}
          />
          :
          null
        )
}
