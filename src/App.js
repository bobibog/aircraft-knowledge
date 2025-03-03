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
import DeleteUser from './containers/Users/DeleteUser/DeleteUser';
import Adsb from './containers/Adsb/Adsb';
//import Map from './containers/Map/Map';
import AcarsWithExtData from './containers/AcarsWithExtData/AcarsWithExtData';
import OpenstreetMap from './containers/Map/Openstreet/OpenstreetMap';
import ConfirmEmail from './containers/Auth/ConfirmEmail';
import Parser from './containers/Parser/Parser';
import Decoding from './containers/Parser/ParserFunctions/Decoding/Decoding';
import MessagesNumber from './containers/Statistics/MessagesNumber/MessagesNumber';
// import AddStation from './containers/Statistics/AddStation/AddStation';
import AddStationFormik from './containers/Statistics/AddStation/AddStationFormik';
import StationDetails from './containers/Statistics/StationDetails/StationDetails';
// import UpdateStation from './containers/Statistics/UpdateStation/UpdateStation';
import UpdateStationFormik from './containers/Statistics/UpdateStation/UpdateStationFormik';
import AkrxMessageAll from './containers/AKRxAll/AKRxAll';
import AcarsWithExtDataCompany from './containers/AcarsWithExtDataCompany/AcarsWithExtDataCompany';
import AdsbCompany from './containers/AdsbCompany/AdsbCompany';
import OpenstreetMapCompany from './containers/Map/Openstreet/OpenstreetMapCompany';
import AKRxAll from './containers/AKRxAll/AKRxAll';

import instance from './axios-azure'//

