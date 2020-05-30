import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Airlines</NavigationItem>
        <NavigationItem link="/">Aircrafts</NavigationItem>
        <NavigationItem link="/">Airports</NavigationItem>
        <NavigationItem link="/">Flights</NavigationItem>        
    </ul>
);

export default navigationItems;