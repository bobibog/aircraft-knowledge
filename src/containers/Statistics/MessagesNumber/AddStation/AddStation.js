import React, { useState, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { AuthContext } from '../../../../context/auth-context';
import classes from './AddStation.module.css';

const AddStation = () => {
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.user.token;

    const [id] = useState(0);
    const [stationId, setStationId] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [feederName, setFeederName] = useState('');
    const [feederEmail, setFeederEmail] = useState('');
    const [feederPhone, setFeederPhone] = useState('');
    const [description, setDescription] = useState('');

    const onAddStation = useCallback(() => {
        const cleanLatitude = latitude.replace(/[^0-9.-]/g, '').trim();
        const cleanLongitude = longitude.replace(/[^0-9.-]/g, '').trim();
        const latitudeValue = parseFloat(cleanLatitude);
        const longitudeValue = parseFloat(cleanLongitude);

        const payload = {
            id,
            stationId,
            latitude: !isNaN(latitudeValue) ? latitudeValue : 0,
            longitude: !isNaN(longitudeValue) ? longitudeValue : 0,
            city: city || 'string',
            country: country || 'string',
            locationAddress: locationAddress || 'string',
            feederName: feederName || 'string',
            feederEmail: feederEmail || 'string',
            feederPhone: feederPhone || 'string',
            description: description || 'string',
            isAuthenticated
        };

        console.log('Payload being sent to the API:', JSON.stringify(payload, null, 2));

        dispatch(actions.addStation(payload))
          .catch(error => {
            if (error.response) {
                console.error("Error response:", error.response);
                const errorDetails = error.response.data;
                let errorMessages = '';

                if (errorDetails && errorDetails.errors) {
                    for (const field in errorDetails.errors) {
                        errorMessages += `${field}: ${errorDetails.errors[field].join(' ')}\n`;
                    }
                } else {
                    errorMessages = errorDetails.title || 'An unknown error occurred.';
                }

                alert(`Error: ${errorMessages}`);
            } else if (error.request) {
                console.error("Request error:", error.request);
                alert("No response received from the server. Please check your network connection and try again.");
            } else {
                console.error("Error message:", error.message);
                alert(`Error: ${error.message}`);
            }
        });
    }, [
        dispatch,
        id,
        stationId,
        latitude,
        longitude,
        city,
        country,
        locationAddress,
        feederName,
        feederEmail,
        feederPhone,
        description,
        isAuthenticated
    ]);

    const onReset = () => {
        setStationId('');
        setLatitude('');
        setLongitude('');
        setCity('');
        setCountry('');
        setLocationAddress('');
        setFeederName('');
        setFeederEmail('');
        setFeederPhone('');
        setDescription('');
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
                        <input 
                            className={classes.input} 
                            value={stationId} 
                            onChange={(e) => setStationId(e.target.value)} 
                            placeholder='Station ID' 
                            required 
                        />
                    </div>
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
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button className='btn btn-primary' type="submit">Add Station</button>
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
