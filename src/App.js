import React, {useEffect, useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Airlines from './containers/Airlines/Airlines';
import Aircrafts from './containers/Aircrafts/Aircrafts';
import Airports from './containers/Airports/Airports';
import Flights from './containers/Flights/Flights';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {AuthContext} from './context/auth-context';

function App() {
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;
  let isAuthenticated = authContext.user.token !== null;

  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/aircraft/:id" component={Aircrafts} />
      {/* <Route path="/aircraft" component={Aircrafts} /> */}
      <Route path="/airports/:id" component={Airports} />
      <Route path="/airports" component={Airports} />
      <Route path="/flights/:id" component={Flights} />
      {/* <Route path="/flights" component={Flights} /> */}
      <Route path="/airlines" component={Airlines} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
      <Redirect from="/" exact to="/airlines" />
      <Route render={() => <h1>Not found!</h1>} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/aircraft/:id" component={Aircrafts} />
        {/* <Route path="/aircraft" component={Aircrafts} /> */}
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        {/* <Route path="/flights" component={Flights} /> */}
        {/* <Route path="/airlines/:iataIcao" component={Aircrafts} /> */}
        <Route path="/airlines" component={Airlines} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Redirect from="/" exact to="/airlines" />
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
