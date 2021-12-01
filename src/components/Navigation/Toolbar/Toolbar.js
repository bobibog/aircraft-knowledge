import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Background from '../../../assets/images/back3.jpg'
import Clock from '../../Clock/Clock';

const toolbar = ( props ) => (
    <header className={classes.Toolbar} style={{backgroundImage:"url("+Background+")", backgroundRepeat:'no-repeat', backgroundSize:'cover', position:'center'}}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.Clock}><Clock/></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>        
    </header>
);

export default toolbar;