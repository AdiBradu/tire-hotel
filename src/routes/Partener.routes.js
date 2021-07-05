import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import ErrrorPage from '../pages/ErrorPage/ErrrorPage.component'
import PrivateRoute from './Private.routes'
import Logout from '../utils/Logout'
import { useAuth } from '../contexts/AuthContext'
import PartnerHomeContainer from '../pages/PartnerHome/PartnerHome.container'
import AddServiceContainer from '../pages/AddService/AddService.container'
import MyAccountPartnerContainer from '../pages/MyAccount/MyAccountPartner.container'
import FisaAutoContainer from '../pages/FisaAuto/FisaAuto.container'
import UpdateKmContainer from '../pages/UpdateKm/UpdateKm.container'
import UpdateTiresContainer from '../pages/UpdateTires/UpdateTires.container'
import AddOtherServicesContainer from '../pages/AddOtherServices/AddOtherServices.container'
import ComenziPartnerContainer from '../pages/Comenzi/ComenziPartner.container'
import ComandaPartnerContainer from '../pages/Comanda/ComandaPartener.container'
import HotelPartnerContainer from '../pages/Hotel/HotelPartner.container'
import CereriPartnerContainer from '../pages/Cereri/CereriPartener.container'

export default function Partener() {
  const { currentUser } = useAuth()
  
  return currentUser.user_type === 4 ? (
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
              component={PartnerHomeContainer}
            />
            <PrivateRoute
              path="/dashboard/adauga/serviciu"
              exact
              component={AddServiceContainer}
            />
            <PrivateRoute
              path="/dashboard/adauga/alte_servicii"
              exact
              component={AddOtherServicesContainer}
            /> 
            <PrivateRoute
              path="/dashboard/fisa_auto"
              exact
              component={FisaAutoContainer}
            />
            <PrivateRoute
              path="/dashboard/update/km"
              exact
              component={UpdateKmContainer}
            />
            <PrivateRoute
              path="/dashboard/update/anvelope"
              exact
              component={UpdateTiresContainer}
            />            
            <PrivateRoute
              path="/dashboard/cont"
              exact
              component={MyAccountPartnerContainer}
            />
            <PrivateRoute
              path="/dashboard/comenzi"
              exact
              component={ComenziPartnerContainer}
            />
            <PrivateRoute
              path="/dashboard/comenzi/detalii/:orderId"
              exact
              component={ComandaPartnerContainer}
            />
            <PrivateRoute
                path="/dashboard/hotel"
                exact 
                component={HotelPartnerContainer}
            /> 
             <PrivateRoute
                path="/dashboard/cereri"
                exact 
                component={CereriPartnerContainer}
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
