import React from 'react'
import './AddSection.component.scss'
import AddButton from '../../components/PrimaryButton/PrimaryButton.component'
import AddLogo from '../../assets/add.png'
import { Link } from 'react-router-dom'

export default function AddSection(props) {
    return (
        <div className="add-section">
            <Link to={`/dashboard/flote/adauga/vehicul/${props.fleetId}`}>
              <AddButton text={'adauga vehicul'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
            </Link>
            <Link to={`/dashboard/flote/adauga/bulk/${props.fleetId}`}>
              <AddButton text={'bulk import'} bgcolor={'#06D6A0'} color={'#1D3557'} weight={'600'} img={AddLogo}/>
            </Link>
        </div>
    )
}
