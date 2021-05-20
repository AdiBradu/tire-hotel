import React, { useState } from 'react'
import './SelectBox.component.scss'
import pozitionare from '../../data/pozitionare.json'

export default function SelectBox(props) {

    const [active, setActive] = useState(false)
    const [option, setOption] = useState('Alege')

    const handleOption = value => () => {
        setOption(value)
    }

    let options

    if(active){
        options =  
        <div className="options" onClick={ () => setActive(false)} style={{ backgroundColor: props.inputBackground, color: props.color}}>
            {
                pozitionare.map( el => 
                    <div className="option"  key={Math.random()} data-name={el.pozitie} onClick={handleOption(el.pozitie)}>
                        <p>{el.pozitie}</p>
                    </div>
                )
            }
        </div>
    }
    return (
        <div className="select-container">
            <label>{props.name}</label>
            <div className="select-box" style={{ backgroundColor: props.inputBackground, color: props.color}}>
                <div className="selected" onClick={() => setActive(!active)}>{option}</div>
                {options}
            </div>
        </div>
    )
}
