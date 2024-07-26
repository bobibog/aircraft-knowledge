import React, { useState, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { AuthContext } from '../../../../context/auth-context';
import classes from './AddStation.module.css';

const AddStation = () => {
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;

    // Set id to 0 since it should always be 0
    const [id] = useState(0);
    const [stationId, setStationId] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [lastActiveTime, setLastActiveTime] = useState('');
    const [feederName, setFeederName] = useState('');
    const [feederEmail, setFeederEmail] = useState('');
    const [feederPhone, setFeederPhone] = useState('');
    const [description, setDescription] = useState('');
    const [notificationEmail, setNotificationEmail] = useState('');
    const [feederNotificationEmail, setFeederNotificationEmail] = useState('');
    const [firstTimeSentToFeeder, setFirstTimeSentToFeeder] = useState('');

    const onAddStation = useCallback(() => {
        dispatch(actions.addStation(
            id,
            stationId,
            latitude || null,
            longitude || null,
            city || null,
            country || null,
            locationAddress || null,
            lastActiveTime ? new Date(lastActiveTime).toISOString() : null,
            feederName,
            feederEmail,
            feederPhone || null,
            description || null,
            notificationEmail || null,
            feederNotificationEmail || null,
            firstTimeSentToFeeder ? new Date(firstTimeSentToFeeder).toISOString() : null,
            isAuthenticated
        ));
    }, [
        dispatch,
        id,
        stationId,
        latitude,
        longitude,
        city,
        country,
        locationAddress,
        lastActiveTime,
        feederName,
        feederEmail,
        feederPhone,
        description,
        notificationEmail,
        feederNotificationEmail,
        firstTimeSentToFeeder,
        isAuthenticated
    ]);

    const onReset = () => {
        setStationId('');
        setLatitude('');
        setLongitude('');
        setCity('');
        setCountry('');
        setLocationAddress('');
        setLastActiveTime('');
        setFeederName('');
        setFeederEmail('');
        setFeederPhone('');
        setDescription('');
        setNotificationEmail('');
        setFeederNotificationEmail('');
        setFirstTimeSentToFeeder('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onAddStation();
    };

    return (
        <>
            <h2><u>Add new station</u></h2>  
            <div className={classes.container}>         
                <form className={classes.form} onSubmit={onSubmit}>
                    <input type="hidden" value={id} />
                    <div>                        
                        <input className={classes.input} value={stationId} onChange={(e) => setStationId(e.target.value)} placeholder='Station ID' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder='Latitude' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder='Longitude' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} placeholder='Location Address' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={lastActiveTime} onChange={(e) => setLastActiveTime(e.target.value)} placeholder='Last Active Time' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={feederName} onChange={(e) => setFeederName(e.target.value)} placeholder='Feeder Name' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={feederEmail} onChange={(e) => setFeederEmail(e.target.value)} placeholder='Feeder Email' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={feederPhone} onChange={(e) => setFeederPhone(e.target.value)} placeholder='Feeder Phone' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={notificationEmail} onChange={(e) => setNotificationEmail(e.target.value)} placeholder='Notification Email' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={feederNotificationEmail} onChange={(e) => setFeederNotificationEmail(e.target.value)} placeholder='Feeder Notification Email' />
                    </div>
                    <div>                        
                        <input className={classes.input} value={firstTimeSentToFeeder} onChange={(e) => setFirstTimeSentToFeeder(e.target.value)} placeholder='First Time Sent To Feeder' />
                    </div>
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button className='btn btn-primary' type="submit" onClick={onSubmit}>Add Station</button>
                        </div>
                        <div className={classes.button}>
                            <button type="button" className="btn btn-warning" onClick={onReset}>CLEAR</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddStation;
