import React from 'react'
import './AddManager.component.scss'
import '../Dashboard/Dashboard.component'
import SectionTitle from '../../components/SectionTitle/SectionTitle.component'
import Navigation from '../../components/Navigation/Navigation.component'
import UserDetails from '../../components/UserDetails/UserDetails.component'
import SaveButton from '../../components/PrimaryButton/PrimaryButton.component'
import Alert from '../../components/Alert/Alert.component'

export default function AddManager(props) {
  
  return (
    <div className="dashboard">
      <Navigation/>
      <div className="workspace">
        <SectionTitle text="Adauga manager hotel" />
        <form className="user-details" onSubmit={props.handleSubmit}>
          {props.error && <Alert alertClass="alert-error" message={props.error} /> }  
          {props.success && <Alert alertClass="alert-success" message={props.success} /> }  
          <div className="manager-dets">
            <UserDetails onChange={props.onChange} uDets={props.mData} />
          </div>
          <SaveButton btnType={'submit'} btnDisabled={props.loading} text={'save'} bgcolor={'#06D6A0'} color={'#1D3557'}/>
        </form>
      </div>
    </div>
  )
}