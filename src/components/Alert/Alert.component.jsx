import React from 'react'
import './Alert.component.scss'

export default function Alert(props) {
    return (
      <div className={props.alertClass}><p>{props.message}</p></div>
    )
}
