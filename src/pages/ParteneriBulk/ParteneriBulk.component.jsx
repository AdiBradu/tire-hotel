import React from 'react'
import './ParteneriBulk.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import DragDrop from '../../components/DragDrop/DragDrop.component'


export default function ParteneriBulk(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Adauga parteneri" />  
        <DragDrop handleFileUpload={props.handleFileUpload} />
      </div>
    </div>
  )
}