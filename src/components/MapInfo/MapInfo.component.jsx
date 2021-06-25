import React, {useState, fragment} from 'react'
import './MapInfo.component.scss'

export default function MapInfo(props) {

    const parteneri = [
        { "nume": "Dinamic 92" },
        { "nume": "Unix Tire" },
        { "nume": "Auto Moldova" },
        { "nume": "Dinamic 92" },
        { "nume": "Unix Tire" },
        { "nume": "Auto Moldova" },
        { "nume": "Unix Tire" },
        { "nume": "Auto Moldova" },
        { "nume": "Dinamic 92" },
        { "nume": "Unix Tire" },
        { "nume": "Auto Moldova" },
    ] 

    const [ showCard, setShowCard ] = useState(props.showInfo)

    console.log("Showcard",showCard)

    const handleCard = () => {
        setShowCard(false)
        props.setShowInfo(false)
    }

    let card

    if(showCard){
        card =
        <div className="map-content" onClick={handleCard}>
            <div className="card-header">
                <h4>{props.title}</h4>
                <h1>{props.counter}</h1>
            </div>
            <div className="card-body" >
                <p>Locatii hoteluri:</p>
                {parteneri.map( partener => 
                    <p>{partener.nume}</p>
                )}
            </div>
        </div>
    }
    
    return (
        <fragment>
            {card}
        </fragment>
    )
}