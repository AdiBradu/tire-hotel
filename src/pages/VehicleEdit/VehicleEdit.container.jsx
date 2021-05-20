import React, { useEffect, useState } from 'react'
import VehicleEdit from './VehicleEdit.component'
import { useParams } from 'react-router-dom'
import api from '../../utils/Api'

export default function VehicleEditContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const [prefill, setPrefill] = useState(false) 
  const [tireFilter, setTireFilter] = useState("")
  const [vehicleTireCount, setVehicleTireCount] = useState(4) 
  const { vId } = useParams()

  const [vData, setVData] = useState({
    vehicleId: vId,
    fleetId: 0,
    regNumber : '',
    old_vehicle_tire_count: 4,
    vehicle_tire_count: 4,
    vechicleBrand: '',
    vechicleModel: '',
    vehicleType:  'TURISM',
    vechicleMilage : '',
    vehicleTires: {
      tireIds: [0,0,0,0,0,0],
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

  /* Load available tire options */
  const loadTireOptions = async () => {
    try {        
      const response = await api.get(`/vehicles/getVehicleTireAttributes`)
      return response;
    } catch (error) {
      return error;
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
  const handleVehicleUpdate = async newVehicleData => {
    return api.patch(`/vehicles/id/${vId}`, newVehicleData)
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadTireOptions().then( res => {
        setTireOpts(res.data)   
      })
      loadVehicleInfo(vId).then(res => {
        setVData(res.data)
        setVehicleTireCount(res.data.old_vehicle_tire_count)
        setTireFilter(res.data.old_vehicle_tire_count.toString())
        setLoading(false)
      })
      
    }
    return () => mounted = false
  },[])
  
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
    
    if(vehiclePostData.regNumber === "") {
      setError("Nr. Inmatriculare este obligatoriu")
      setLoading(false)
      return false
    }
    if(vehiclePostData.vechicleBrand === "") {
      setError("Marca vehiculului este obligatorie")
      setLoading(false)
      return false
    }
    if(vehiclePostData.vechicleModel === "") {
      setError("Modelul vehiculului este obligatoriu")
      setLoading(false)
      return false
    }
    if(vehiclePostData.vechicleMilage === "") {
      setError("KM vehiculului este obligatoriu")
      setLoading(false)
      return false
    }

    let tireModelsErrors = false
    vehiclePostData.vehicleTires.models.forEach((v, i) => {if(i <= vData.vehicle_tire_count-1 && v === "") tireModelsErrors=true})
    if(tireModelsErrors) {
      setError("Modelul este obligatoriu pentru toate anvelopele")
      setLoading(false)
      return false
    } 
    
    let tireDotsErrors = false
    vehiclePostData.vehicleTires.dots.forEach((v, i) => {if(i <= vehiclePostData.vehicle_tire_count-1 && v === "") tireDotsErrors=true})
    if(tireDotsErrors) {
      setError("DOT este obligatoriu pentru toate anvelopele")
      setLoading(false)
      return false
    }
  
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleVehicleUpdate(vehiclePostData)    
      if(response.status === 200) setSuccess('Vehicul editat')     
      loadVehicleInfo(vId).then(res => {
        setVData(res.data)
        setVehicleTireCount(res.data.old_vehicle_tire_count)
        setLoading(false)
      })

    } catch(error) {
      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Editare vehicul esuata")
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
         <VehicleEdit 
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
