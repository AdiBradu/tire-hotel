import React, { useState }  from 'react'
import './InputGroup.component.scss'
import PrimaryButton from '../PrimaryButton/PrimaryButton.component'
import InputField from '../../components/InputField/InputField.component'
import Alert from '../../components/Alert/Alert.component'
import { useAuth } from '../../contexts/AuthContext'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

export default function InputGroup(props) {
  
  const [fData, setFData] = useState({
    username: '',
    password: ''
  })
  const { login, currentUser, setLoggedUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation();

  function updateFData(changedField, changedValue){
    const newFData = {...fData}
    newFData[changedField] = changedValue
    setFData(newFData)
  } 

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      
      const response = await login(fData.username, fData.password)
      setLoggedUser(response.data)       
      const { from } = location.state || { from: { pathname: "/dashboard" } };
      history.replace(from);
  
    } catch(error) {      
      if(error?.response?.data?.status < 500) {
        if(error?.response?.data?.status === 400) {
          setError(error?.response?.data?.errors[0].msg)
        } else {
          setError(error?.response?.data?.message)
        }
      } else {
        setError("Autentificare esuata")
      }
      setLoading(false)
    }
  }
  
  return !currentUser ? (
    <form className="login-input" onSubmit={handleSubmit}>
      {error && <Alert alertClass="alert-error" message={error} /> }  
      <InputField name="username" type="email" label="username" onChange={updateFData} color={'#1D3557'} inputBackground={'rgba(241, 250, 238, 0.8)'} labelColor={'rgba(241, 250, 238, 0.8)'}/>
      <InputField name="password" type="password" label="password" onChange={updateFData} color={'#1D3557'} inputBackground={'rgba(241, 250, 238, 0.8)'} labelColor={'rgba(241, 250, 238, 1)'}/>
      <PrimaryButton btnType={'submit'} btnDisabled={loading} text={'login'} bgcolor={'#1D3557'} color={'#F1FAEE'}/>
    </form>
  ) 
  :
  <Redirect to="/dashboard" />
}
