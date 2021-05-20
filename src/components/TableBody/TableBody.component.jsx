import React from 'react'
import './TableBody.component.scss'

export default function TableBody(props) {
    return (
        <div className="table-cell">
            <p>{props.data}</p>
        </div>
    )
}