function App() {

  
  const authContext = useContext(AuthContext);
  const authCheckState = authContext.authenticationCheckState;//!
  
  const authRedirectPath = authContext.authRedirectPath;//
  const authShouldLogout = authContext.authShouldLogout//
  

  let isAuthenticated = authContext.user.token !== null;//uvek false na pocetku odnosno izlogovani(iako postoji u localStorage) ali je authContext deo stanja App iako nije state vec globalni sto znaci bilo koja promena iz njega utice na rerender App
  

  //console.log("IS AUTHENTICATED: "+isAuthenticated)//na pocetku je isAuthenticated==false a user(authUser) se menja iz authCheckState ako postoji token odnosno iz authSuccess se inicijalnom useru(authUser) dodeljuju parametri iz localStorage browsera
                                                   //authCheckState se zove iz App i u NavigationItems! 
  
  let isRole = authContext.user.role == "Admin" ;
  let isParser = authContext.user.role == "Parser" ;
  let isCustomer = authContext.user.role == "Customer";
  let isNotTermed = authContext.user.terms!==1;
  let isAirExplore = authContext.user.company == "AirExplore"&& authContext.user.token !== null; 
  let isFlyAir41 = authContext.user.company == "Fly Air41 Airways"&& authContext.user.token !== null;
  let isCompany = authContext.user.company != null ;//Aviolog ili bilo sta != null
  //dummy comment to trigger commit
  

  //##
  instance.interceptors.request.use(config =>{
    const url = config.url;

    //refresh token posle inactivity extend
                                //refresh                                 //login                                //login
    if(!url.includes('/Account/refresh-token?username=') && !url.includes('/account/me') && !url.includes('/account/authenticate')){
      localStorage.setItem('lastUsedReqMils',Date.now())
    }
      
    return config;
  },error =>{
    return Promise.reject(error);
  });


  useEffect(() => {
     authCheckState();//kljucno za automatski login sa postojecim tokenom iz localStrage jer se inicijalno zove useEffect zbog mountovanja App a posle kada se uradi logout ili ako uspe automatski login jer se tada menja isAuthenticated
  }, [authCheckState, isAuthenticated]);
    //authCheckState nema promenjljivu u watch pa se ne menja njena referenca iz watch

  //defaultni bezuslovni
  let routes = (
    
    //MATCHOVANJE U SWITCH URLA SA ROUTE ILI REDIRECT KRECE TEK KADA SE MOUNTUJE APP
    //kada se mountuje App pokrenuce iz useEffect authCheckState koji je kesiran po referenci za proveru tokena i takodje ce krenuti za renderovanjem u child matchovane komponente iz switch sa trenutnim url na kom je App a to ce biti Auth u da1
    <Switch>        
      {/*da1->da5 ako postoje autentifikacijski podaci u localStorage inace ostaje u da1*/}
      {/*da1 je zapravo defaultni za neuatentifikovanog sa mogucnoscu autentifikacije a da5 za autentifikovanog nakon da1*/}
      {/*odnosno bice defaultno u da1 na /auth Auth strani a kada se zavrsi authCheckState ako je isAuthenticated==true onda ce biti u da5 na /auth2, a ako je isAuthenticated==false onda ostaje u da1*/}
      
      {/*ako se izlogujemo onda se vracamo u da1 na /auth*/}
    
      {/*u ovaj default se ulazi samo ako se ne uspe ni u jedan if da se udje koji sadrzi isAuthenticated dok je true, posto kada je isAuthenticated==false se zasigurno ulazi u da1*/}
      {/*to se desava ako ne postoje svi parametri u localStorage odnosno postoji min 1 samo da se promeni initialUser*/}

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
  //OVO JE GLAVNI DEO ZA AUTOMATSKI LOGIN PRI INICIJALNOM RENDERU JER CE BITI isAuthenticated==false AKO POSTOJE ILI NE PODACI U LOCALSTORAGE KOJI SU VALIDNI ILI NISU
  if(!isAuthenticated){//iako postoji token u browseru, jos uvek nije isAuthenticated==true!    
    routes = (
      <Switch>

        <Route path="/auth" component={Auth} />
        
        {/*u Redirect to se stavlja url za Route koji vraca component*/}
        {/*Route je 1:1 a Redirect N:1*/}
        {/*switch se aktivira samo jednom za prvi koji se naidje ili default na kraju*/}
        <Redirect from="/aircraft" to="/auth" />        
        <Redirect from="/airports" to="/auth" />                
        <Redirect from="/airlines" to="/auth" />                
        
        <Redirect from="/akrxAll" to="/auth" /> 
        

        <Redirect from="/" exact to="/auth" />

        {/*ako je isAuthenticated==true onda da5 a ako je isAuthenticated==false onda da1*/}

        {/*ne postoji default sto znaci da se nista nece ni aktivirati(renderovati)*/}
      </Switch>
    );
  }  

  if (isRole && isAuthenticated) {//isRole==Admin
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
        {/* <Route path="/addStation" component={AddStation} />   */}
        <Route path="/addStation" component={AddStationFormik} /> 
        <Route path="/stationDetails/:id" component={StationDetails} />        
        {/* <Route path="/updateStation/:id" component={UpdateStation} /> */}
        <Route path="/updateStation/:id" component={UpdateStationFormik} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} /> 
        <Route path="/user" component={User} />  
        <Route path="/addUser" component={AddUser} />
        <Route path={"/updateUser/:id"} component={UpdateUser} />
        <Route path={"/deleteUser/:id"} component={DeleteUser} />
        <Route path="/administrator" component={Administrator} />    
        <Redirect from="/" exact to="/administrator" />
        <Route render={() => <div><h1>Data not found administrator</h1></div>} />
      </Switch>
    );
  }

  if (isParser && isAuthenticated) {
    //ako je role=Parser
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

        <Route render={() => <div><h1>Data not found parser</h1></div>} />{/*zbog auth2 koji ne postoji nakon logina*/}
      </Switch>
    );
  }
  
  if (isCustomer && isAuthenticated && !isCompany && !isParser && !isRole) {
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

  //ulazi
  //isCompany je neophodan za logovanje odnosno potreban kao deo autentifikacije u localStorage
  {/*u ovom trenutku se ucitao token odnosno autentifikovani smo i bicemo na auth2 za koju ne postoji match Route tako da ce se default renderovati*/}
  if (isCompany && isAuthenticated && !isRole && !isParser) {
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
                
        <Redirect from="/" exact to="/akrxAll" />
        {/*<Redirect from="/" exact to="/akrxAll" odnosno vraca nas na akrxAll Route u ovom Switch koji je prethodno definisan/>*/}
        

          {/*pri defaultnom renderu vratice se return anonimne komponente*/}
          {/*mora se aktivirati ako se ni jedan Route ili Redirect prethodno ne aktivira a to ce biti za nepostojecu rutu odnosno u nasem slucaju kada se desi rerender App zbog promene isAutenticated==true pa rerender Auth pa redirect ka auth2 iz Auth*/} 
        <Route render={() => <div><h1>Data not found</h1></div>} />{/*slalo se company=Aviolog i znalo se unapred da nece vratiti nista u response cim je ovde definisano "Data not..." a bez company oce*/}
      </Switch>
    );
  }
  
  
  return (    
   <div className="App">    
      <Layout>
      
           
      
      
       {/*ako Redirect na isti url nece biti promene*/}
       {/*promenjen je user na inicijalni sto znaci da ce se pri rerender aktivirati da1 i setovan authShouldLogout==true za promenu url ka / radi matcha sa Auth*/}
      {authShouldLogout ? (
               <Redirect to={authRedirectPath} />//necemo from jer nam je nebitno gde smo trenutno
       ):<></>}  
     
      {routes}{/*koji god da se poslednji Switch sacuva renderovace se ovde,a onda se vrsi matchovanje trenutnog url sa rutom i prvi Route ili Redirect iz tog Switch koji ima match, njegova komponenta ce se renderovati ovde ali taj sacuvan switch je idalje dostupan za Redirect*/}
      </Layout>
    </div>  
  );
}


export default App;
