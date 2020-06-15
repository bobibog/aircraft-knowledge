import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Airlines from './containers/Airlines/Airlines';
import Aircrafts from './containers/Aircrafts/Aircrafts';
import Airports from './containers/Airports/Airports';
import Flights from './containers/Flights/Flights';

function App() {
  return (    
    <div className="App">    
      <Layout>
        <Switch>
          <Route path="/aircrafts" component={Aircrafts} />
          <Route path="/airports" component={Airports} />
          <Route path="/flights" component={Flights} />
          <Route path="/airlines" component={Airlines} />
          <Redirect from="/" exact to="/airlines" />
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
