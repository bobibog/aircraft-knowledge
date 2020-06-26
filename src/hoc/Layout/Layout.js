import React, {useState, useContext} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {AuthContext} from '../../context/auth-context';

const Layout = (props) => {    
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    
    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token !== null;

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;