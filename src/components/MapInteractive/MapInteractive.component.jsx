import React, {useState, useEffect} from 'react'
import './MapIntereactive.component.scss'
import Map from '../../components/Map/Map.component'
import MapInfo from '../../components/MapInfo/MapInfo.component'
import judete from '../../data/judete.json'

export default function MapInteractive() {

    const [ showInfo, setShowInfo ] = useState(false) // display info
    console.log("ShowInfo",showInfo)
    const [ prefix, serPrefix ] = useState('') // eg: NT, MM, CT
    console.log(prefix)
    const [ title, setTitle ] = useState('') // nume judet
    const [ counter, setCounter ] = useState(4) // Nr de parteneri in judet

    const handleClick = (e) => {
        serPrefix(e.target.getAttribute("data-id"))
        setShowInfo(true)
    }

    let name

    judete.forEach( judet => {
        if(judet.auto === prefix){
            name = judet.nume
        }
    })

    useEffect(() => {
        setTitle(name)
    }, [prefix,name])

    let cardInfo

    if(showInfo){
        cardInfo =
        <MapInfo onClick={handleClick} title={title} counter={counter} showInfo={showInfo} setShowInfo={setShowInfo}/>
    }

    return (
        <div className="map-interactive">
            <Map prefix={prefix} show={showInfo} handleClick={handleClick}/>
            {cardInfo}
            <div className="map-title">
                <p>Acoperire nationala hotelulderoti.ro</p>
            </div>
        </div>
    )
}
