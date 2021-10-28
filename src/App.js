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
import Auth2 from './containers/Auth/Auth2';
import UpdateUser from './containers/Users/UpdateUser/UpdateUser';
//some dummy comment


function App() {
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;
  let isAuthenticated = authContext.user.token !== null;
  let isRole = authContext.user.role == "Admin";
  let isNotTermed = authContext.user.terms!==1;

  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>                  
      <Route path="/logout" component={Logout} /> 
      <Route path="/auth" component={Auth} />       
      <Redirect from="/logout" to="/auth" />      
      <Redirect from="/" exact to="/auth" />
      <Route render={() => <div><h1>Please Log In</h1><br/><h4>(You cannot access the content because you accidentally logged out)</h4></div>} />
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
        <Route path="/airlines" component={Airlines} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/auth2" component={Auth2} />         
        <Route path="/akrx" component={AKRx} />
        <Redirect from="/" exact to="/akrx" />
        <Route render={() => <div><h1>Data not found</h1></div>} />
      </Switch>
    );
  }

  
  
  // if(!isAuthenticated){
  //   routes = (
  //     <Switch>        
  //       <Route path="/auth" component={Auth} />
  //       <Redirect from="/aircraft" to="/auth" />        
  //       <Redirect from="/airports" to="/auth" />                
  //       <Redirect from="/airlines" to="/auth" />                
  //       <Redirect from="/akrx" to="/auth" />
  //       <Redirect from="/" exact to="/auth" />                    
  //     </Switch>
  //   );
  // }  

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
        <Route path={"/updateUser/:id"} component={UpdateUser} />
        <Route path="/administrator" component={Administrator} />    
        <Redirect from="/" exact to="/administrator" />
        <Route render={() => <div><h1>Data not found</h1></div>} />
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
