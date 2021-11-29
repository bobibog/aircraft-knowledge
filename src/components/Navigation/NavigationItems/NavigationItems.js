import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        
        {props.isAuthenticated ? <NavigationItem link="/akrx">ACARS raw</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/acarsWithExtData">ACARS per Aircraft</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/adsb">ADSB messages</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/airlines">Airlines</NavigationItem> : null}        
        {props.isAuthenticated ? <NavigationItem link="/airports">Airports</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/aircraft">Aircraft</NavigationItem> : null}  
        {/* {props.isAuthenticated ? <NavigationItem link="/map">Map</NavigationItem> : null} */}
        {props.isAuthenticated ? <NavigationItem link="/openstreetMap">Map</NavigationItem> : null}

        {props.isRole ? <NavigationItem link="/administrator">Administrator</NavigationItem> : null}
        
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Log in</NavigationItem>
            : <NavigationItem link="/logout">Log out</NavigationItem>}                       
    </ul>
);

export default navigationItems;