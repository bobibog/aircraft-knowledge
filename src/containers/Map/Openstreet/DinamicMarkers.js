import React, {useState, useEffect, useCallback, useRef, useMemo, forwardRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios-local';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {MapContainer, TileLayer,Marker, Popup} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-rotatedmarker";
import Spinner from '../../../components/UI/Spinner/Spinner';
import markerIcon from '../../../assets/images/airplane-2-multi-size.ico';


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

  // Method to catch previous position value
  const usePreviousValue = (value) => {
    const ref = useRef();
    useEffect(() => {
      // const interval = setInterval(()=>
      //   {      
        ref.current = value;   
        // }, 1000);  
        // return () => clearInterval(interval); 
    });
    return ref.current;
  };


const DinamicMarkers = () => {
    
    const currentLocations = useSelector(state => {
        return state.currentLocation.currentLocations;
    });

    const loading = useSelector(state => {
        return state.currentLocation.currentLocationLoading;
    });    

  //  var latitude1 = 0;
  //  var latitude2 = 0;
  //  var longitude1 = 0;
  //  var longitude2 = 0;
  //  var key = "";

  //   if(currentLocations!=null){
  //       var latitude1 = currentLocations.map((currentLocation)=>(currentLocation.lat ? currentLocation.lat : 0));
  //       console.log("Sirina = "+latitude1);
  //       var longitude1 = currentLocations.map((currentLocation)=>(currentLocation.lon ? currentLocation.lon : 0));
  //       console.log("Duzina = "+ longitude1);
  //       var key = currentLocations.map((currentLocation)=>(currentLocation.id ? currentLocation.id : ""))
  //       console.log("Kljuc = "+key);    
    
  //   }     
      // var latitude2 = usePreviousValue(latitude1 ? latitude1 : 0);
      // console.log("Lat2 = "+latitude2);    
    
      // var longitude2 = usePreviousValue(longitude1 ? longitude1 : 0);
      // console.log("Lon2 = "+longitude2);   
    
        
    const dispatch = useDispatch();

    const onFetchCurrentLocations = useCallback(
        () => dispatch(actions.fetchCurrentLocations())
        , [dispatch]
    );

    
    const angleFromCoordinate=(lat1, lon1, lat2, lon2)=>
    {
        var dLon = (lon2 - lon1);

        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
                * Math.cos(lat2) * Math.cos(dLon);

        var brng = Math.atan2(y, x);

        brng = brng*180;
        brng = (brng + 360) % 360;
        brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

        return brng;
    }
        
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
                        
            <RotatedMarker 
                key={currentLocation.id}
                icon={customIcon}
                position={[                    
                    currentLocation.lat ? currentLocation.lat : "",
                    currentLocation.lon ? currentLocation.lon : ""
                ]}
               
                rotationAngle={angleFromCoordinate(currentLocation.lat ? currentLocation.lat : "",
                                                  currentLocation.lon ? currentLocation.lon : "", 
                                                  currentLocation.lat ? 45 : "",
                                                  currentLocation.lon ? 25 : "")}
                rotationOrigin="center"
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
        //         longitude1 ? longitude1 : 0, latitude2!=null ? latitude2 : 0,
        //         longitude2!=null ? longitude2 : 0)}
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


// https://codesandbox.io/s/loving-curran-yfil5?file=/src/MySimpleMap.js:49-55
// https://stackoverflow.com/questions/66342168/how-to-dynamically-move-and-rotate-marker-in-react-leaflet
// https://bestofreactjs.com/repo/alexandra-c-leaflet-tracking-marker
