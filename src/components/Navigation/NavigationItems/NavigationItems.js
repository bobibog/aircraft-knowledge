import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/airlines">Airlines</NavigationItem>
        <NavigationItem link="/aircrafts">Aircrafts</NavigationItem>
        <NavigationItem link="/airports">Airports</NavigationItem>
        <NavigationItem link="/flights">Flights</NavigationItem>        
    </ul>
);

export default navigationItems;