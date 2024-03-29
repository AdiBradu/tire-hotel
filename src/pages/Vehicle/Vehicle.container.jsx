import React, { useEffect, useState } from 'react'
import Vehicle from './Vehicle.component'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../utils/Api'

export default function VehicleContainer() {
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)
  const [tireOpts, setTireOpts] = useState(null)
  const [hotelsList, setHotelsList] = useState(null)
  const [prefill, setPrefill] = useState(false) 
  const [tireFilter, setTireFilter] = useState("")
  const [vehicleTireCount, setVehicleTireCount] = useState(4) 
  const [multipleTireSets, setMultipleTireSets] = useState("")
  const [vehicleTireSetsCount, setVehicleTireSetsCount] = useState(1)
  const history = useHistory()
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
  
  /* Load available tire hotels list */
  const loadHotelsList = async () => {
    try {        
      const response = await api.get(`/hotelTires/getHotelsList`)
      return response;
    } catch (error) {
      return error;
    }   
  }

  const handleVehicleCreation = async newVehicleData => {
    return api.post('/vehicles/', newVehicleData)
  }

  const handleHotelVehicleCreation = async newVehicleData => {
    return api.post('/hotelTires/', newVehicleData)
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      loadHotelsList().then( res => {
        setHotelsList(res.data)          
      })
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

  const [hData, setHData] = useState({
    fleetId: fleetId,
    regNumber : '',
    vehicle_tire_count: 4,    
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
      treadUsages: ["0.0","0.0","0.0","0.0","0.0","0.0"],
      hotelId: ["0_1","0_1","0_1","0_1","0_1","0_1"]
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
        const newHData = {...hData}         
        for(let i=0;i<vehicleTireCount;i+=1){
          newVData['vehicleTires'][tireAttr[0]][i] = changedValue
          
          newHData['vehicleTires'][tireAttr[0]][i] = changedValue
          
        }
        setHData(newHData) 
      } else {
        newVData['vehicleTires'][tireAttr[0]][tireAttr[1]] = changedValue
      }
      setVData(newVData)
    }
    else
    {      
      if(changedField === 'regNumber') {
        newVData[changedField] = changedValue.toUpperCase().replace(/[^0-9A-Z]+/gi, "")        
        const newHData = {...hData}
        newHData[changedField] = changedValue.toUpperCase().replace(/[^0-9A-Z]+/gi, "")
        setHData(newHData)          
      } else if(changedField === 'vechicleMilage') {
        newVData[changedField] = changedValue.replace(/[^0-9]+/gi, "")
      } else {
        newVData[changedField] = changedValue
      }
      setVData(newVData)
    }

  }

  function updateHData(changedField, changedValue) {
    const newHData = {...hData}
    if (changedField.indexOf('_') > -1)
    {      
      let tireAttr = changedField.split('_')      
      if(prefill) {
        const newVData = {...vData}
        for(let i=0;i<vehicleTireCount;i+=1){
          newHData['vehicleTires'][tireAttr[0]][i] = changedValue
          if(tireAttr[0] !== 'hotelId') {            
            newVData['vehicleTires'][tireAttr[0]][i] = changedValue              
          }
        }
        setVData(newVData)
      } else {
        newHData['vehicleTires'][tireAttr[0]][tireAttr[1]] = changedValue
      }
      setHData(newHData)
    }
  }
 
  async function handleSubmit(e) {
    e.preventDefault()    
    let vehiclePostData = vData
    let vehicleHotelPostData = hData
    
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
    if(vehicleTireSetsCount === 2) {
      let tireHModelsErrors = false
      hData.vehicleTires.models.forEach((v, i) => {if(i <= hData.vehicle_tire_count-1 && v === "") tireHModelsErrors=true})
      if(tireHModelsErrors) {
        setError("Modelul este obligatoriu pentru toate anvelopele")
        setLoading(false)
        return false
      } 
      
      let tireHDotsErrors = false
      hData.vehicleTires.dots.forEach((v, i) => {if(i <= hData.vehicle_tire_count-1 && v === "") tireHDotsErrors=true})
      if(tireHDotsErrors) {
        setError("DOT este obligatoriu pentru toate anvelopele")
        setLoading(false)
        return false
      }
    }
    
    try {
      setError("")
      setSuccess("")
      setLoading(true)
      const response  = await handleVehicleCreation(vehiclePostData)    
      if(response.status === 201) {
        if(parseInt(vehicleTireSetsCount) === 2) {
          const hotelResponse = await handleHotelVehicleCreation(vehicleHotelPostData)           
          if(hotelResponse.status === 201) {
            history.push(`/dashboard/flota/${fleetId}`)
          }
        } else {
          history.push(`/dashboard/flota/${fleetId}`)  
        }
      }
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
    if(vehicleTireSetsCount === 2) {
      const newHData = {...hData}
      newHData['vehicle_tire_count'] = newTireCount
      setHData(newHData)  
    }
  }
  const handleTiresSetsChange = value => {
    setMultipleTireSets(value)     
    let newSetsCount = value ? value : 1
    setVehicleTireSetsCount(newSetsCount)
  }

  return (!loading ? 
         <Vehicle 
          vData={vData}
          hData={hData}
          error={error}
          success={success}
          loading={loading}
          tireOpts={tireOpts}
          hotelsList={hotelsList}
          handleSubmit={handleSubmit}
          onChange={updateVData}
          onHotelChange={updateHData}
          updatePrefillStatus={updatePrefillStatus}
          handleTiresFilterChange={handleTiresFilterChange}
          vehicleTireCount={vehicleTireCount}
          prefill={prefill}
          tireFilter={tireFilter}
          multipleTireSets={multipleTireSets}
          handleTiresSetsChange={handleTiresSetsChange}
          vehicleTireSetsCount={vehicleTireSetsCount}
          />
          :
          null
        )
}
