import React, { useRef, useEffect } from 'react'
import './SearchAuto.component.scss'

export default function SearchAuto(props) {
  const searchInput = useRef(null)
  const handleClickEvent = () => {    
    props.searchHandler(searchInput.current.value)
  }
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {        
        event.preventDefault()
        props.searchHandler(searchInput.current.value)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div className="search-auto"> 
      <input type="search" ref={searchInput} placeholder="B123WTS"/>
      <button type="button" onClick={handleClickEvent}><p>cauta</p></button>
    </div>
  )
}
