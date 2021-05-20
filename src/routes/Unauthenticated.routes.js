import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage.component'
import LoginPage from '../pages/LoginPage/LoginPage.component'

export default function UnauthenticatedRoutes() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route
              path="/"
              exact
              render={
                () => <LandingPage/>
              }
            >
            </Route>
            <Route
              path="/auth"
              exact
              render={
                () => <LoginPage/>
              }
            >
            </Route>
            <Route
              path="*"
            >
              <Redirect to="/" />
            </Route>
            
          </Switch>    
      </div>
    </Router>
  );
}
