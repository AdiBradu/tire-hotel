import React from 'react'
import './TableHeader.component.scss'

export default function TableHeader(props) {
    return (
        <div className="table-cell">
            <p style={{fontWeight: 600}}>{props.data}</p>
        </div>
    )
}
