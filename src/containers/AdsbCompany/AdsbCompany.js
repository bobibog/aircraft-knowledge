import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAdsbElement from '../../components/SearchElement/SearchAdsbElement/SearchAdsbElement';
import TableAdsb from '../../components/UI/Table/ReactTable/TableAdsb/TableAdsb';
import {AuthContext} from '../../context/auth-context';

const AdsbCompany = props => {
    const authContext = useContext(AuthContext);
    const authCheckState = authContext.authenticationCheckState;    
    let isCompany = authContext.user.company;

    const adsbMessages = useSelector(state => {
        return state.adsbMessageCompany.adsbMessages;
    });    
    
    const adsbMessageCount = useSelector(state => {
        return state.adsbMessageCompany.adsbMessagesCount;
    });
    const loading = useSelector(state => {
        return state.adsbMessageCompany.adsbMessagesLoading;
    });
    const offset = useSelector(state => {
        return state.adsbMessageCompany.adsbMessagesOffset;
    });
    const limit = useSelector(state => {
        return state.adsbMessageCompany.adsbMessagesLimit;
    });
    const page = useSelector(state => {
        return state.adsbMessageCompany.adsbMessagesPage;
    });   
       
    const [nowDateTime, setNowDateTime] = useState(new Date());
    const [twentyFourHoursAgoDateTime, setTwentyFourHoursAgoDateTime] = useState(new Date(Date.now() - 72 * 60 * 60 * 1000));

    useEffect(() => {
        // Update the state variables with the current and 24 hours before date and time
        const interval = setInterval(() => {
          setNowDateTime(new Date());
          setTwentyFourHoursAgoDateTime(new Date(Date.now() - 72 * 60 * 60 * 1000));
        }, 1000); // Update every second
    
        // Clean up interval on component unmount
        return () => clearInterval(interval);
      }, []);
    
      // Function to format date to yyyy-MM-dd HH:mm:ss format
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState(formatDate(twentyFourHoursAgoDateTime));
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState(formatDate(nowDateTime));
    const[address, setAddress]=useState('');
    const[address2, setAddress2]=useState(false);
    const[addressType, setAddressType]=useState('');
    const[addressType2, setAddressType2]=useState(false);
    const[aircraftType, setAircraftType]=useState('');
    const[aircraftType2, setAircraftType2]=useState(false);
    const[airspeedMin, setAirspeedMin]=useState('');
    const[airspeedMax, setAirspeedMax]=useState('');
    const[airspeed2, setAirspeed2]=useState(false);
    const[airspeedStatus, setAirspeedStatus]=useState('');
    const[airspeedStatus2, setAirspeedStatus2]=useState(false);
    const[altInfo, setAltInfo]= useState('');
    const[altInfo2, setAltInfo2]= useState(false);
    const[altUnit, setAltUnit]= useState('');
    const[altUnit2, setAltUnit2]= useState(false);
    const[altitudeMin, setAltitudeMin] = useState('');
    const[altitudeMax, setAltitudeMax] = useState('');
    const[altitude2, setAltitude2] = useState(false);
    const[bds2Identification, setBds2Identification ] = useState('');
    const[bds2Identification2, setBds2Identification2 ] = useState(false);
    const[capability, setCapability] = useState('');
    const[capability2, setCapability2] = useState(false);
    const[cc, setCc] = useState('');
    const[cc2, setCc2] = useState(false);
    const[commBBds, setCommBBds] = useState('');
    const[commBBds2, setCommBBds2] = useState(false);
    const[commBMb, setCommBMb] = useState('');
    const[commBMb2, setCommBMb2] = useState(false);
    const[controlField, setControlField] = useState('');
    const[controlField2, setControlField2] = useState(false);
    const[dr, setDr] = useState('');
    const[dr2, setDr2] = useState(false);
    const[emergencyState, setEmergencyState] = useState('');
    const[emergencyState2, setEmergencyState2] = useState(false);
    const[error, setError] = useState('');
    const[error2, setError2] = useState(false);
    const[esSub, setEsSub] = useState('');
    const[esSub2, setEsSub2] = useState(false);
    const[esType, setEsType] = useState('');
    const[esType2, setEsType2] = useState(false);
    const[ewStatus, setEwStatus] = useState('');
    const[ewStatus2, setEwStatus2] = useState(false);
    const[ewVelocity, setEwVelocity] = useState('');
    const[ewVelocity2, setEwVelocity2] = useState(false);
    const[fFlag, setFFlag] = useState('');
    const[fFlag2, setFFlag2] = useState(false);
    const[flightStatus, setFlightStatus] = useState('');
    const[flightStatus2, setFlightStatus2] = useState(false);
    const[haeBaro, setHaeBaro] = useState('');
    const[haeBaro2, setHaeBaro2] = useState(false);
    const[heading, setHeading] = useState('');
    const[heading2, setHeading2] = useState(false);
    const[headingStatus, setHeadingStatus] = useState('');
    const[headingStatus2, setHeadingStatus2] = useState(false);
    const[icao, setIcao]=useState(''); 
    const[icao2, setIcao2]=useState(false); 
    const[identification, setIdentification] = useState('');
    const[identification2, setIdentification2] = useState(false);
    const[iid, setIid] = useState('');
    const[iid2, setIid2] = useState(false);
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[lat2, setLat2]=useState(false);
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[level2, setLevel2] = useState(false);
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');
    const[lon2, setLon2]=useState(false);
    const[modeA, setModeA] = useState('');
    const[modeA2, setModeA2] = useState(false);
    const[modeAIdent, setModeAIdent] = useState('');
    const[modeAIdent2, setModeAIdent2] = useState(false);
    const[modeC, setModeC] = useState('');
    const[modeC2, setModeC2] = useState(false);
    const[msgType, setMsgType] = useState('');
    const[msgType2, setMsgType2] = useState(false);
    const[nacp, setNacp] = useState('');
    const[nacp2, setNacp2] = useState(false);
    const[nsStatus, setNsStatus] = useState('');
    const[nsStatus2, setNsStatus2] = useState(false);
    const[nsVelocity, setNsVelocity] = useState('');
    const[nsVelocity2, setNsVelocity2] = useState(false);
    const[nucp, setNucp] = useState('');
    const[nucp2, setNucp2] = useState(false);
    const[posDecoding, setPosDecoding] = useState('');
    const[posDecoding2, setPosDecoding2] = useState(false);
    const[report, setReport] = useState('');
    const[report2, setReport2] = useState(false);
    const[sl, setSl] = useState('');
    const[sl2, setSl2] = useState(false);
    const[tFlag, setTFlag] = useState('');
    const[tFlag2, setTFlag2] = useState(false);
    const[squawk, setSquawk] = useState('');
    const[squawk2, setSquawk2] = useState(false);
    const[um, setUm] = useState('');
    const[um2, setUm2] = useState(false);
    const[verticalRateMin, setVerticalRateMin] = useState('');
    const[verticalRateMax, setVerticalRateMax] = useState('');
    const[verticalRate2, setVerticalRate2] = useState(false);
    const[verticalRateSrc, setVerticalRateSrc] = useState('');
    const[verticalRateSrc2, setVerticalRateSrc2] = useState(false);
    const[verticalStatus,setVerticalStatus] = useState('');
    const[verticalStatus2,setVerticalStatus2] = useState(false);
    const[vs, setVs] =useState('');
    const[vs2, setVs2] =useState(false);
    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[timestamp2, setTimestamp2] = useState(false);
    const[stationId, setStationId] = useState('');    
    const[stationId2, setStationId2] = useState(false);
    const[type, setType]=useState('');
    const[type2, setType2]=useState(false);
    const[company, setCompany] = useState(isCompany);
    const[refresh, setRefresh] = useState(0);
    

    const dispatch = useDispatch();
    
    const onFetchAdsb = useCallback(
        () => dispatch(actions.fetchAdsbCompany(offset, limit, address, address2,
            addressType, addressType2, aircraftType, aircraftType2,  airspeedMin, airspeedMax,
             airspeed2,  airspeedStatus,  airspeedStatus2,  altInfo, altInfo2,  altUnit,  altUnit2,
             altitudeMin,  altitudeMax, altitude2, bds2Identification, bds2Identification2, capability,
            capability2, cc, cc2, commBMb, commBMb2, controlField, controlField2, dr, dr2,
            emergencyState, emergencyState2, error, error2, esSub, esSub2, esType, esType2,
            ewStatus, ewStatus2, ewVelocity, ewVelocity2, fFlag, fFlag2, flightStatus, flightStatus2,
            haeBaro, haeBaro2, heading,heading2, headingStatus, headingStatus2, icao, icao2,
            identification, identification2, iid, iid2,  latMin, latMax, lat2, levelMin,
            levelMax, level2, lonMin,  lonMax,  lon2, msgType, msgType2, nacp, nacp2,
            nsStatus, nsStatus2, nsVelocity, nsVelocity2, nucp, nucp2, posDecoding,  posDecoding2,
            report, report2, sl, sl2,  squawk, squawk2, stationId, stationId2, tFlag, tFlag2,
            timestampMin, timestampMax, timestamp2, type, type2, um, um2, verticalRateMin,
            verticalRateMax, verticalRate2, verticalRateSrc, verticalRateSrc2, verticalStatus, verticalStatus2, vs, vs2,
            acarsMessageDateTimeMin, acarsMessageDateTimeMax , commBBds, commBBds2,
            modeA, modeA2,  modeAIdent, modeAIdent2, modeC, modeC2, company))
        , [dispatch, offset, limit, address, address2,
            addressType, addressType2, aircraftType, aircraftType2,  airspeedMin, airspeedMax,
             airspeed2,  airspeedStatus,  airspeedStatus2,  altInfo, altInfo2,  altUnit,  altUnit2,
             altitudeMin,  altitudeMax, altitude2, bds2Identification, bds2Identification2, capability,
            capability2, cc, cc2, commBMb, commBMb2, controlField, controlField2, dr, dr2,
            emergencyState, emergencyState2, error, error2, esSub, esSub2, esType, esType2,
            ewStatus, ewStatus2, ewVelocity, ewVelocity2, fFlag, fFlag2, flightStatus, flightStatus2,
            haeBaro, haeBaro2, heading,heading2, headingStatus, headingStatus2, icao, icao2,
            identification, identification2, iid, iid2,  latMin, latMax, lat2, levelMin,
            levelMax, level2, lonMin,  lonMax,  lon2, msgType, msgType2, nacp, nacp2,
            nsStatus, nsStatus2, nsVelocity, nsVelocity2, nucp, nucp2, posDecoding,  posDecoding2,
            report, report2, sl, sl2,  squawk, squawk2, stationId, stationId2, tFlag, tFlag2,
            timestampMin, timestampMax, timestamp2, type, type2, um, um2, verticalRateMin,
            verticalRateMax, verticalRate2, verticalRateSrc, verticalRateSrc2, verticalStatus, verticalStatus2, vs, vs2,
            acarsMessageDateTimeMin , acarsMessageDateTimeMax , commBBds, commBBds2,
            modeA, modeA2,  modeAIdent, modeAIdent2, modeC, modeC2, company]
    );    
    
    const onSetAdsbOffsetLimit = (offset, limit) => dispatch(actions.setAdsbOffsetLimitCompany(offset, limit));    
    const onSetAdsbPage = (page) => dispatch(actions.setAdsbPageCompany(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAdsbOffsetLimit(tableOffset, tableLimit);   
    };
    const setAdsbPageHandler = page => {                
        onSetAdsbPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (address, address2,
        addressType, addressType2, aircraftType, aircraftType2,  airspeedMin, airspeedMax,
         airspeed2,  airspeedStatus,  airspeedStatus2,  altInfo, altInfo2,  altUnit,  altUnit2,
         altitudeMin,  altitudeMax, altitude2, bds2Identification, bds2Identification2, capability,
        capability2, cc, cc2, commBMb, commBMb2, controlField, controlField2, dr, dr2,
        emergencyState, emergencyState2, error, error2, esSub, esSub2, esType, esType2,
        ewStatus, ewStatus2, ewVelocity, ewVelocity2, fFlag, fFlag2, flightStatus, flightStatus2,
        haeBaro, haeBaro2, heading,heading2, headingStatus, headingStatus2, icao, icao2,
        identification, identification2, iid, iid2,  latMin, latMax, lat2, levelMin,
        levelMax, level2, lonMin,  lonMax,  lon2, msgType, msgType2, nacp, nacp2,
        nsStatus, nsStatus2, nsVelocity, nsVelocity2, nucp, nucp2, posDecoding,  posDecoding2,
        report, report2, sl, sl2,  squawk, squawk2, stationId, stationId2, tFlag, tFlag2,
        timestampMin, timestampMax, timestamp2, type, type2, um, um2, verticalRateMin,
        verticalRateMax, verticalRate2, verticalRateSrc, verticalRateSrc2, verticalStatus, verticalStatus2, vs, vs2,
        acarsMessageDateTimeMin, acarsMessageDateTimeMax, commBBds, commBBds2,
        modeA, modeA2,  modeAIdent, modeAIdent2, modeC, modeC2) => {  
        onSetAdsbOffsetLimit(0, limit);
        onSetAdsbPage(0);     
        setAddress(address);
        setAddress2(address2);
        setAddressType(addressType);
        setAddressType2(addressType2);
        setAircraftType(aircraftType);
        setAircraftType2(aircraftType2);
        setAirspeedMin(airspeedMin);
        setAirspeedMax(airspeedMax);
        setAirspeed2(airspeed2);
        setAirspeedStatus(airspeedStatus);
        setAirspeedStatus2(airspeedStatus2);
        setAltInfo(altInfo);
        setAltInfo2(altInfo2);
        setAltUnit(altUnit);
        setAltUnit2(altUnit2);
        setAltitudeMin(altitudeMin);
        setAltitudeMax(altitudeMax);
        setAltitude2(altitude2)
        setBds2Identification(bds2Identification);
        setBds2Identification2(bds2Identification2);
        setCapability(capability);
        setCapability2(capability2);
        setCc(cc);
        setCc2(cc2);
        setCommBBds(commBBds);
        setCommBBds2(commBBds2);
        setCommBMb(commBMb);
        setCommBMb2(commBMb2);
        setControlField(controlField);
        setControlField2(controlField2);
        setDr(dr);
        setDr2(dr2);
        setEmergencyState(emergencyState);
        setEmergencyState2(emergencyState2);
        setError(error);
        setError2(error2);
        setEsSub(esSub);
        setEsSub2(esSub2);
        setEsType(esType);
        setEsType2(esType2);
        setEwStatus(ewStatus);
        setEwStatus2(ewStatus2);
        setEwVelocity(ewVelocity);
        setEwVelocity2(ewVelocity2);
        setFFlag(fFlag);
        setFFlag2(fFlag2);
        setFlightStatus(flightStatus);
        setFlightStatus2(flightStatus2);
        setHaeBaro(haeBaro);
        setHaeBaro2(haeBaro2);
        setHeading(heading);
        setHeading2(heading2);
        setHeadingStatus(headingStatus);
        setHeadingStatus2(headingStatus2);
        setIcao(icao);
        setIcao2(icao2);
        setIdentification(identification);
        setIdentification2(identification2);
        setIid(iid);
        setIid2(iid2);
        setLatMin(latMin);
        setLatMax(latMax); 
        setLat2(lat2);        
        setLevelMin(levelMin);
        setLevelMax(levelMax);
        setLevel2(level2);
        setLonMin(lonMin);
        setLonMax(lonMax);
        setLon2(lon2);
        setModeA(modeA);
        setModeA2(modeA2);
        setModeAIdent(modeAIdent);
        setModeAIdent2(modeAIdent2);
        setModeC(modeC);
        setModeC2(modeC2);
        setMsgType(msgType);
        setMsgType2(msgType2);
        setNacp(nacp);
        setNacp2(nacp2);
        setNsStatus(nsStatus);
        setNsStatus2(nsStatus2);
        setNsVelocity(nsVelocity);
        setNsVelocity2(nsVelocity2);
        setNucp(nucp);
        setNucp2(nucp2);
        setPosDecoding(posDecoding);
        setPosDecoding2(posDecoding2);
        setReport(report);
        setReport2(report2);
        setSl(sl);
        setSl2(sl2);
        setSquawk(squawk);
        setSquawk2(squawk2);       
        setStationId(stationId);
        setStationId2(stationId2);
        setTFlag(tFlag);
        setTFlag2(tFlag2);
        setTimestampMin(timestampMin);
        setTimestampMax(timestampMax);  
        setTimestamp2(timestamp2);        
        setType(type);
        setType2(type2);
        setUm(um);
        setUm2(um2);
        setVerticalRateMin(verticalRateMin);
        setVerticalRateMax(verticalRateMax);
        setVerticalRate2(verticalRate2);
        setVerticalRateSrc(verticalRateSrc);
        setVerticalRateSrc2(verticalRateSrc2);
        setVerticalStatus(verticalStatus);
        setVerticalStatus2(verticalStatus2);
        setVs(vs);
        setVs2(vs2);
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin);
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax);  
    };
    
    
    const resetSearchHandler = () => {
        onSetAdsbOffsetLimit(0, 10);
        onSetAdsbPage(0);
        setAddress('');
        setAddress2(false);
        setAddressType('');
        setAddressType2(false);
        setAircraftType('');
        setAircraftType2(false);
        setAirspeedMin('');
        setAirspeedMax('');
        setAirspeed2(false);
        setAirspeedStatus('');
        setAirspeedStatus2(false);
        setAltInfo('');
        setAltInfo2(false);
        setAltUnit('');
        setAltUnit2(false);
        setAltitudeMin('');
        setAltitudeMax('');
        setAltitude2(false);
        setBds2Identification('');
        setBds2Identification2(false);
        setCapability('');
        setCapability2(false);
        setCc('');
        setCc2(false);
        setCommBBds('');
        setCommBBds2(false);
        setCommBMb('');
        setCommBMb2(false);
        setControlField('');
        setControlField2(false);
        setDr('');
        setDr2(false);
        setEmergencyState('');
        setEmergencyState2(false);
        setError('');
        setError2(false);
        setEsSub('');
        setEsSub2(false);
        setEsType('');
        setEsType2(false);
        setEwStatus('');
        setEwStatus2(false);
        setEwVelocity('');
        setEwVelocity2(false);
        setFFlag('');
        setFFlag2(false);
        setFlightStatus('');
        setFlightStatus2(false);
        setHaeBaro('');
        setHaeBaro2(false);
        setHeading('');
        setHeading2(false);
        setHeadingStatus('');
        setHeadingStatus2(false);
        setIcao('');
        setIcao2(false);
        setIdentification('');
        setIdentification2(false);
        setIid('');
        setIid2(false);
        setLatMin('');
        setLatMax('');  
        setLat2(false);      
        setLevelMin('');
        setLevelMax('');
        setLevel2(false);
        setLonMin('');
        setLonMax('');
        setLon2(false);
        setModeA('');
        setModeA2(false);
        setModeAIdent('');
        setModeAIdent2(false);
        setModeC('');
        setModeC2(false);
        setMsgType('');
        setMsgType2(false);
        setNacp('');
        setNacp2(false);
        setNsStatus('');
        setNsStatus2(false);
        setNsVelocity('');
        setNsVelocity2(false);
        setNucp('');
        setNucp2(false);
        setPosDecoding('');
        setPosDecoding2(false);
        setReport('');
        setReport2(false);
        setSl('');
        setSl2(false);
        setSquawk('');  
        setSquawk2(false);     
        setStationId('');
        setStationId2(false);
        setTFlag('');
        setTFlag2(false);
        setTimestampMin('');
        setTimestampMax('');
        setTimestamp2(false);        
        setType('');
        setType2(false);
        setUm('');
        setUm2(false);
        setVerticalRateMin('');
        setVerticalRateMax('');
        setVerticalRate2(false);
        setVerticalRateSrc('');
        setVerticalRate2(false);
        setVerticalStatus('');
        setVerticalStatus2(false);
        setVs('');
        setVs2(false);
        setAcarsMessageDateTimeMin('');
        setAcarsMessageDateTimeMax('');    
        setAllOption(0);    
    };    
       
    useEffect(() => { 
        
        onFetchAdsb();
        authCheckState();        
        setCompany(isCompany ? isCompany : '');

        // setTimeout(()=>{
        //     setRefresh(1);       
        // }, 3000);     
        
        
    }, [onFetchAdsb, authCheckState, setCompany, refresh]); 
    
    //console.log("Latitude="+adsbMessages);
        
    const akrxPageHeader =
        <CardsInBox            
            backColor="#F0F8FF" 
            
        />; 
        
    const[allOption, setAllOption]=useState(0);

    function allChanger(allOption){
        if(allOption==0){
            setAllOption(1);
        return allOption; 
        }
               
    };
    
    //console.log(acarsMessages);
      
    let adsbTable = <Spinner />;
    if (!adsbMessages && !loading  ) {
        adsbTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read Adsb messages from the server!</p>;
    }
    
    if (adsbMessages && !loading ) {
          

        adsbTable =  <TableAdsb
            data={adsbMessages}
            rowsPerPageDef={limit}            
            totalDataCount={adsbMessageCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setAdsbPageHandler}   
            allOption={allOption}                     
        />;
        
    }      
    
    return (
        <div style={{marginTop:'-2px'}}>                       
            {akrxPageHeader}             
            <SearchAdsbElement
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />                                     
            {adsbTable}                       
        </div>        
    );
};

export default withErrorHandler(AdsbCompany, axios);