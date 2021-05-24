import React, { useState, useEffect } from 'react'
import './Alert.component.scss'

export default function Alert(props) {

  const [showAlert, setShowAlert] = useState(true)
  const [dismissedAlert, setDismissedAlert] = useState(null) 
  const dismissCurrentAlert = () => {
    setShowAlert(false)    
    setDismissedAlert(props.message)
  }

  let alert

  if(showAlert || (dismissedAlert && dismissedAlert !== props.message)){
    alert =  
    <div className="alert-background">
      <div className={props.alertClass}><p>{props.message}</p></div>
      <p onClick={() => dismissCurrentAlert()}>OK</p>
    </div>
  }

  return (
    <div>{alert}</div>
  )
}
