import React, { useEffect, useState } from 'react'
import './FilterRadio.component.scss'

export default function FilterRadio(props) {

  const [active, setActive] = useState(false)    

  useEffect(() => {
    let mounted = true
    if(mounted) {
      if(props.currentFilter === props.name) {
        setActive(true)
      } else {
        setActive(false)  
      }
    }
    return () => mounted=false
  },[])

  const handleOption = value => {
    if(props.currentFilter === props.name) {
      props.onFilterChange("")
    } else {
      props.onFilterChange(value)
    }
    setActive(!active)
  }
  
  return (
    <div className="combo-select" onClick={() => handleOption(props.name)}>
      <div className={props.currentFilter === props.name ? `filter filter-selected` : `filter`} >
        <div className="filter-header">                    
          <p className="selected" >{props.name}</p>
        </div>
      </div>
    </div>
  )
}