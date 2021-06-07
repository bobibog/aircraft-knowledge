import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/airlines">Airlines</NavigationItem>
        {/* <NavigationItem link="/aircrafts">Aircraft</NavigationItem> */}
        <NavigationItem link="/airports">Airports</NavigationItem>
        <NavigationItem link="/aircraft">Aircraft</NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/flights">Flights</NavigationItem> : null} */}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Log in</NavigationItem>
            : <NavigationItem link="/logout">Log out</NavigationItem>}     
    </ul>
);

export default navigationItems;