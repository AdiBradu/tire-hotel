import React, {useState} from 'react'
import './Alert.component.scss'

export default function Alert(props) {

  const [showlert, setShowAlert] = useState(true)

  let alert

  if(showlert){
    alert =  
    <div className="alert-background">
      <div className={props.alertClass}><p>{props.message}</p></div>
      <p onClick={() => setShowAlert(!showlert)}>OK</p>
    </div>
  }

  return (
    <div>{alert}</div>
  )
}
