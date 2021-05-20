import React from 'react'
import './Table.component.scss'
import TableHeader from '../../components/TableHeader/TableHeader.component'
import TableBody from '../../components/TableBody/TableBody.component'
import TableAction from '../TableAction/TableAction.component'
import DeleteIcon from '../../assets/delete.png'
import EditIcon from '../../assets/edit.png'
import { Link } from 'react-router-dom'

export default function Table(props) {
  const iconsList = [DeleteIcon, EditIcon]
  
  return (
    <div className={props.tableMainClass}>
    <div className={`${props.tableSecondaryClass} sticky`}>
      {   
        props.tblHeader.map( (el, index) => 
            <TableHeader key={index} data={el}/>
        )
      }
      </div>
      { props.tblBody.map( (el, index) => 
          <div key={index} className={props.tableSecondaryClass}>
            {props.linkTo ?
              (<Link key={0}  to={`${props.linkTo}/${Object.values(el)[0]}`}>
                <TableBody key={0} data={index+1}/>  
              </Link>)
              :
              <TableBody key={0} data={index+1}/>
            }
            {            
              Object.values(el).map( (subEl, subElIndex) => {
                if(props.renderArr.indexOf(subElIndex) !== -1) {
                  return (props.linkTo ? 
                  <Link key={subElIndex}  to={`${props.linkTo}/${Object.values(el)[0]}`}><TableBody key={subElIndex} data={subEl}/></Link> 
                  :
                  <TableBody key={subElIndex} data={subEl}/>
                  )
                } 
              })
            }
            {props.actionsArr ?
              <div className="table-cell" key={index+"action"}>
                { props.actionsArr.map( (a, i) => 
                  <TableAction icon={iconsList[a.iconIndex]} name={a.name} onClick={a.actionHandler} data={Object.values(el)[0]} key={i} />
                )}
              </div>
              :
              null
            }
          </div>
      )}
    </div>
  )
}
