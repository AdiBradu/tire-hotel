import React, { useState } from 'react'
import './MapInfo.component.scss'

export default function MapInfo(props) {

    const parteneri = props.partners    
    const [ showCard, setShowCard ] = useState(props.showInfo)

    //console.log("Showcard",showCard)

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
                {parteneri.map( (partener, index) => 
                    <p key={index}>{partener.nume}</p>
                )}
            </div>          
        </div>
    }
    
    return (
        <>
            {card}
        </>
    )
}