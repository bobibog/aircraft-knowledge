import React, {useEffect, useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Administrator from './containers/Administrator/Administrator';
import AKRx from './containers/AKRx/AKRx';
import Airlines from './containers/Airlines/Airlines';
import Aircrafts from './containers/Aircrafts/Aircrafts';
import AircraftsSearch from './containers/Aircrafts/AircraftsSearch';
import Airports from './containers/Airports/Airports';
import Flights from './containers/Flights/Flights';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {AuthContext} from './context/auth-context';
import User from './containers/Users/Users';
import AddUser from './containers/Users/AddUser/AddUser';
//some dummy comment


function App() {
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;
  let isAuthenticated = authContext.user.token !== null;
  let isRole = authContext.user.role == "Admin";

  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/aircraft/:id" component={Aircrafts} />
      <Route path="/aircraft" component={AircraftsSearch} />
      <Route path="/airports/:id" component={Airports} />
      <Route path="/airports" component={Airports} />
      <Route path="/flights/:id" component={Flights} />
      {/* <Route path="/flights" component={Flights} /> */}            
      <Route path="/airlines" component={Airlines} />      
      <Route path="/auth" component={Auth} />      
      <Route path="/logout" component={Logout} /> 
      
      {/* <Redirect from="/" exact to="/airlines" /> */}
      <Route path="/akrx" component={AKRx} />
      <Redirect from="/" exact to="/akrx" />
      <Route render={() => <h1>Not found!</h1>} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>        
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        {/* <Route path="/flights" component={Flights} /> */}
        {/* <Route path="/airlines/:iataIcao" component={Aircrafts} /> */}

        {/* <Route path="/administrator" component={Administrator} />                      */}
        <Route path="/airlines" component={Airlines} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/akrx" component={AKRx} />
        <Redirect from="/" exact to="/akrx" />
        <Route render={() => <h1>Not found!</h1>} />
      </Switch>
    );
  }
  if (isRole) {
    routes = (
      <Switch>  
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/akrx" component={AKRx} />
        <Route path="/airlines" component={Airlines} />             
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} /> 
        <Route path="/user" component={User} />   
        <Route path="/addUser" component={AddUser} />
        <Route path="/administrator" component={Administrator} />    
        <Redirect from="/" exact to="/administrator" />
        <Route render={() => <h1>Not found!</h1>} />
      </Switch>
    );
  }
   
  
  
  return (    
    <div className="App">    
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
