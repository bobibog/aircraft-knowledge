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
import Adsb from './containers/Adsb/Adsb';
//import Map from './containers/Map/Map';
import AcarsWithExtData from './containers/AcarsWithExtData/AcarsWithExtData';
import OpenstreetMap from './containers/Map/Openstreet/OpenstreetMap';
import ConfirmEmail from './containers/Auth/ConfirmEmail';
import Parser from './containers/Parser/Parser';
import Decoding from './containers/Parser/ParserFunctions/Decoding/Decoding';
import MessagesNumber from './containers/Statistics/MessagesNumber/MessagesNumber';
import AkrxMessageAll from './containers/AKRxAll/AKRxAll';
import AcarsWithExtDataCompany from './containers/AcarsWithExtDataCompany/AcarsWithExtDataCompany';
import AdsbCompany from './containers/AdsbCompany/AdsbCompany';
import OpenstreetMapCompany from './containers/Map/Openstreet/OpenstreetMapCompany';

function App() {
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;
  let isAuthenticated = authContext.user.token !== null;
  let isRole = authContext.user.role == "Admin" ;
  let isParser = authContext.user.role == "Parser" && authContext.user.token !== null;
  let isCustomer = authContext.user.role == "Customer"&& authContext.user.token !== null;
  let isNotTermed = authContext.user.terms!==1;
  let isAirExplore = authContext.user.company == "AirExplore"&& authContext.user.token !== null; 
  let isFlyAir41 = authContext.user.company == "Fly Air41 Airways"&& authContext.user.token !== null;
  let isCompany = authContext.user.company != null && authContext.user.token !== null;
  

  useEffect(() => {
    authCheckState();
  }, [authCheckState, isAuthenticated]);

  let routes = (
    <Switch>                  
      <Route path="/logout" component={Logout} /> 
      <Route path="/auth" component={Auth} />       
      <Redirect from="/logout" to="/auth" />      
      <Redirect from="/" exact to="/auth" />
      <Route path="/confirmemail" component={ConfirmEmail} />
      <Route render={() => <div><h1>Please Log In</h1><br/><h4>(You cannot access the content because you accidentally logged out)</h4></div>} />
    </Switch>
  );

  if (isAuthenticated && !isCustomer && !isCompany) {
    routes = (
      <Switch> 
        <Route path="/openstreetMap" component={OpenstreetMap} />              
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />        
        <Route path="/airlines" component={Airlines} />
        <Route path="/statistics" component={MessagesNumber} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/auth2" component={Auth2} />
        <Route path="/adsb"  component={Adsb} />
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />  
        <Route path="/akrxAll" component={AkrxMessageAll} />
        <Redirect from="/" exact to="/akrxAll" />
        <Route render={() => <div><h1>Data not found</h1></div>} />
      </Switch>
    );
  }
  
  if (isAuthenticated && !isParser && !isCustomer && !isCompany) {
    routes = (
      <Switch> 
        {/* <Route path="/map" component={Map} />        */}
        <Route path="/openstreetMap" component={OpenstreetMap} />              
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />        
        <Route path="/airlines" component={Airlines} />
        <Route path="/statistics" component={MessagesNumber} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/auth2" component={Auth2} />
        <Route path="/adsb"  component={Adsb} />
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />  
        <Route path="/akrxAll" component={AkrxMessageAll} />
        <Redirect from="/" exact to="/akrxAll" />
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
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMap" component={OpenstreetMap} />
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        <Route path="/akrxAll" component={AkrxMessageAll} />
        <Route path="/adsb"  component={Adsb} />
        <Route path="/airlines" component={Airlines} /> 
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />  
        <Route path="/statistics" component={MessagesNumber} />          
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

  if (isParser && isAuthenticated && !isCompany) {
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMap" component={OpenstreetMap} />
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        <Route path="/akrxAll" component={AkrxMessageAll} />
        <Route path="/adsb"  component={Adsb} />
        <Route path="/airlines" component={Airlines} /> 
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} /> 
        <Route path="/statistics" component={MessagesNumber} />           
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} /> 
        {/* <Route path="/user" component={User} />  
        <Route path="/addUser" component={AddUser} />
        <Route path={"/updateUser/:id"} component={UpdateUser} /> */}
        <Route path="/decoding" component={Decoding} />
        <Route path="/parser" component={Parser} />    
        <Redirect from="/" exact to="/parser" />
        <Route render={() => <div><h1>Data not found</h1></div>} />
      </Switch>
    );
  }
  
  if (isCustomer && isAuthenticated && !isCompany) {
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMapCompany" component={OpenstreetMapCompany} />        
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />       
        <Route path="/akrx" component={AKRx} />
        <Route path="/adsbCompany"  component={AdsbCompany} />       
        {/* <Route path="/acarsWithExtDataCompany"  component={AcarsWithExtDataCompany} />         */}
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />        
        <Redirect from="/" exact to="/akrx" />
        <Route render={() => <div><h1>Data not found</h1></div>} />
      </Switch>
    );
  }

  if (isCompany) {
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        {/* <Route path="/openstreetMapCompany" component={OpenstreetMapCompany} />         */}
        {/* <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />        */}
        <Route path="/akrx" component={AKRx} />
        <Route path="/adsbCompany"  component={AdsbCompany} />        
        <Route path="/acarsWithExtDataCompany"  component={AcarsWithExtDataCompany} />  
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />        
        <Redirect from="/" exact to="/akrx" />
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
