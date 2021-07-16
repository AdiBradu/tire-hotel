import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import ErrrorPage from '../pages/ErrorPage/ErrrorPage.component'
import PrivateRoute from './Private.routes'
import Dashboard from '../pages/Dashboard/Dashboard.component'
import Home from '../pages/Home/Home.component'
import MyAccountContainer from '../pages/MyAccount/MyAccount.container'
import Logout from '../utils/Logout'
import { useAuth } from '../contexts/AuthContext'
import AddFleetContainer from '../pages/AddFleet/AddFleet.container'
import VehicleContainer from '../pages/Vehicle/Vehicle.container'
import FloteContainer from '../pages/Flote/Flote.container'
import FleetContainer from '../pages/Fleet/Fleet.container'
import VehicleEditContainer from '../pages/VehicleEdit/VehicleEdit.container'
import ParteneriContainer from '../pages/Parteneri/Parteneri.container'
import AddPartnerContainer from '../pages/AddPartner/AddPartner.container'
import PartenerContainer from '../pages/Partener/Partener.container'
import AnvelopeContainer from '../pages/Anvelope/Anvelope.container'
import TiresContainer from '../pages/Tires/Tires.container'
import VehicleBulkContainer from '../pages/VehicleBulk/VehicleBulk.container'
import ParteneriBulkContainer from '../pages/ParteneriBulk/ParteneriBulk.container'
import ComenziAgentContainer from '../pages/Comenzi/ComenziAgent.container'
import ComandaAgentContainer from '../pages/Comanda/ComandaAgent.container'
import AgentiContainer from '../pages/Agenti/Agenti.container'
import AddAgentContainer from '../pages/AddAgent/AddAgent.container'
import AgentContainer from '../pages/Agent/Agent.container'
import FleetEditContainer from '../pages/FleetEdit/FleetEdit.container'
import VehicleDetailsContainer from '../pages/VehicleDetails/VehicleDetails.container'
import HotelAdminContainer from '../pages/Hotel/HotelAdmin.container'
import CereriContainer from '../pages/Cereri/Cereri.container'
import CerereContainer from '../pages/Cerere/Cerere.container'
import ManageriHotelContainer from '../pages/ManageriHotel/ManageriHotel.container'
import AddManagerContainer from '../pages/AddManager/AddManager.container'
import ManagerHotelContainer from '../pages/ManagerHotel/ManagerHotel.container'
import ServiciiContainer from '../pages/Servicii/Servicii.container'
import AddServiciuContainer from '../pages/AddServiciu/AddServiciu.container'
import ServiciuContainer from '../pages/Serviciu/Serviciu.container'

export default function Admin() {
  const { currentUser } = useAuth()
  
  return currentUser.user_type === 1 ? (
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
              path="/dashboard/agenti"
              exact
              component={AgentiContainer}
            />
            <PrivateRoute
              path="/dashboard/agenti/adauga"
              exact
              component={AddAgentContainer}
            />
            <PrivateRoute
              path="/dashboard/agent/:aId"
              exact
              component={AgentContainer}
            />
            <PrivateRoute
              path="/dashboard/manageriHotel"
              exact
              component={ManageriHotelContainer}
            />
            <PrivateRoute
              path="/dashboard/manageriHotel/adauga"
              exact
              component={AddManagerContainer}
            />
            <PrivateRoute
              path="/dashboard/managerHotel/:mId"
              exact
              component={ManagerHotelContainer}
            />
            <PrivateRoute
                path="/dashboard/flote"
                exact
            >
              <FloteContainer />
            </PrivateRoute>
            <PrivateRoute
                path="/dashboard/flota/:fleetId"
                exact
                component={FleetContainer}
            />
            <PrivateRoute
                path="/dashboard/editeaza/flota/:fId"
                exact
                component={FleetEditContainer}
            />
            <PrivateRoute
              path="/dashboard/flote/adauga"
              exact
            >
              <AddFleetContainer />
            </PrivateRoute>
            
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
              path="/dashboard/parteneri"
              exact
              component={ParteneriContainer}
            />
            
            <PrivateRoute
              path="/dashboard/parteneri/adauga"
              exact
              component={AddPartnerContainer}
            />
            <PrivateRoute
              path="/dashboard/parteneri/bulk"
              exact
              component={ParteneriBulkContainer}
            />

            <PrivateRoute
              path="/dashboard/partener/:pId"
              exact
              component={PartenerContainer}
            />
            <PrivateRoute
              path="/dashboard/comenzi"
              exact
              component={ComenziAgentContainer}
            />
            <PrivateRoute
              path="/dashboard/comenzi/detalii/:orderId"
              exact
              component={ComandaAgentContainer}
            />
            <PrivateRoute
              path="/dashboard/anvelope"
              exact
              component={AnvelopeContainer}
            /> 
            <PrivateRoute
              path="/dashboard/flote/anvelope/:fId"
              exact
              component={TiresContainer}
            /> 
            <PrivateRoute
              path="/dashboard/fisa_auto/:vId"
              exact
              component={VehicleDetailsContainer}
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
              path="/dashboard/servicii"
              exact
              component={ServiciiContainer}
            />
            <PrivateRoute
              path="/dashboard/servicii/adauga"
              exact
              component={AddServiciuContainer}
            />
            
            <PrivateRoute
              path="/dashboard/serviciu/:sId"
              exact
              component={ServiciuContainer}
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
