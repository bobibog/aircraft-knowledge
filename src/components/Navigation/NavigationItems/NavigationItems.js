import React, {useContext, useEffect} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {AuthContext} from '../../../context/auth-context';



        //
const NavigationItems = ( props ) => {
    const authContext = useContext(AuthContext);
    
    const authCheckState = authContext.authenticationCheckState;//

    let isAuthenticated = authContext.user.token !== null;
    let isRole = authContext.user.role == "Admin" ;
    let isParser = authContext.user.role == "Parser" && authContext.user.token !== null;
    let isCustomer = authContext.user.role == "Customer"&& authContext.user.token !== null;    
    let isCompany = authContext.user.company != null; 
    
    useEffect(() => {
        authCheckState();//isto i u App sto znaci da ce se na negde od ta 2 mesta izvrsiti zasigurno autentifikacija
      }, [authCheckState]);

    if(!isAuthenticated)//iako postoji token u browseru, jos uvek nije isAuthenticated==true!
    {
        console.log("#1")
        return(
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/auth">Log in</NavigationItem>
            </ul>
        )
    }
    if(isAuthenticated){
        console.log("#2")
        if(isCustomer && !isCompany){
            return(<ul className={classes.NavigationItems}>
                <NavigationItem link="/akrx">ACARS raw</NavigationItem>
                <NavigationItem link="/acarsWithExtDataCompany">ACARS per Aircraft</NavigationItem>
                <NavigationItem link="/adsbCompany">ADSB messages</NavigationItem>
                <NavigationItem link="/airports">Airports</NavigationItem>            
                <NavigationItem link="/openstreetMapCompany">Map</NavigationItem>   
                <NavigationItem link="/logout">Log out</NavigationItem>         
            </ul>)
        }
        if(isParser && isAuthenticated){
            console.log("#3")
            return(<ul className={classes.NavigationItems}>
                <NavigationItem link="/akrxAll">ACARS raw</NavigationItem>
                <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem>
                <NavigationItem link="/adsb">ADSB messages</NavigationItem>
                <NavigationItem link="/airports">Airports</NavigationItem>
                <NavigationItem link="/aircraft">Aircraft</NavigationItem>
                <NavigationItem link="/airlines">Airlines</NavigationItem>
                <NavigationItem link="/openstreetMap">Map</NavigationItem> 
                <NavigationItem link="/statistics">Statistics</NavigationItem>
                <NavigationItem link="/decoding">Decoder</NavigationItem>   
                <NavigationItem link="/logout">Log out</NavigationItem>        
            </ul>)
        }
        if(isRole && isAuthenticated){
            console.log("#4")
            return(<ul className={classes.NavigationItems}>
                <NavigationItem link="/akrxAll">ACARS raw</NavigationItem>
                <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem>
                <NavigationItem link="/adsb">ADSB messages</NavigationItem>
                <NavigationItem link="/airports">Airports</NavigationItem>
                <NavigationItem link="/aircraft">Aircraft</NavigationItem>
                <NavigationItem link="/airlines">Airlines</NavigationItem>
                <NavigationItem link="/openstreetMap">Map</NavigationItem> 
                <NavigationItem link="/statistics">Statistics</NavigationItem>
                {/* <NavigationItem link="/decoding">Decoder</NavigationItem>    */}
                <NavigationItem link="/administrator">Administrator</NavigationItem>
                <NavigationItem link="/logout">Log out</NavigationItem>        
            </ul>)
        }
        if(isCompany && isAuthenticated){
            console.log("#5")
           
            return(<ul className={classes.NavigationItems}>

                {/*ako menjamo NavigationItem link onda menjamo i rutu u App.js tako da je u tom trenutku postojanja NavigationItem dostupna*/}
                {/*u ovom slucaju poslednji se aktiviraju #5 i da5 sto znaci da ce oni biti renderovani*/}
                <NavigationItem link="/akrxAll">ACARS raw</NavigationItem>{/*bilo <NavigationItem link="/akrx">ACARS raw</NavigationItem>*/}
                <NavigationItem link="/acarsWithExtData">ACARS per aircraft</NavigationItem>{/*bilo <NavigationItem link="/acarsWithExtDataCompany">ACARS per aircraft</NavigationItem>*/}
                <NavigationItem link="/adsbCompany">ADSB messages</NavigationItem>
                                
                <NavigationItem link="/logout">Log out</NavigationItem>        
            </ul>)
        }
        else{
            console.log("#6")
            return(<ul className={classes.NavigationItems}>
                 <NavigationItem link="/akrx">ACARS raw</NavigationItem>  
                 <NavigationItem link="/acarsWithExtDataCompany">ACARS per aircraft</NavigationItem>    
                 <NavigationItem link="/adsbCompany">ADSB messages</NavigationItem>         
                <NavigationItem link="/logout">Log out</NavigationItem>   
            </ul>) 
        }
              
    }
    // if(props.isAuthenticated && !props.isCustomer){
    //     return(<ul className={classes.NavigationItems}>
    //         <NavigationItem link="/akrx">ACARS raw</NavigationItem>
    //         <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem>
    //         <NavigationItem link="/adsb">ADSB messages</NavigationItem>
    //         <NavigationItem link="/airports">Airports</NavigationItem>
    //         <NavigationItem link="/aircraft">Aircraft</NavigationItem>
    //         <NavigationItem link="/airlines">Airlines</NavigationItem>
    //         <NavigationItem link="/openstreetMap">Map</NavigationItem>            
    //     </ul>)
    // }
    // if(props.isAuthenticated && props.isCustomer){
    //     return(<ul className={classes.NavigationItems}>
    //         <NavigationItem link="/akrx">ACARS raw</NavigationItem>
    //         <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem>
    //         <NavigationItem link="/adsb">ADSB messages</NavigationItem>
    //         <NavigationItem link="/airports">Airports</NavigationItem>            
    //         <NavigationItem link="/openstreetMap">Map</NavigationItem>            
    //     </ul>)
    // }
    // console.log("AUTH "+props.isAuthenticated),
    // console.log("PARSE "+props.isParser),
    // console.log("ROLE "+props.isRole),
   
    //     <ul className={classes.NavigationItems}>      
                
    //         {(props.isAuthenticated ) ? <NavigationItem link="/akrx">ACARS raw</NavigationItem> : null}
    //         {(props.isAuthenticated ) ? <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem> : null}
    //         {(props.isAuthenticated ) ? <NavigationItem link="/adsb">ADSB messages</NavigationItem> : null}
                
    //         {(props.isAuthenticated ) ? <NavigationItem link="/airports">Airports</NavigationItem> : null}       
    //         {(props.isAuthenticated && !props.isCustomer) ? <NavigationItem link="/aircraft">Aircraft</NavigationItem> : null}
            
    //         {(props.isAuthenticated && !props.isCustomer) ? <NavigationItem link="/airlines">Airlines</NavigationItem> : null}
            
    //         {(props.isAuthenticated) ? <NavigationItem link="/openstreetMap">Map</NavigationItem> : null}       

    //         {(props.isAuthenticated && props.isParser) ? <NavigationItem link="/decoding">Decoder</NavigationItem> : null}

    //         {(props.isAuthenticated && !props.isCustomer) ? <NavigationItem link="/statistics">Statistics</NavigationItem> : null}
            
    //         {(props.isAuthenticated && props.isRole) ? <NavigationItem link="/administrator">Administrator</NavigationItem> : null}
            
            
    //         {!props.isAuthenticated
    //             ? <NavigationItem link="/auth">Log in</NavigationItem>
    //             : <NavigationItem link="/logout">Log out</NavigationItem>}

                     
    // </ul>
   
    
    }

export default NavigationItems;