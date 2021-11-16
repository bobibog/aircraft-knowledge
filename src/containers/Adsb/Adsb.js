import React, {useState, useEffect, useCallback, useRef} from 'react';
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

const Adsb = props => {
    const adsbMessages = useSelector(state => {
        return state.adsbMessage.adsbMessages;
    });    

    //console.log(adsbMessages);
    
    const adsbMessageCount = useSelector(state => {
        return state.adsbMessage.adsbMessagesCount;
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
    const page = useSelector(state => {
        return state.adsbMessage.adsbMessagesPage;
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
        () => dispatch(actions.fetchAdsb(offset, limit, address, addressType, aircraftType, airspeedMin, 
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
    
    const onSetAdsbOffsetLimit = (offset, limit) => dispatch(actions.setAdsbOffsetLimit(offset, limit));    
    const onSetAdsbPage = (page) => dispatch(actions.setAdsbPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAdsbOffsetLimit(tableOffset, tableLimit);   
    };
    const setAdsbPageHandler = page => {                
        onSetAdsbPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (address, addressType, aircraftType, airspeedMin, 
        airspeedMax, airspeedStatus, altInfo, altUnit, altitudeMin, altitudeMax, bds2Identification,
        capability, cc, commBBds, commBMb, controlField, dr, emergencyState, error, esSub, esType, 
        ewStatus, ewVelocity, fFlag, flightStatus, haeBaro, heading, headingStatus, icao, identification,
        iid, latMin, latMax, levelMin, levelMax, lonMin, lonMax, modeA, modeAIdent, modeC, msgType, 
        nacp, nsStatus, nsVelocity, nucp, posDecoding, report, sl, squawk, stationId, tFlag,
        timestampMin, timestampMax, type, um, verticalRateMin, verticalRateMax, verticalRateSrc, 
        verticalStatus, vs, acarsMessageDateTimeMin, acarsMessageDateTimeMax) => {  
        onSetAdsbOffsetLimit(0, limit);
        onSetAdsbPage(0);     
        setAddress(address);
        setAddressType(addressType);
        setAircraftType(aircraftType);
        setAirspeedMin(airspeedMin);
        setAirspeedMax(airspeedMax);
        setAirspeedStatus(airspeedStatus);
        setAltInfo(altInfo);
        setAltUnit(altUnit);
        setAltitudeMin(altitudeMin);
        setAltitudeMax(altitudeMax);
        setBds2Identification(bds2Identification);
        setCapability(capability);
        setCc(cc);
        setCommBBds(commBBds);
        setCommBMb(commBMb);
        setControlField(controlField);
        setDr(dr);
        setEmergencyState(emergencyState);
        setError(error);
        setEsSub(esSub);
        setEsType(esType);
        setEwStatus(ewStatus);
        setEwVelocity(ewVelocity);
        setFFlag(fFlag);
        setFlightStatus(flightStatus);
        setHaeBaro(haeBaro);
        setHeading(heading);
        setHeadingStatus(headingStatus);
        setIcao(icao);
        setIdentification(identification);
        setIid(iid);
        setLatMin(latMin);
        setLatMax(latMax);        
        setLevelMin(levelMin);
        setLevelMax(levelMax);
        setLonMin(lonMin);
        setLonMax(lonMax);
        setModeA(modeA);
        setModeAIdent(modeAIdent);
        setModeC(modeC);
        setMsgType(msgType);
        setNacp(nacp);
        setNsStatus(nsStatus);
        setNsVelocity(nsVelocity);
        setNucp(nucp);
        setPosDecoding(posDecoding);
        setReport(report);
        setSl(sl);
        setSquawk(squawk);       
        setStationId(stationId);
        setTFlag(tFlag);
        setTimestampMin(timestampMin);
        setTimestampMax(timestampMax);        
        setType(type);
        setUm(um);
        setVerticalRateMin(verticalRateMin);
        setVerticalRateMax(verticalRateMax);
        setVerticalRateSrc(verticalRateSrc);
        setVerticalStatus(verticalStatus);
        setVs(vs);
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin);
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax);  
    };
    
    
    const resetSearchHandler = () => {
        onSetAdsbOffsetLimit(0, 10);
        onSetAdsbPage(0);
        setAddress('');
        setAddressType('');
        setAircraftType('');
        setAirspeedMin('');
        setAirspeedMax('');
        setAirspeedStatus('');
        setAltInfo('');
        setAltUnit('');
        setAltitudeMin('');
        setAltitudeMax('');
        setBds2Identification('');
        setCapability('');
        setCc('');
        setCommBBds('');
        setCommBMb('');
        setControlField('');
        setDr('');
        setEmergencyState('');
        setError('');
        setEsSub('');
        setEsType('');
        setEwStatus('');
        setEwVelocity('');
        setFFlag('');
        setFlightStatus('');
        setHaeBaro('');
        setHeading('');
        setHeadingStatus('');
        setIcao('');
        setIdentification('');
        setIid('');
        setLatMin('');
        setLatMax('');        
        setLevelMin('');
        setLevelMax('');
        setLonMin('');
        setLonMax('');
        setModeA('');
        setModeAIdent('');
        setModeC('');
        setMsgType('');
        setNacp('');
        setNsStatus('');
        setNsVelocity('');
        setNucp('');
        setPosDecoding('');
        setReport('');
        setSl('');
        setSquawk('');       
        setStationId('');
        setTFlag('');
        setTimestampMin('');
        setTimestampMax('');        
        setType('');
        setUm('');
        setVerticalRateMin('');
        setVerticalRateMax('');
        setVerticalRateSrc('');
        setVerticalStatus('');
        setVs('');
        setAcarsMessageDateTimeMin('');
        setAcarsMessageDateTimeMax('');    
        setAllOption(0);    
    };    
       
    useEffect(() => { 
        
            onFetchAdsb();
        
    }, [onFetchAdsb]); 
    
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

export default withErrorHandler(Adsb, axios);