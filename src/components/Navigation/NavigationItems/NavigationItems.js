import React, {useContext} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {AuthContext} from '../../../context/auth-context';




const navigationItems = ( props ) => (
    
    
    
    // console.log("AUTH "+props.isAuthenticated),
    // console.log("PARSE "+props.isParser),
    // console.log("ROLE "+props.isRole),
   
        <ul className={classes.NavigationItems}>      
            
        
        {(props.isAuthenticated ) ? <NavigationItem link="/akrx">ACARS raw</NavigationItem> : null}
        {(props.isAuthenticated ) ? <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem> : null}
        {(props.isAuthenticated ) ? <NavigationItem link="/adsb">ADSB messages</NavigationItem> : null}
              
        {(props.isAuthenticated ) ? <NavigationItem link="/airports">Airports</NavigationItem> : null}       
         {(props.isAuthenticated) ? <NavigationItem link="/aircraft">Aircraft</NavigationItem> : null}
         {(props.isCustomer) ? null : <NavigationItem link="/aircraft">Aircraft</NavigationItem>}
         {(props.isAuthenticated ) ? <NavigationItem link="/airlines">Airlines</NavigationItem> : null}
         {(props.isCustomer) ? null : <NavigationItem link="/airlines">Airlines</NavigationItem>}
        {(props.isAuthenticated) ? <NavigationItem link="/openstreetMap">Map</NavigationItem> : null}       

        {(props.isAuthenticated && props.isParser) ? <NavigationItem link="/decoding">Decoder</NavigationItem> : null}

        {(props.isAuthenticated) ? <NavigationItem link="/statistics">Statistics</NavigationItem> : null}
        {(props.isCustomer) ? null : <NavigationItem link="/statistics">Statistics</NavigationItem>}
        {(props.isAuthenticated && props.isRole) ? <NavigationItem link="/administrator">Administrator</NavigationItem> : null}
        
        
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Log in</NavigationItem>
            : <NavigationItem link="/logout">Log out</NavigationItem>}

                     
    </ul>
   
    
)

export default navigationItems;