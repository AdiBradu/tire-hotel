import React, {useState, useEffect} from 'react'
import './MapIntereactive.component.scss'
import Map from '../../components/Map/Map.component'
import MapInfo from '../../components/MapInfo/MapInfo.component'
import judete from '../../data/judete.json'
import api from '../../utils/Api'

export default function MapInteractive() {

    const [ showInfo, setShowInfo ] = useState(false) // display info
    //console.log("ShowInfo",showInfo)
    const [ prefix, serPrefix ] = useState('') // eg: NT, MM, CT
    //console.log(prefix)
    const [ title, setTitle ] = useState('') // nume judet
    const [ counter, setCounter ] = useState(0) // Nr de parteneri in judet
    const [ partners, setPartners ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const handleClick = (e) => {
        serPrefix(e.target.getAttribute("data-id"))
        setShowInfo(true)
    }
  
    const loadHotelsList = async region => {
      try {        
        const response = await api.get(`/hotelTires/getHotelListByRegion`, {params: {hRegion: region}})
        return response;
      } catch (error) {
        return error;
      }   
    }

    let name = 'Bucuresti'

    judete.forEach( judet => {
        if(judet.auto === prefix){
            name = judet.nume
        }
    })

    useEffect(() => {
        setTitle(name)       
        loadHotelsList(name).then(res => {
          setPartners(res.data.hLocations)       
          setCounter(res.data.hCounter)          
          setLoading(false)
        }) 
    }, [prefix,name])

    let cardInfo

    if(showInfo){
        cardInfo =
        <MapInfo onClick={handleClick} title={title} counter={counter} showInfo={showInfo} setShowInfo={setShowInfo} partners={partners} />
    }

    return (!loading &&
        <div className="map-interactive">
            <Map prefix={prefix} show={showInfo} handleClick={handleClick}/>
            {cardInfo}
            <div className="map-title">
                <p>Acoperire nationala hotelulderoti.ro</p>
            </div>
        </div>
    )
}
