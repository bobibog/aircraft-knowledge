import React, {useState, useEffect, useCallback, useRef, useMemo, forwardRef} from 'react';
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

  // Custom hook to catch previous position value
//   const usePreviousValue = (value) => {
//     const ref = useRef();
//     useEffect(() => {            
//         ref.current = value;        
//     });
//     return ref.current;
//   };


const DinamicMarkers = () => {
    
    const currentLocations = useSelector(state => {
        return state.currentLocation.currentLocations;
    });

    //console.log(currentLocations);

    const loading = useSelector(state => {
        return state.currentLocation.currentLocationLoading;
    });  
    
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
        () => dispatch(actions.fetchCurrentLocations())
        , [dispatch]
    );

    
    // const angleFromCoordinate=(lat1, lon1, lat2, lon2)=>
    // {
    //     var dLon = (lon2 - lon1);

    //     var y = Math.sin(dLon) * Math.cos(lat2);
    //     var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
    //             * Math.cos(lat2) * Math.cos(dLon);

    //     // Angle expressed in radians
    //     var brng = Math.atan2(y, x);

    //     // Angle expressed in radians
    //     var deg = (180 / Math.PI) * brng;
    //     deg = (deg + 360) % 360;
    //     //deg = 360 - deg; // count degrees counter-clockwise - remove to make clockwise

    //     return deg;
    // }

    //const[hubConnection, setHubConnection]=useState(null);

    //const hubConnection = new signalR.HubConnectionBuilder().withUrl("/openstreetMap").build();
    //hubConnection.start();
       
    // useEffect(() => {
    //     const connect = new HubConnectionBuilder()
    //       .withUrl("https://localhost:44350/api/v1/CurrentLocation")
    //       .withAutomaticReconnect()
    //       .build();
    
    //     setConnection(connect);
    //     if(connect){
    //         console.log("SignalR Established connection")
    //     }
    //   }, []);


    useEffect(() => { 
        const interval = setInterval(()=>
        { 
            onFetchCurrentLocations();
           
        }, 5000);
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
        
        marker = currentLocations.map((currentLocation, i)=>(
            
            <RotatedMarker 
                key={currentLocation.id}
                icon={customIcon}
                position={[                    
                    currentLocation.lat ? currentLocation.lat : 0,
                    currentLocation.lon ? currentLocation.lon : 0
                ]}               
                
                rotationAngle = {currentLocation.angle}
                rotationOrigin= 'center center'
                
            >
            
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        ICAO = {currentLocation.icao}
                        {/* <br />
                        Angle = {currentLocation.angle}  */}
                        <br />                        
                        Altitude = {currentLocation.altitude}
                    </div>
                    
                </Popup>
            </RotatedMarker>
            
        ))
        // marker = 
                        
        //     <RotatedMarker 
        //         key={key}
        //         icon={customIcon}
        //         position={[                    
        //             latitude1 ? latitude1 : 0,
        //             longitude1 ? longitude1 : 0
        //         ]}
                
        //         rotationAngle={angleFromCoordinate(latitude1 ? latitude1 : 0,
        //         longitude1 ? longitude1 : 0, typeof latitude2 !== 'undefined' ? latitude2 : latitude1,
        //         typeof longitude2!== 'undefined'  ? longitude2 : longitude1)}
        //         rotationOrigin="center"
        //     >
        //         <Popup className={classes.popupContainer}>
        //             <div className={classes.popup}>
        //                 {/* ICAO = {currentLocation.icao} */}
        //                 <br />
        //                 Latitude = {latitude1} 
        //                 <br />
        //                 Longitude = {longitude1}
        //             </div>
                    
        //         </Popup>
        //     </RotatedMarker> 
            
                
    }

    return (
        <div>
            {marker}
        </div>
    )
}

export default withErrorHandler(DinamicMarkers,axios);



// https://labs.sogeti.com/create-a-simple-real-time-notification-with-net-core-reactjs-and-signalr/
