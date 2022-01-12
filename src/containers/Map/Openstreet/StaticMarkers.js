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
import geoTz from 'geo-tz';


const StaticMarkers = (props) => {
    
    const airports = useSelector(state => {
        return state.airport.airports;
    });

    console.log(airports);

    const loading = useSelector(state => {
        return state.airport.airportsLoading;
    });
    
    const[iata, setIata] = useState('');
    const[airportName, setAirportName] = useState('');
    const[city, setCity] = useState('');
     
    
    // console.log("ZOOM="+props.zoom);
    // console.log("Lat1"+props.lat1);
    // console.log("Lat2="+props.lat2);
    // console.log("Lon1"+props.lon1);
    // console.log("Lon2="+props.lon2);
    
    const dispatch = useDispatch();

    const onFetchLargeAirportLocations = useCallback(
        () => dispatch(actions.fetchLargeAirports(iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2))
        , [dispatch, iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2]
    );
    
    const onFetchLargeAndMediumAirportLocations = useCallback(
        () => dispatch(actions.fetchLargeAndMediumAirports(iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2))
        , [dispatch, iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2]
    );

    const onFetchAllAirportLocations = useCallback(
        () => dispatch(actions.fetchAllAirports(iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2))
        , [dispatch, iata, airportName, city, props.lat1, props.lat2, props.lon1, props.lon2]
    );
        
    useEffect(() => { 
        const timer = setTimeout(() => {
        if(props.zoom <=7 || props.zoom === null || props.lat1 === undefined || props.lat2 === undefined || props.lon1 === undefined || props.lon2 === undefined){
            onFetchLargeAirportLocations();
        }
        if(props.zoom >7 && props.zoom < 10){
            onFetchLargeAndMediumAirportLocations();
        }
        if(props.zoom >=10){
            onFetchAllAirportLocations();
        }
    }, 1000);
    return () => clearTimeout(timer);     
        
    }, [props.zoom, props.lat1, props.lat2, props.lon1, props.lon2]);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [20,20],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon});

    var geoTz = require("geo-tz");
    // var tzwhere = require("tzwhere");
    // tzwhere.init();
    
    let marker = <Spinner />

    if(airports && !loading){
        marker = airports.map((airportLocation, i)=>(
            <Marker 
                key={`dr-${i}`}
                icon={customIcon}
                position={[  
                    airportLocation.latitudeDeg ? airportLocation.latitudeDeg : "",
                    airportLocation.longitudeDeg ? airportLocation.longitudeDeg : ""
                ]}
                
            >
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        Name = {airportLocation.airportName}
                        <br />
                        City = {airportLocation.city} 
                        <br />
                        ICAO/IATA = {airportLocation.airportICAO ? airportLocation.airportICAO : "-"} / {airportLocation.airportIata ? airportLocation.airportIata : "-" }
                        {/* <br/> */}
                        {/* Timezone = {(geoTz(airportLocation.latitudeDeg, airportLocation.longitudeDeg)[0])} */}
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
