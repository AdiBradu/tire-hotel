import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import ErrrorPage from '../pages/ErrorPage/ErrrorPage.component'
import PrivateRoute from './Private.routes'
import Dashboard from '../pages/Dashboard/Dashboard.component'
import Home from '../pages/Home/Home.component'
import MyAccountContainer from '../pages/MyAccount/MyAccount.container'
import Logout from '../utils/Logout'
import { useAuth } from '../contexts/AuthContext'
import HotelFleetsContainer from '../pages/HotelFleets/HotelFleets.container'
import HotelFleetContainer from '../pages/HotelFleet/HotelFleet.container'
import HotelVehicleContainer from '../pages/HotelVehicle/HotelVehicle.container'
import HotelVehicleBulkContainer from '../pages/HotelVehicleBulk/HotelVehicleBulk.container'
import HotelVehicleEditContainer from '../pages/HotelVehicleEdit/HotelVehicleEdit.container'
import HotelAdminContainer from '../pages/Hotel/HotelAdmin.container'
import CereriContainer from '../pages/Cereri/Cereri.container'
import CerereContainer from '../pages/Cerere/Cerere.container'

export default function HotelManager() {
  const { currentUser } = useAuth()
  
  return currentUser.user_type === 5 ? (
    <Router>
      <div className="App">
          <Switch>
            <PrivateRoute
              exact
              path="/"              
            >
              <Redirect to="/dashboard" />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/auth"              
            >
              <Redirect to="/dashboard" />
            </PrivateRoute>
            <PrivateRoute
              path="/logout"
              exact
              component={Logout}
            />
            <PrivateRoute
              path="/dashboard"
              exact
              component={Home}
            />
         
            <PrivateRoute
              path="/dashboard/home"
              exact
              component={Dashboard}
            />
            <PrivateRoute
              path="/dashboard/cont"
              exact
              component={MyAccountContainer}
            />
            <PrivateRoute
                path="/dashboard/flote"
                exact 
                component={HotelFleetsContainer}
            />   
            <PrivateRoute
                path="/dashboard/flota/:fleetId"
                exact 
                component={HotelFleetContainer}
            />  
            <PrivateRoute
              path="/dashboard/flote/adauga/vehicul/:fleetId"
              exact
              component={HotelVehicleContainer}
            />
            <PrivateRoute
              path="/dashboard/flote/editeaza/vehicul/:vId"
              exact
              component={HotelVehicleEditContainer}
            />              
            <PrivateRoute
              path="/dashboard/flote/adauga/bulk/:fleetId"
              exact
              component={HotelVehicleBulkContainer}
            />       
            <PrivateRoute
                path="/dashboard/hotel"
                exact 
                component={HotelAdminContainer}
            />      
            <PrivateRoute
                path="/dashboard/cereri"
                exact 
                component={CereriContainer}
            /> 
            <PrivateRoute
                path="/dashboard/cerere/:rId"
                exact 
                component={CerereContainer}
            />
            <PrivateRoute
              path="*"
              component={ErrrorPage}
             />
          </Switch>    
      </div>
    </Router>
  )
  :
  <Redirect to="/" />
}