import React, { useEffect, useState } from 'react'
import './Filter.component.scss'
import FilterLogo from '../../assets/downArrow.png'

export default function Filter(props) {

    const [active, setActive] = useState(false)
    const [option, setOption] = useState(props.name)

    useEffect(() => {
      let mounted = true
      if(mounted) {        
        if(props.currentFilter !== "" && props.currentFilter !== null && props.currentFilter !== undefined) {
         setOption(props.currentFilter)
        }
      }
      return () => mounted=false
    },[])

    const handleOption = value => () => {
        setOption(value)
        props.onFilterChange(value)
    }

    let options

    if(active){
        options =  
        <div className="filter-options" onClick={ () => setActive(false)}>
            <p className="first"onClick={handleOption("")}>{props.name}</p>
            {
                props.filterInfo.map( el => 
                    <div className="filter-option"  key={Math.random()} data-name={el} onClick={handleOption(el)}>
                        <p>{el}</p>
                    </div>
                )
            }
        </div>
    }

    return (
        <div className="combo-select">
            <div className="filter" onClick={() => setActive(!active)}>
                <div className="filter-header">
                    <div><img src={FilterLogo} alt=""/></div>
                    <p className="selected">{option !== "" & option !== null & option !== undefined ? option : props.name}</p>
                </div>
            </div>
            {options}
        </div>
    )
}
