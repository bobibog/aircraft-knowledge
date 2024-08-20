import React, { useEffect, useState, useContext, useRef} from 'react';
import classes from './Clock.module.css';

import { AuthContext } from '../../context/auth-context';

const Clock = () => {
    
    
    let time = new Date().toUTCString().replace('GMT', ' UTC');
    const[currentTime, setCurrentTime] = useState(time);
    

    ////////////////
    /*
    const authContext = useContext(AuthContext);
    let authLogoutInactivity = authContext.logoutInactivityTimeRemainingMils;
    let authLogoutTokenInvalid = authContext.logoutTokenInvalidTimeRemainingMils;

    const [logoutInactivity, setLogoutInactivity] = useState(authLogoutInactivity);
    const [logoutTokenInvalid, setLogoutTokenInvalid] = useState(authLogoutTokenInvalid);

    const authLogoutInactivityRef = useRef(authLogoutInactivity);
    const authLogoutTokenInvalidRef = useRef(authLogoutTokenInvalid);
    */
    ////////////////

    /*
    useEffect(() =>{

        if(logoutInactivity !== authLogoutInactivity){
            authLogoutInactivityRef.current = authLogoutInactivity;
            setLogoutInactivity(authLogoutInactivity)
        }
        if(logoutTokenInvalid !== authLogoutTokenInvalid){
            authLogoutTokenInvalidRef.current = authLogoutTokenInvalid;
            setLogoutTokenInvalid(authLogoutTokenInvalid)
        }
    }, [authLogoutInactivity,authLogoutTokenInvalid]);//istovremeno su async grupisani pa istovremeno aktiviraju watch
    */

    const UpdateTime = () => {
        time = new Date().toUTCString().replace('GMT', ' UTC');
        setCurrentTime(time);

        //ref da se ne bi predefinisala vrednost u callback
        /*
        if(authLogoutInactivityRef.current)
             authLogoutInactivityRef.current-=1000
        
        if(authLogoutTokenInvalidRef.current)
             authLogoutTokenInvalidRef.current-=1000
        */
    };

    useEffect(() =>{
        const id = setInterval(UpdateTime, 1000);
        //return ()=>clearInterval(id);
    },[]);       


    return (
        <div className={classes.Clock}>
            <label>{currentTime}</label>
            {/*<label>Token:{authLogoutTokenInvalidRef.current}</label>
            <label>Inactivity:{authLogoutInactivityRef.current}</label>*/}
        
        </div>
    )
}

export default Clock;
