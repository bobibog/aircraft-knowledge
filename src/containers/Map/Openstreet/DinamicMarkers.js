import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios-local';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {MapContainer, TileLayer,Marker, Popup} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Spinner from '../../../components/UI/Spinner/Spinner';
import markerIcon from '../../../assets/images/airplane-2-multi-size.ico';

const DinamicMarkers = () => {
    
    const currentLocations = useSelector(state => {
        return state.currentLocation.currentLocations;
    });

    const loading = useSelector(state => {
        return state.currentLocation.currentLocationLoading;
    });
    
    
    const dispatch = useDispatch();

    const onFetchCurrentLocations = useCallback(
        () => dispatch(actions.fetchCurrentLocations())
        , [dispatch]
    );

        
    useEffect(() => { 
        const interval = setInterval(()=>
        {
            onFetchCurrentLocations();
        }, 3000);
        return () => clearInterval(interval);  
        
    }, [onFetchCurrentLocations]);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [30,30],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon});
    
    let marker = <Spinner />

    if(currentLocations && !loading){
        marker = currentLocations.map((currentLocation)=>(
            <Marker 
                key={currentLocation.id}
                icon={customIcon}
                position={[                    
                    currentLocation.lat ? currentLocation.lat : "",
                    currentLocation.lon ? currentLocation.lon : ""
                ]}
                
            >
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        ICAO = {currentLocation.icao}
                        <br />
                        Latitude = {currentLocation.lat} 
                        <br />
                        Longitude = {currentLocation.lon}
                    </div>
                    
                </Popup>
            </Marker> 
            ))
    }

    return (
        <div>
            {marker}
        </div>
    )
}

export default withErrorHandler(DinamicMarkers,axios);
