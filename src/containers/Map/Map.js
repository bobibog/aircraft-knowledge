import React, {useState, useEffect, useCallback} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {useSelector, useDispatch} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-local';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Map = () =>{
    
    const adsbMessages = useSelector(state => {
        return state.adsbMessage.adsbMessages;
    }); 
    const loading = useSelector(state => {
        return state.adsbMessage.adsbMessagesLoading;
    });
    const offset = useSelector(state => {
        return state.adsbMessage.adsbMessagesOffset;
    });
    const limit = useSelector(state => {
        return state.adsbMessage.adsbMessagesLimit;
    });


    //var adsb = {...adsbMessages};

    //console.log(adsb[5]);

    //var obj5 = {...adsb}

    

    

    const[viewport, setViewport] = useState({
        latitude: 44.8178131,
        longitude: 20.4568974,
        width: "100vw",
        height:"100vh",
        zoom: 2
    });

    

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');
    const[address, setAddress]=useState('');
    const[addressType, setAddressType]=useState('');
    const[aircraftType, setAircraftType]=useState('');
    const[airspeedMin, setAirspeedMin]=useState('');
    const[airspeedMax, setAirspeedMax]=useState('');
    const[airspeedStatus, setAirspeedStatus]=useState('');
    const[altInfo, setAltInfo]= useState('');
    const[altUnit, setAltUnit]= useState('');
    const[altitudeMin, setAltitudeMin] = useState('');
    const[altitudeMax, setAltitudeMax] = useState('');
    const[bds2Identification, setBds2Identification ] = useState('');
    const[capability, setCapability] = useState('');
    const[cc, setCc] = useState('');
    const[commBBds, setCommBBds] = useState('');
    const[commBMb, setCommBMb] = useState('');
    const[controlField, setControlField] = useState('');
    const[dr, setDr] = useState('');
    const[emergencyState, setEmergencyState] = useState('');
    const[error, setError] = useState('');
    const[esSub, setEsSub] = useState('');
    const[esType, setEsType] = useState('');
    const[ewStatus, setEwStatus] = useState('');
    const[ewVelocity, setEwVelocity] = useState('');
    const[fFlag, setFFlag] = useState('');
    const[flightStatus, setFlightStatus] = useState('');
    const[haeBaro, setHaeBaro] = useState('');
    const[heading, setHeading] = useState('');
    const[headingStatus, setHeadingStatus] = useState('');
    const[icao, setIcao]=useState(''); 
    const[identification, setIdentification] = useState('');
    const[iid, setIid] = useState('');
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');
    const[modeA, setModeA] = useState('');
    const[modeAIdent, setModeAIdent] = useState('');
    const[modeC, setModeC] = useState('');
    const[msgType, setMsgType] = useState('');
    const[nacp, setNacp] = useState('');
    const[nsStatus, setNsStatus] = useState('');
    const[nsVelocity, setNsVelocity] = useState('');
    const[nucp, setNucp] = useState('');
    const[posDecoding, setPosDecoding] = useState('');
    const[report, setReport] = useState('');
    const[sl, setSl] = useState('');
    const[tFlag, setTFlag] = useState('');
    const[squawk, setSquawk] = useState('');
    const[um, setUm] = useState('');
    const[verticalRateMin, setVerticalRateMin] = useState('');
    const[verticalRateMax, setVerticalRateMax] = useState('');
    const[verticalRateSrc, setVerticalRateSrc] = useState('');
    const[verticalStatus,setVerticalStatus] = useState('');
    const[vs, setVs] =useState('');
    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[stationId, setStationId] = useState('');    
    const[type, setType]=useState('');

    const dispatch = useDispatch();
    
    const onFetchAdsb = useCallback(
        () => dispatch(actions.fetchAdsb(offset, limit,address, addressType, aircraftType, airspeedMin, 
            airspeedMax, airspeedStatus, altInfo, altUnit, altitudeMin, altitudeMax, bds2Identification,
            capability, cc, commBBds, commBMb, controlField, dr, emergencyState, error, esSub, esType, 
            ewStatus, ewVelocity, fFlag, flightStatus, haeBaro, heading, headingStatus, icao, identification,
            iid, latMin, latMax, levelMin, levelMax, lonMin, lonMax, modeA, modeAIdent, modeC, msgType, 
            nacp, nsStatus, nsVelocity, nucp, posDecoding, report, sl, squawk, stationId, tFlag,
            timestampMin, timestampMax, type, um, verticalRateMin, verticalRateMax, verticalRateSrc, 
            verticalStatus, vs, acarsMessageDateTimeMin, acarsMessageDateTimeMax))
        , [dispatch, offset, limit, address, addressType, aircraftType, airspeedMin, airspeedMax, airspeedStatus,
            altInfo, altUnit, altitudeMin, altitudeMax, bds2Identification, capability, cc, commBBds, 
            commBMb, controlField, dr, emergencyState, error, esSub, esType, ewStatus, ewVelocity, fFlag,
            flightStatus, haeBaro, heading, headingStatus, icao, identification, iid, latMin, latMax, 
            levelMin, levelMax, lonMin, lonMax, modeA, modeAIdent, modeC, msgType, nacp, nsStatus, 
            nsVelocity, nucp, posDecoding, report, sl, squawk, stationId, tFlag, timestampMin, 
            timestampMax, type, um, verticalRateMin, verticalRateMax, verticalRateSrc, verticalStatus, vs,
            acarsMessageDateTimeMin, acarsMessageDateTimeMax]
    );

    useEffect(() => { 
        onFetchAdsb();      

    }, [onFetchAdsb]);

    let adsbData = <Spinner />;
    if (!adsbMessages && !loading  ) {
        adsbData = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read Adsb messages from the server!</p>;
    }
    
    if (adsbMessages && !loading ) {
        var latitude = adsbMessages.map(a => a.lat);
        var longitude = adsbMessages.map(b=> b.lon);

        console.log("LAT="+latitude);
        console.log("LON="+longitude);       
        
        
        adsbData =  
        <div>
        <ReactMapGL {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}    
                        onViewportChange={(viewport)=>{setViewport(viewport)}}  
                        mapStyle="mapbox://styles/mladenzv/ckvv71grn2cxo14nmuq5g3jqh"      
            >
                {/* MARKERI */}
                                  
                   { adsbMessages.map((avion)=>(
                    
                        <Marker key={avion.timestamp} latitude={avion.lat} longitude={avion.lon}>
                            <div>
                                AVION
                            </div>
                        </Marker>               
                    ))  }                  
                 

            </ReactMapGL>
        </div>
    }

    return (
        {adsbData}
    )
}

export default withErrorHandler(Map, axios);

// https://www.youtube.com/watch?v=JJatzkPcmoI
