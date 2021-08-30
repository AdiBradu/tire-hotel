import React from 'react'
import './TableTitle.component.scss'
import ActionButton from '../ActionButton/ActionButton.component'
import FilterLogo from '../../assets/filter.png'
import ExportLogo from '../../assets/export.png'
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


export default function TableTitle(props) {
  
  
  return (
    <div className="table-title">
      <h4>{props.text}</h4>
      {props.elementsOnPageCount ? 
        <ActionButton onClick={ () => props.setShowFilters(!props.showFilters)} name={'filtreaza'} icon={FilterLogo} color={'#457B9D'}/> 
      : null}
      {props.getExportData && props.totalItems > 0 ? <ActionButton onClick={props.getExportData} name={'exporta'} icon={ExportLogo} color={'#457B9D'}/> : null}
      {props.dataSet.length !== 0 ? (
        <ExcelFile 
        filename={props.xlsName}
        element={<ActionButton name={'exporta'} icon={ExportLogo} onClick={props.setExportData ? props.setExportData : null} color={'#457B9D'}/>}>
            <ExcelSheet dataSet={props.dataSet} name={props.sheetName}/>
        </ExcelFile>
      ): null}   
    </div>
  )
}
