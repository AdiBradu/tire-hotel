import React from 'react'
import './TableHeader.component.scss'

export default function TableHeader(props) {
    return (
        <div className="table-cell">
            <h4>{props.data}</h4>
        </div>
    )
}
