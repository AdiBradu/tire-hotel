import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import ErrrorPage from '../pages/ErrorPage/ErrrorPage.component'
import PrivateRoute from './Private.routes'
import Dashboard from '../pages/Dashboard/Dashboard.component'
import Home from '../pages/Home/Home.component'
import FlotaContainer from '../pages/Flota/Flota.container'
import Logout from '../utils/Logout'
import { useAuth } from '../contexts/AuthContext'
import VehicleEditContainer from '../pages/VehicleEdit/VehicleEdit.container'
import VehicleContainer from '../pages/Vehicle/Vehicle.container'
import TiresContainer from '../pages/Tires/Tires.container'
import MyAccountFleetContainer from '../pages/MyAccount/MyAccountFleet.container'
import VehicleBulkContainer from '../pages/VehicleBulk/VehicleBulk.container'
import ComenziFlotaContainer from '../pages/Comenzi/ComenziFlota.container'
import ComandaFlotaContainer from '../pages/Comanda/ComandaFlota.container'

export default function Flota() {
  
  const { currentUser } = useAuth()
  
  return currentUser.user_type === 3 ? (
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
              component={MyAccountFleetContainer}
            />
            <PrivateRoute
              path="/dashboard/flota"
              exact
              component={FlotaContainer}
            />
            <PrivateRoute
              path="/dashboard/flote/adauga/vehicul/:fleetId"
              exact
              component={VehicleContainer}
            />
            <PrivateRoute
              path="/dashboard/flote/editeaza/vehicul/:vId"
              exact
              component={VehicleEditContainer}
            /> 
            <PrivateRoute
              path="/dashboard/flote/adauga/bulk/:fleetId"
              exact
              component={VehicleBulkContainer}
            /> 
            <PrivateRoute
              path="/dashboard/comenzi"
              exact
              component={ComenziFlotaContainer}
            />
            <PrivateRoute
              path="/dashboard/comenzi/detalii/:orderId"
              exact
              component={ComandaFlotaContainer}
            />
            <PrivateRoute
              path="/dashboard/anvelope"
              exact
              component={TiresContainer}
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
