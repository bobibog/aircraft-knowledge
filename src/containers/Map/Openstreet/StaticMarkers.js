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

    
    const routes = useSelector(state =>{
        return state.airport.routes;
    });

    const metar = useSelector(state => {
        return state.airport.metar;
    });

    let dest = null;
    
    // if(routes!=null){
    //     let f = routes.map((adf)=>{
    //     return adf.averageDailyFlights;
    //     });

    //     dest = routes.map((dst)=>{
    //         let destinations = dst.destination.name.toString();            
    //         return destinations;
    //     })  
        
    // }  
    
       

    const loading = useSelector(state => {
        return state.airport.airportsLoading;
    });
    
    const[iata, setIata] = useState('');
    const[airportName, setAirportName] = useState('');
    const[city, setCity] = useState('');
    const[icao, setIcao] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
     
    //console.log(icao);
        
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

    const onFetchRoutes = useCallback(
        () => dispatch(actions.fetchAirportsStatistic(icao))
        , [dispatch, icao]
    );

    const onFetchMetars = useCallback(
        () => dispatch(actions.fetchMetar(icao))
        , [dispatch, icao]
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

    // useEffect(()=>{
    //     onFetchRoutes();
    // }, [icao]);

    useEffect(()=>{
        onFetchMetars();
    }, [icao]);

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
                eventHandlers={{
                    click: () => {
                    setIcao(airportLocation.airportICAO)
                    // setLatitude(airportLocation.latitudeDeg);
                    // setLongitude(airportLocation.longitudeDeg);
                    },
                }}
            >
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        Name = {airportLocation.airportName}
                        <br />
                        City = {airportLocation.city} 
                        <br />
                        ICAO/IATA = {airportLocation.airportICAO ? airportLocation.airportICAO : "-"} / {airportLocation.airportIata ? airportLocation.airportIata : "-" }
                        <br/>
                        {/* DESTINATIONS = {dest} */}
                        Temperature = {metar != null ? metar.temperature.value+' °C' : "/"} 
                        <br/>
                        Relative humidity = {metar != null ? metar.relative_humidity : "/"}
                        <br />
                        Visibility = {metar != null ? metar.visibility.value + ' m' : "/"}
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
