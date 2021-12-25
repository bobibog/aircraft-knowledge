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
import markerIcon from '../../../assets/images/pin2.ico';

const StaticMarkers = () => {
    
    const airports = useSelector(state => {
        return state.airport.airports;
    });

    console.log(airports);

    const loading = useSelector(state => {
        return state.airport.airportsLoading;
    });
    
    
    const dispatch = useDispatch();

    const onFetchAirportLocations = useCallback(
        () => dispatch(actions.fetchAirpotsLocation())
        , [dispatch]
    );

        
    useEffect(() => { 
        
            onFetchAirportLocations();         
        
    }, [onFetchAirportLocations]);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [20,20],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon});
    
    let marker = <Spinner />

    if(airports && !loading){
        marker = airports.map((airportLocation, i)=>(
            <Marker 
                key={`dr-${i}`}
                icon={customIcon}
                position={[  
                    airportLocation.latitudeDeg ? airportLocation.latitudeDeg : "",
                    airportLocation.longitudeDeg ? airportLocation.longitudeDeg : "",
                ]}
                
            >
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        Name = {airportLocation.airportName}
                        <br />
                        City = {airportLocation.city} 
                        
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

export default withErrorHandler(StaticMarkers,axios);
