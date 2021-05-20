import React, { useRef } from 'react'
import './SearchAuto.component.scss'

export default function SearchAuto(props) {
  const searchInput = useRef(null)
  const handleClickEvent = () => {    
    props.searchHandler(searchInput.current.value)
  }
  return (
    <div className="search-auto"> 
      <input type="search" ref={searchInput} placeholder="B123WTS"/>
      <button type="button" onClick={handleClickEvent}><p>cauta</p></button>
    </div>
  )
}
