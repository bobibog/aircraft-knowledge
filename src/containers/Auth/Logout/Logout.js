import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import {AuthContext} from '../../../context/auth-context';

const Logout = props => {

    const logout = useContext(AuthContext).logoutUser;
    
    useEffect(() => {
        logout();
    }, [logout]);
    
    return <Redirect to="/"/>;
}                                                     

export default Logout;