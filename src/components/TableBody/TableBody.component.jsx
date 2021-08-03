import React from 'react'
import './TableBody.component.scss'

export default function TableBody(props) {
    const data = props.data
    return (
        <div className="table-cell">
            <p style={
                data === "In asteptare" ? {backgroundColor:"#E63946", color:"rgb(241, 250, 238)"}
                : data === "Aprobata" ? {backgroundColor:"#FF9E00"}
                : data === "Procesata" ? {backgroundColor:"#06D6A0"}
                : {color:"#1D3557"}
            }>
                {props.data}
            </p>
        </div>
    )
}
