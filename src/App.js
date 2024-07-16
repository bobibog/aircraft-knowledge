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
import AKRxAll from './containers/AKRxAll/AKRxAll';

function App() {

  //////////////////////////////
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;//
  let isAuthenticated = authContext.user.token !== null;//uvek false na pocetku ali je authContext deo stanja App iako nije state vec globalni sto znaci bilo koja promena iz njega utice na rerender App
  //////////////////////////////

  console.log("IS AUTHENTICATED: "+isAuthenticated)//na pocetku je false a menja se iz authCheckState koji je i u App i u NavigationItems!
  
  let isRole = authContext.user.role == "Admin" ;
  let isParser = authContext.user.role == "Parser" ;
  let isCustomer = authContext.user.role == "Customer";
  let isNotTermed = authContext.user.terms!==1;
  let isAirExplore = authContext.user.company == "AirExplore"&& authContext.user.token !== null; 
  let isFlyAir41 = authContext.user.company == "Fly Air41 Airways"&& authContext.user.token !== null;
  let isCompany = authContext.user.company != null ;
  //dummy comment to trigger commit
  

  useEffect(() => {
    authCheckState();//kljucno za automatski login sa postojecim tokenom
  }, [authCheckState, isAuthenticated]);


  //defaultni bezuslovni
  let routes = (
    
    //MATCHOVANJE U SWITCH URLA SA ROUTE ILI REDIRECT KRECE TEK KADA SE MOUNTUJE APP
    //kada se mountuje App pokrenuce iz useEffect authCheckState koji je kesiran po referenci za proveru tokena i takodje ce krenuti za renderovanjem u child matchovane komponente iz switch sa trenutnim url na kom je App a to ce biti Auth u da1
    <Switch>    
      
      {console.log("da0")}                    
      {/*Swtichevi koji nam trebaju se aktiviraju da1 i da5 a za da5 ako smo ulogovani prethodno odnosno postoje autentifikacijski podaci u localStorage*/}
      {/*u nasem slucaju ovaj switch se ne renderuje a u slucaju da imamo ispod samo Switcheve if(isAuthenticated) i if(!isAuthenticated) onda je ovaj beskoristan*/}

      <Route path="/logout" component={Logout} /> 
      <Route path="/auth" component={Auth} />       
      <Redirect from="/logout" to="/auth" />      
      <Redirect from="/" exact to="/auth" />
      <Route path="/confirmemail" component={ConfirmEmail} />

      <Route render={() => <div><h1>Please Log In</h1><br/><h4>(You cannot access the content because you accidentally logged out)</h4></div>} />
    </Switch>
  );

  // if (isAuthenticated && !isCustomer && !isCompany) {
  //   routes = (
  //     <Switch> 
  //       <Route path="/openstreetMap" component={OpenstreetMap} />              
  //       <Route path="/aircraft/:id" component={Aircrafts} />
  //       <Route path="/aircraft" component={AircraftsSearch} />
  //       <Route path="/airports/:id" component={Airports} />
  //       <Route path="/airports" component={Airports} />
  //       <Route path="/flights/:id" component={Flights} />        
  //       <Route path="/airlines" component={Airlines} />
  //       <Route path="/statistics" component={MessagesNumber} />
  //       <Route path="/logout" component={Logout} />
  //       <Route path="/auth" component={Auth} />
  //       <Route path="/auth2" component={Auth2} />
  //       <Route path="/adsb"  component={Adsb} />
  //       <Route path="/acarsWithExtData"  component={AcarsWithExtData} />  
  //       <Route path="/akrxAll" component={AkrxMessageAll} />
  //       <Redirect from="/" exact to="/akrxAll" />
  //       <Route render={() => <div><h1>Data not found</h1></div>} />
  //     </Switch>
  //   );
  // }
  
  // if (isAuthenticated && !isParser && !isCustomer && !isCompany) {
  //   routes = (
  //     <Switch> 
  //       {/* <Route path="/map" component={Map} />        */}
  //       <Route path="/openstreetMap" component={OpenstreetMap} />              
  //       <Route path="/aircraft/:id" component={Aircrafts} />
  //       <Route path="/aircraft" component={AircraftsSearch} />
  //       <Route path="/airports/:id" component={Airports} />
  //       <Route path="/airports" component={Airports} />
  //       <Route path="/flights/:id" component={Flights} />        
  //       <Route path="/airlines" component={Airlines} />
  //       <Route path="/statistics" component={MessagesNumber} />
  //       <Route path="/logout" component={Logout} />
  //       <Route path="/auth" component={Auth} />
  //       <Route path="/auth2" component={Auth2} />
  //       <Route path="/adsb"  component={Adsb} />
  //       <Route path="/acarsWithExtData"  component={AcarsWithExtData} />  
  //       <Route path="/akrxAll" component={AkrxMessageAll} />
  //       <Redirect from="/" exact to="/akrxAll" />
  //       <Route render={() => <div><h1>Data not found</h1></div>} />
  //     </Switch>
  //   );
  // }

  
  //ulazi
  //OVO JE GLAVNI DEO JER CE BITI isAuthenticated==false IAKO POSTOJE PODACI U LOCALSTORAGE
  //authCheckState za ucitavanje podataka iz localstorage se zove iz App i NavigationItems
  //da1 je zapravo defaultni samo za neuatentifikovanog(koji nikada ne moze biti autentifikovan odnosno anonimnog) a da5 za neautentifikovanog sa mogucnoscu autentifikacije

  if(!isAuthenticated){//iako postoji token u browseru, jos uvek nije isAuthenticated==true!
    console.log("da1")
    routes = (
      <Switch>

        {/*2. vraca se Auth.js za prethodni Redirect jer je isti match putanja iz redirect to i path u ovoj Route i Auth krece da se renderuje u App za login, a za to vreme se izvrsava authCheckState*/}
        <Route path="/auth" component={Auth} />

        {/*u Redirect to se stavlja url za Route koji vraca component*/}
        {/*Route je 1:1 a Redirect N:1*/}
        {/*switch se aktivira samo jednom za prvi koji se naidje ili default na kraju*/}
        <Redirect from="/aircraft" to="/auth" />        
        <Redirect from="/airports" to="/auth" />                
        <Redirect from="/airlines" to="/auth" />                
        <Redirect from="/akrx" to="/auth" />
        
        <Redirect from="/" exact to="/auth" />{/*1. aktivira se ovaj Redirect pri startovanju fronta automatski za isAuthenticated==false sto ce uvek biti na pocetku i na toj smo / ruti a ucitan je prethodno Route sa kojim se matchuje*/}
                                              {/*ako je isAuthenticated==true onda da5 a ako je isAuthenticated==false onda da1*/}

        {/*ne postoji default sto znaci da se nista nece ni aktivirati(renderovati)*/}
      </Switch>
    );
  }  

  if (isRole && isAuthenticated) {
    console.log("da2")
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMap" component={OpenstreetMap} />
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        <Route path="/akrxAll" component={AkrxMessageAll} />{/*--*/}
        <Route path="/adsb"  component={Adsb} />
        <Route path="/airlines" component={Airlines} /> 
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />{/*--*/}  
        <Route path="/statistics" component={MessagesNumber} />          
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} /> 
        <Route path="/user" component={User} />  
        <Route path="/addUser" component={AddUser} />
        <Route path={"/updateUser/:id"} component={UpdateUser} />
        <Route path="/administrator" component={Administrator} />    
        <Redirect from="/" exact to="/administrator" />
        <Route render={() => <div><h1>Data not found administrator</h1></div>} />
      </Switch>
    );
  }

  if (isParser && isAuthenticated) {
    console.log("da3")
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMap" component={OpenstreetMap} />
        <Route path="/aircraft/:id" component={Aircrafts} />
        <Route path="/aircraft" component={AircraftsSearch} />
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />
        <Route path="/flights/:id" component={Flights} />
        <Route path="/akrxAll" component={AkrxMessageAll} />{/*--*/}
        <Route path="/adsb"  component={Adsb} />
        <Route path="/airlines" component={Airlines} /> 
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />{/*--*/} 
        <Route path="/statistics" component={MessagesNumber} />           
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} /> 
        {/* <Route path="/user" component={User} />  
        <Route path="/addUser" component={AddUser} />
        <Route path={"/updateUser/:id"} component={UpdateUser} /> */}
        <Route path="/decoding" component={Decoding} />
        <Route path="/parser" component={Parser} />    
        <Redirect from="/" exact to="/parser" />
        <Route render={() => <div><h1>Data not found parser</h1></div>} />
      </Switch>
    );
  }
  
  if (isCustomer && isAuthenticated && !isCompany && !isParser && !isRole) {
    console.log("da4")
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        <Route path="/openstreetMapCompany" component={OpenstreetMapCompany} />        
        <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />       
        <Route path="/akrx" component={AKRx} />{/*--*/}
        <Route path="/adsbCompany"  component={AdsbCompany} />       
        {/* <Route path="/acarsWithExtDataCompany"  component={AcarsWithExtDataCompany} />         */}
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />        
        <Redirect from="/" exact to="/akrx" />
        <Route render={() => <div><h1>Data not found customer</h1></div>} />
      </Switch>
    );
  }

  //i container i tabela su wrapperi odnosno apstrakcije odnosno apstrakcija u apstrakciji

  //ACARS raw
  //container
  //VS_Workspace\aircraftknowled3\aircraft-knowledge\src\containers\AKRx
  //tabela
  //VS_Workspace\aircraftknowled3\aircraft-knowledge\src\components\UI\Table\ReactTable\TableAKRx

  //ACARS per Aircraft  
  //containter
  //VS_Workspace\aircraftknowled3\aircraft-knowledge\src\containers\AcarsWithExtDataCompany
  //tabela
  //VS_Workspace\aircraftknowled3\aircraft-knowledge\src\components\UI\Table\ReactTable\TableAcarsWithExtData



  //ulazi
  //isCompany je neophodan za logovanje odnosno potreban kao deo autentifikacije u localStorage
  {/*u ovom trenutku se ucitao token odnosno autentifikovani smo i bicemo na auth2 za koju ne postoji match Route tako da se nista nece renderovati*/}
  if (isCompany && isAuthenticated && !isRole && !isParser) {
    console.log("da5");{/*--*/}
    routes = (
      <Switch>  
        {/* <Route path="/map" component={Map} /> */}
        {/* <Route path="/openstreetMapCompany" component={OpenstreetMapCompany} />         */}
        {/* <Route path="/airports/:id" component={Airports} />
        <Route path="/airports" component={Airports} />        */}

                
        <Route path="/akrxAll" component={AKRxAll} />{/*<Route path="/akrx" component={AKRx} />*/}
        <Route path="/adsbCompany"  component={AdsbCompany} />        
        <Route path="/acarsWithExtData"  component={AcarsWithExtData} />{/*<Route path="/acarsWithExtDataCompany"  component={AcarsWithExtDataCompany} />*/}
        
        <Route path="/auth" component={Auth} />

        <Route path="/logout" component={Logout} />
                
        <Redirect from="/" exact to="/akrxAll" />{/*<Redirect from="/" exact to="/akrxAll" odnosno vraca nas na akrxAll Route u ovom Switch koji je prethodno definisan/>*/}
        
        
          {/*pri defaultnom renderu vratice se return anonimne komponente*/}
          {/*mora se aktivirati ako se ni jedan Route ili Redirect prethodno ne aktivira a to ce biti za nepostojecu rutu odnosno u nasem slucaju kada se desi rerender App zbog promene isAutenticated==true pa rerender Auth pa redirect ka auth2 iz Auth*/} 
        <Route render={() => <div><h1>Data not found</h1></div>} />{/*slalo se company=Aviolog i znalo se unapred da nece vratiti nista u response cim je ovde definisano "Data not..." a bez company oce*/}
      </Switch>
    );
  }
  
  
  return (    
    <div className="App">    
      <Layout>
        {routes}{/*koji god da se poslednji Switch sacuva renderovace se ovde,a onda se vrsi matchovanje trenutnog url sa rutom i prvi Route ili Redirect iz tog Switch koji ima match, njegova komponenta ce se renderovati ovde*/}
      </Layout>
    </div>
  );
}

export default App;
