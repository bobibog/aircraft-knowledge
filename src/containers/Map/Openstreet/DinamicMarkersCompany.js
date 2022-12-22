import React, {useState, useEffect, useCallback, useRef, useMemo, forwardRef, useLayoutEffect, useContext} from 'react';
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
import {AuthContext} from '../../../context/auth-context';


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



const DinamicMarkersCompany = (props) => {
    
  const authContext = useContext(AuthContext);
    const authCheckState = authContext.authenticationCheckState;    
    let isCompany = authContext.user.company;  
  
  const currentLocations = useSelector(state => {
        return state.currentLocationCompany.currentLocations;
    });
        
    //console.log('OPNSKY='+openSkys);

    const loading = useSelector(state => {
        return state.currentLocationCompany.currentLocationLoading;
    }); 
    
    const aircraftJson = useSelector(state => {
      return state.aircraft.aircraftJson;  
    });       

    
    const[previousAngle, setPreviousAngle]= useState(0);

    const[company, setCompany] = useState(isCompany);
    const[refresh, setRefresh] = useState(0);

    const[icao, setIcao] = useState('');
    //const[registration, setRegistration] = useState('');
    let registration = '';

       if(aircraftJson != null){
         registration = aircraftJson.registration
         //setRegistration(aircraftJson.registration);
         //console.log("A="+ registration);
       } 
    
    
    //console.log("AircraftJSON="+aircraftJson);  
        
        
    const dispatch = useDispatch();

    const onFetchCurrentLocationsCompany = useCallback(
        () => dispatch(actions.fetchCurrentLocationsCompany(props.lat1, props.lat2, props.lon1, props.lon2, company))
        , [dispatch, props.lat1, props.lat2, props.lon1, props.lon2, company]
    );
    
    const onFetchAircraftRegistration = useCallback(
      () => dispatch(actions.fetchAircraftRegistration(icao))
      , [dispatch, icao]
  );   
    

    useEffect(() => {       
      
      const interval = setInterval(()=>
        {           
          authCheckState();        
          setCompany(isCompany ? isCompany : '');  
          onFetchCurrentLocationsCompany();     
            
        }, 5000);
        return () => clearInterval(interval);         
    }, [props.lat1, props.lat2, props.lon1, props.lon2, props.alt1, props.alt2, authCheckState, setCompany, refresh]);

    useEffect(()=>{
      onFetchAircraftRegistration();
    },[icao]);


    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [props.lengthPix,props.widthPix],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon});
    //var openSkyIcon = new LeafIcon({iconUrl:markerIcon1});    
        
    let marker = <Spinner />
    
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
                eventHandlers={{
                    click: () => {
                    setIcao(currentLocation.icao)
                    },
                }}
                
            >            
                
                <Popup className={classes.popupContainer}>
                    <div className={classes.popup}>
                        ICAO = {currentLocation.icao}                         
                        <br/>
                       {/* Registration = {aircraftJson.registration} */}
                    </div>
                    
                </Popup>
            </RotatedMarker>
            
      ))
    }    

    return (
        <div>
            {marker}            
        </div>
    )
}

export default withErrorHandler(DinamicMarkersCompany,axios);




