import React from 'react'
import './TableAction.componet.scss'

export default function TableAction(props) {
    return (
        <div className="table-action">
            <img src={props.icon} alt={props.name} data={props.data} onClick={props.onClick ?  props.onClick  : (e) => {}} />
        </div>
    )
}
