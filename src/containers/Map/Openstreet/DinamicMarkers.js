import React, {useState, useEffect, useCallback, useRef, useMemo, forwardRef, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios-local';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {Marker, Popup} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-rotatedmarker";
import Spinner from '../../../components/UI/Spinner/Spinner';
import markerIcon from '../../../assets/images/airplane-2-multi-size.ico';
import markerIcon1 from '../../../assets/images/a2.png';
import { forEach } from 'lodash';
//import * as signalR from '@microsoft/signalr';
//import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";


const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
    const markerRef = useRef();
  
    const { rotationAngle, rotationOrigin } = props;
    useEffect(() => {
      const marker = markerRef.current;
      if (marker) {
        marker.setRotationAngle(rotationAngle);
        marker.setRotationOrigin(rotationOrigin);
      }
    }, [rotationAngle, rotationOrigin]);
   
  
    return (
      <Marker
        ref={(ref) => {
          
          markerRef.current = ref;
          if (forwardRef) {
            forwardRef.current = ref;
            
          }
        }}
        {...props}
        
      >
        {children}
      </Marker>
    );
});

const RotatedMarkerOpenSky = forwardRef(({ children, ...props }, forwardRef) => {
    const markerRef = useRef();
  
    const { rotationAngle, rotationOrigin } = props;
    useEffect(() => {
      const marker2 = markerRef.current;
      if (marker2) {
        marker2.setRotationAngle(rotationAngle);
        marker2.setRotationOrigin(rotationOrigin);
      }
    }, [rotationAngle, rotationOrigin]);
   
  
    return (
      <Marker
        ref={(ref) => {
          
          markerRef.current = ref;
          if (forwardRef) {
            forwardRef.current = ref;
            
          }
        }}
        {...props}
        
      >
        {children}
      </Marker>
    );
});


const DinamicMarkers = (props) => {
    
    const currentLocations = useSelector(state => {
        return state.currentLocation.currentLocations;
    });

    const states = useSelector(state => {
        return state.currentLocation.states;
    }); 

            

       

    const loading = useSelector(state => {
        return state.currentLocation.currentLocationLoading;
    }); 
    
    const loadingStates = useSelector(state => {
        return state.currentLocation.statesLoading;
    });

    const[previousAngle, setPreviousAngle]= useState(0);
    
    //Creating HUB Connection
    //const hubConnection = new signalR.HubConnectionBuilder().withUrl("/CurrentLocation").build();

    //hubConnection.start();

    //const [connection, setConnection] = useState(null); 
    

//    var latitude1 = 0;
//    var latitude2 = 0;
//    var longitude1 = 0;
//    var longitude2 = 0;
//    var key = "";
  

//     if(currentLocations!=null){
        
//         var latitude1 = currentLocations.map((currentLocation)=>(currentLocation.lat ? currentLocation.lat : 0) );
//         console.log("Sirina = "+latitude1);
//         //var latitude2= currentLocations.map((currentLocation, i=1)=>(currentLocation.lat ? currentLocation[i-1].lat : 0));
//         var longitude1 = currentLocations.map((currentLocation)=>(currentLocation.lon ? currentLocation.lon : 0));
//         console.log("Duzina = "+ longitude1);
//         //var longitude2= currentLocations.map((currentLocation, i=1)=>(currentLocation.lon ? currentLocation[i-1].lon : 0));
//         var key = currentLocations.map((currentLocation)=>(currentLocation.id ? currentLocation.id : ""))
//         console.log("Kljuc = "+key);    
    
//     }     
//       var latitude2 = usePreviousValue(typeof latitude1!== 'undefined' ? latitude1 : 0);
//       console.log("Lat2 = "+latitude2);    
    
//       var longitude2 = usePreviousValue(typeof longitude1!== 'undefined' ? longitude1 : 0);
//       console.log("Lon2 = "+longitude2);   
    
        
    const dispatch = useDispatch();

    const onFetchCurrentLocations = useCallback(
        () => dispatch(actions.fetchCurrentLocations(props.lat1, props.lat2, props.lon1, props.lon2))
        , [dispatch, props.lat1, props.lat2, props.lon1, props.lon2]
    );

    const onFetchCurrentLocations2 = useCallback(
        () => dispatch(actions.fetchCurrentLocations2(props.lat2, props.lon2, props.lat1, props.lon1))
        , [dispatch, props.lat2, props.lon2, props.lat1, props.lon1]
    );

    
    

    useEffect(() => { 
        const interval = setInterval(()=>
        { 
            onFetchCurrentLocations();     
            onFetchCurrentLocations2();         
           
        }, 5000);
        return () => clearInterval(interval);         
    }, [props.lat1, props.lat2, props.lon1, props.lon2]);


    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [30,30],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon});
    var openSkyIcon = new LeafIcon({iconUrl:markerIcon1})
    
        
    let marker = <Spinner />
    let marker2 = <Spinner />

    if(currentLocations && !loading){
        
        marker = currentLocations.map((currentLocation)=>(
                        
            <RotatedMarker 
                key={currentLocation.id}
                icon={customIcon}
                position={[                    
                    currentLocation.lat ? currentLocation.lat : 0,
                    currentLocation.lon ? currentLocation.lon : 0
                ]}               
                
                //rotationAngle = {currentLocation.angle != null ? currentLocation.angle : previousAngle}
                rotationAngle = {currentLocation.angle}
                rotationOrigin= 'center center'
                
            >            
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        ICAO = {currentLocation.icao}
                        <br />
                        Angle = {currentLocation.angle} 
                        <br />                        
                        Lat = {currentLocation.lat}
                        <br />
                        Lon = {currentLocation.lon}
                    </div>
                    
                </Popup>
            </RotatedMarker>
            
      ))
    }

    // OpenSky Markeri
    if(states && !loadingStates){  
        
        let array = states.map((nested)=>{
            return nested;
        });

        let segment = array.map((x)=>{
            return x;
        })

        
        marker2 = segment.map((st, i)=>(           
            
          <RotatedMarkerOpenSky 
                key={`dr-${i}`}
                icon={openSkyIcon}                
                
                 position={[                    
                    st[6] ? st[6] : 0,
                    st[5] ? st[5] : 0                   
                    
                ]}                 
                rotationAngle = {st[10]}
                rotationOrigin= 'center center'
                
            >            
                
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        Origin Country = {st[2]}
                        <br />
                        Velocity = {st[9]} 
                        <br />                        
                        Vertical Rate = {st[11]}                        
                    </div>
                    
                </Popup>
            </RotatedMarkerOpenSky>))               
                 
    }

             
    

    return (
        <div>
            {marker}
            {marker2}
        </div>
    )
}

export default withErrorHandler(DinamicMarkers,axios);




