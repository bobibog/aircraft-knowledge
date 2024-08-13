import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import * as actions from '../../../../store/actions/index';
import { AuthContext } from '../../../../context/auth-context';
import classes from './UpdateStation.module.css';

const UpdateStation = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.user.token;

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [city, setCity] = useState('string');
    const [country, setCountry] = useState('string');
    const [locationAddress, setLocationAddress] = useState('string');
    const [feederName, setFeederName] = useState('string');
    const [feederEmail, setFeederEmail] = useState('string');
    const [feederPhone, setFeederPhone] = useState('string');
    const [description, setDescription] = useState('string');
    const [feederNotificationEmail, setFeederNotificationEmail] = useState('string');

    useEffect(() => {
        if (id) {
            dispatch(actions.fetchStation(id, isAuthenticated)).then(station => {
                if (station) {
                    setLatitude(station.latitude);
                    setLongitude(station.longitude);
                    setCity(station.city);
                    setCountry(station.country);
                    setLocationAddress(station.locationAddress);
                    setFeederName(station.feederName);
                    setFeederEmail(station.feederEmail);
                    setFeederPhone(station.feederPhone);
                    setDescription(station.description);
                    setFeederNotificationEmail(station.feederNotificationEmail);
                } else {
                    console.error("Station data is undefined or null");
                }
            }).catch(error => {
                console.error("Error while fetching station data:", error);
            });
        }
    }, [dispatch, id, isAuthenticated]);


    const onUpdateStation = useCallback(() => {
        const payload = {
            id,
            latitude: parseFloat(latitude) || 0,
            longitude: parseFloat(longitude) || 0,
            city,
            country,
            locationAddress,
            feederName,
            feederEmail,
            feederPhone,
            description,
            feederNotificationEmail,
            isAuthenticated
        };

        console.log('Payload being sent to the API:', JSON.stringify(payload, null, 2));

        dispatch(actions.updateStation({...payload, isAuthenticated: authContext.user.token}))
          .catch(error => {
              console.error("Error updating station:", error);
          });
    }, [
        dispatch,
        id,
        latitude,
        longitude,
        city,
        country,
        locationAddress,
        feederName,
        feederEmail,
        feederPhone,
        description,
        feederNotificationEmail,
        isAuthenticated
    ]);

    const onSubmit = (e) => {
        e.preventDefault();
        onUpdateStation();
    };

    return (
        <div className={classes.form}>
            <h2><u>Update Station</u></h2>  
            <div className={classes.container}>         
                <form className={classes.form} onSubmit={onSubmit}>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={latitude} 
                            onChange={(e) => setLatitude(e.target.value)} 
                            placeholder='Latitude' 
                            type="text"
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={longitude} 
                            onChange={(e) => setLongitude(e.target.value)} 
                            placeholder='Longitude' 
                            type="text"
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder='City' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            placeholder='Country' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={locationAddress} 
                            onChange={(e) => setLocationAddress(e.target.value)} 
                            placeholder='Location Address' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={feederName} 
                            onChange={(e) => setFeederName(e.target.value)} 
                            placeholder='Feeder Name' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={feederEmail} 
                            onChange={(e) => setFeederEmail(e.target.value)} 
                            placeholder='Feeder Email' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={feederPhone} 
                            onChange={(e) => setFeederPhone(e.target.value)} 
                            placeholder='Feeder Phone' 
                            required 
                        />
                    </div>
                    <div>                        
                        <input 
                            className={classes.input} 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder='Description' 
                            required 
                        />
                    </div>
                    <div>                        
                        <select 
                            className={classes.input} 
                            value={feederNotificationEmail} 
                            onChange={(e) => setFeederNotificationEmail(e.target.value)} 
                            required
                        >
                            <option value="Send">Send</option>
                            <option value="DoNothing">Do Nothing</option>
                        </select>
                    </div>
                    <div className={classes.btnContainer}>
                        <button className='btn btn-primary' type="submit">Update Station</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateStation;
