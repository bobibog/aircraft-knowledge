import React, {useState, useEffect, useRef} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAdsbElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {FcAlphabeticalSortingAz} from 'react-icons/fc';
import {FcAlphabeticalSortingZa} from 'react-icons/fc';
import {FcNumericalSorting12} from 'react-icons/fc';
import {FcNumericalSorting21} from 'react-icons/fc';
import SearchByColumn from '../SearchByColumn/SearchByColumn';
import {FcSearch} from 'react-icons/fc';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const  SearchAdsbElement = (props) => {

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');
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


    // DATE-TIME input VALIDATION
    const[dateFromErr, setDateFromErr] = useState({});
    const[dateToErr, setDateToErr] = useState({});

    var hoursMin = acarsMessageDateTimeMin.slice(11, 13);    
    var minutesMin = acarsMessageDateTimeMin.slice(14, 16);   
    var dayMin = acarsMessageDateTimeMin.slice(8, 10);    
    var monthMin = acarsMessageDateTimeMin.slice(5, 7);    
    var yearMin = acarsMessageDateTimeMin.slice(0, 4);

    var hoursMax = acarsMessageDateTimeMax.slice(11, 13);    
    var minutesMax = acarsMessageDateTimeMax.slice(14, 16);   
    var dayMax = acarsMessageDateTimeMax.slice(8, 10);    
    var monthMax = acarsMessageDateTimeMax.slice(5, 7);    
    var yearMax = acarsMessageDateTimeMax.slice(0, 4);
    

    const onBlur1 =(e)=>{
        e.preventDefault();
        const isValid1 = dateValidation1();
    }
    
    const onBlur2 =(e)=>{
        e.preventDefault();
        const isValid2 = dateValidation2();
    }    

    const dateValidation1 = () =>{
        const dateFromErr = {};        
        let isValid1 = true;

        if(yearMin=='' || monthMin=='' || dayMin=='' || hoursMin=='' || minutesMin=='' ){
            dateFromErr.dateFromInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid1 = false;
        } 

        setDateFromErr(dateFromErr);        
        return isValid1;
    }
    const dateValidation2 = () =>{
        
        const dateToErr = {};
        let isValid2 = true;

        if(yearMax=='' || monthMax=='' || dayMax=='' || hoursMax=='' || minutesMax=='' ){
            dateToErr.dateToInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid2 = false;
        }         
        setDateToErr(dateToErr);
        return isValid2;
    }    

    const resetSearchHandler = () => {        
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
        
        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();        
    };    

    const addressInputConfig = {
        type:'text',
        placeholder:'Address'
    }
    const addressTypeInputConfig = {
        type:'number',
        min:0,
        placeholder:'Address Type'
    }
    const aircraftTypeInputConfig = {
        type:'text',
        placeholder:'Aircraft Type'
    }
    const airspeedMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Airspeed MIN'
    }
    const airspeedMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Airspeed MAX'
    }
    const airspeedStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Airspeed Status'
    }
    const altInfoInputConfig = {
        type:'number',
        min:0,
        placeholder:'Alt Info'
    }
    const altUnitInputConfig = {
        type:'number',
        min:0,
        placeholder:'Alt Unit'
    }
    const altitudeMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Altitude MIN'
    }
    const altitudeMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Altitude MAX'
    }
    const bds2InputConfig = {
        type:'text',
        placeholder:'Bds2 Identification'
    }
    const capabilityInputConfig = {
        type:'number',
        min:0,
        placeholder:'Capabilty'
    }
    const ccInputConfig = {
        type:'number',
        min:0,
        placeholder:'Cc'
    }
    const commBdsInputConfig = {
        type:'text',       
        placeholder:'Comm Bds'
    }
    const commBBmbInputConfig = {
        type:'text',       
        placeholder:'Comm Bmb'
    }
    const controlFieldInputConfig = {
        type:'number',
        min:0,
        placeholder:'Control Field'
    }
    const drInputConfig = {
        type:'number',
        min:0,
        placeholder:'Dr'
    }
    const emergencyStateInputConfig = {
        type:'number',
        min:0,
        placeholder:'Emergency State'
    }
    const errorInputConfig = {
        type:'number',
        min:0,
        placeholder:'Error'
    }
    const esSubInputConfig = {
        type:'number',
        min:0,
        placeholder:'Es Sub'
    }
    const esTypeInputConfig = {
        type:'number',
        min:0,
        placeholder:'Es Type'
    }
    const ewStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Ew Status'
    }
    const ewVelocityInputConfig = {
        type:'number',        
        placeholder:'Ew Velocity'
    }
    const fFlagInputConfig = {
        type:'text',        
        placeholder:'F Flag'
    }
    const flightStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Flight Status'
    }
    const haeBaroInputConfig = {
        type:'text',
        min:0,
        placeholder:'Hae Baro'
    }
    const headingInputConfig = {
        type:'number',
        min:0,
        placeholder:'Heading'
    }
    const headingStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Heading Status'
    }
    const icaoInputConfig = {
        type:'text',       
        placeholder:'Icao'
    }
    const identificationInputConfig = {
        type:'text',       
        placeholder:'Identification'
    }
    const iidInputConfig = {
        type:'text',       
        placeholder:'Iid'
    }
    const latMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Latitude MIN'
    }
    const latMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Latitude MAX'
    }
    const levelMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Level MIN'
    }
    const levelMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Level MAX'
    }
    const lonMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Longitude MIN'
    }
    const lonMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Longitude MAX'
    }
    const modeAInputConfig = {
        type:'text',        
        placeholder:'Mode A'
    }
    const modeAIdentInputConfig = {
        type:'text',        
        placeholder:'Mode A Ident'
    }
    const modeCInputConfig = {
        type:'text',        
        placeholder:'Mode C'
    }
    const msgTypeInputConfig = {
        type:'text',        
        placeholder:'Message Type'
    }
    const nacpInputConfig = {
        type:'number',
        min:0,
        placeholder:'Nacp'
    }
    const nsStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Ns Status'
    }
    const nsVelocityInputConfig = {
        type:'number',
        min:0,
        placeholder:'Ns Velocity'
    }
    const nucpInputConfig = {
        type:'number',
        min:0,
        placeholder:'Nucp'
    }
    const posDecodingInputConfig = {
        type:'number',
        min:0,
        placeholder:'Pos Decoding'
    }
    const reportInputConfig = {
        type:'text',        
        placeholder:'Report'
    }
    const slInputConfig = {
        type:'number',
        min:0,
        placeholder:'Sl'
    }
    const squawkInputConfig = {
        type:'text',        
        placeholder:'Squawk'
    }
    const stationIdInputConfig = {
        type:'text',        
        placeholder:'Station ID'
    }
    const tFlagInputConfig = {
        type:'text',        
        placeholder:'T Flag'
    }   
    const timeStampMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Timestamp MIN'
    }
    const timeStampMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Timestamp MAX'
    }
    const typeInputConfig = {
        type:'text',        
        placeholder:'Type'
    }
    const umInputConfig = {
        type:'number',
        min:0,
        placeholder:'Um'
    }
    const verticalMinRateInputConfig = {
        type:'number',
        min:0,
        placeholder:'Vertical Rate MIN'
    }
    const verticalMaxRateInputConfig = {
        type:'number',
        min:0,
        placeholder:'Vertical Rate MAX'
    }
    const verticalRateSrcInputConfig = {
        type:'number',
        min:0,
        placeholder:'Vertical Rate Src'
    }
    const verticalStatusInputConfig = {
        type:'number',
        min:0,
        placeholder:'Vertical Status'
    }
    const vsInputConfig = {
        type:'number',
        min:0,
        placeholder:'Vs'
    }      
    
    const handleChangeYearMax = (e) => {
        const inputValue = e.target.value;
        // Check if the input is a valid date-time format
        // Assuming YYYY-MM-DDTHH:MM format for datetime-local input
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inputValue)) {
            setAcarsMessageDateTimeMax(inputValue);
        }
        // If not a valid format, do not update the state
    }

    const handleChangeYearMin= (e) => {
        const inputValue = e.target.value;
        // Check if the input is a valid date-time format
        // Assuming YYYY-MM-DDTHH:MM format for datetime-local input
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inputValue)) {
            setAcarsMessageDateTimeMin(inputValue);
        }
        // If not a valid format, do not update the state
    }

    const acarsMessageDateTimeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const acarsMessageDateTimeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }     
    
    // Changing Dropdown Button title according to event (search or reset click)
    const[filter, setFilter] = useState('');
    let title = filter ? 'FILTER ON': 'FILTER OFF';

    //Closing/Opening DropdownButton
    const[showDropdown, setShowDropdown] = useState(false);

    const open=()=>{
        setShowDropdown(true);
    };
    
    const toggleDropdown = () => {        
            setShowDropdown(false);        
    };

    // FUNKCION WHICH LISTEN EVENTS OUTSIDE ELEMENT
    function useOutsideAlerter(ref) {
        useEffect(() => {
          
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleDropdown();
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
    // /

    const changer=0;

    const onSerach = (e) =>{
        props.clickedSearch(address, address2,
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
            modeA, modeA2,  modeAIdent, modeAIdent2, modeC, modeC2);
        setFilter('a');
        toggleDropdown();
        props.allChanger(changer);
    };

    const onReset =(e)=>{
        resetSearchHandler();
        setFilter('');
        toggleDropdown();
    };
                   
    return (
        <div className={classes.container}> 
            {/* <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}> */}
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef} >
                <div className={classes.dropdownShow}>
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                                      
                                    <Input 
                                        value={acarsMessageDateTimeMin}
                                        // changed={(e)=>setAcarsMessageDateTimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={handleChangeYearMin}                                        
                                        elementType='input' 
                                        elementConfig= {acarsMessageDateTimeMinInputConfig} 
                                        toggle="tooltip"
                                        placement="right"
                                        title="FROM DATE & TIME"
                                        onBlur={onBlur1}                                              
                                    />
                                    {Object.keys(dateFromErr).map((key)=>{
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'15px', paddingRight: '7px', width:'220px', wordWrap:'break-word', textAlign:'right'}}>{dateFromErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                                       
                                    <Input 
                                        value={acarsMessageDateTimeMax}
                                        // changed={(e)=>setAcarsMessageDateTimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={handleChangeYearMax}
                                        elementType='input' 
                                        elementConfig= {acarsMessageDateTimeMaxInputConfig}
                                        toggle="tooltip"
                                        placement="right"
                                        title="TO DATE & TIME"
                                        onBlur={onBlur2}                                              
                                    />
                                    {Object.keys(dateToErr).map((key)=>{
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'15px', paddingRight: '7px', width:'220px', wordWrap:'break-word', textAlign:'right'}}>{dateToErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                    <div className="row"> 
                        {/* 1. kolona */}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
                                
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <InputGroup.Append className={classes.inputApend} >
                                    <Input
                                        value={address}
                                        // changed={(e)=>setTail(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAddress(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {addressInputConfig}                                               
                                    />
                                    <Button onClick={(e)=> setAddress2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input
                                            value={addressType}
                                            // changed={(e)=>setFlight(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAddressType(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {addressTypeInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setAddressType2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append> 
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <InputGroup.Append className={classes.inputApend} >   
                                        <Input
                                            value={aircraftType}
                                            // changed={(e)=>setText(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAircraftType(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {aircraftTypeInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setAircraftType2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input 
                                            value={airspeedMin}
                                            // changed={(e)=>setFreqMin(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAirspeedMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {airspeedMinInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setAirspeed2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>    
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input 
                                            value={airspeedMax}
                                            // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAirspeedMax(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {airspeedMaxInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setAirspeed2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input
                                            value={airspeedStatus}
                                            // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAirspeedStatus(e.target.value)}                                                                             
                                            elementType='input' 
                                            elementConfig= {airspeedStatusInputConfig}                                                                                                               
                                        />
                                        <Button onClick={(e)=> setAirspeedStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                     
                                        <Input
                                            value={altInfo}
                                            // changed={(e)=>setTimestampMax(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAltInfo(e.target.value)}
                                            elementType='input'
                                            elementConfig={altInfoInputConfig}
                                        />
                                        <Button onClick={(e)=> setAltInfo2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>                           
                                                                                                               
                            </div>
                        </div>
                        </div>
                        <div className={classes.bar}>    
                        <div className="col-sm-3">                
                            <div className={classes.card}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} > 
                                        <Input 
                                            value={altUnit}
                                            // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAltUnit(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {altUnitInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setAltUnit2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>    
                                    <InputGroup.Append className={classes.inputApend} >            
                                        <Input 
                                            value={altitudeMin}
                                            // changed={(e)=>setChannel(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setAltitudeMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {altitudeMinInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setAltitude2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input 
                                            value={altitudeMax}                                        
                                            changed={(e)=>setAltitudeMax(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {altitudeMaxInputConfig}                     
                                        />
                                       <Button onClick={(e)=> setAltitude2(true)} className={classes.existsBtn}>Exist?</Button> 
                                    </InputGroup.Append> 
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input 
                                            value={bds2Identification}                                        
                                            changed={(e)=>setBds2Identification(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {bds2InputConfig}                     
                                        />
                                        <Button onClick={(e)=> setBds2Identification2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input 
                                            value={capability}                                        
                                            changed={(e)=>setCapability(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {capabilityInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setCapability2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append> 
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>    
                                    <InputGroup.Append className={classes.inputApend} >                
                                        <Input 
                                            value={cc}                                        
                                            changed={(e)=>setCc(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {ccInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setCc2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input 
                                            value={commBMb}                                        
                                            changed={(e)=>setCommBMb(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {commBBmbInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setCommBMb2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input
                                            value={commBBds}
                                            // changed={(e)=>setLabel(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setCommBBds(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {commBdsInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setCommBBds2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={controlField}                                        
                                            changed={(e)=>setControlField(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {controlFieldInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setControlField2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup> 
                                                                                            
                            </div>
                            
                        </div>
                        </div>
                        {/*3.*/}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={dr}                                        
                                            changed={(e)=>setDr(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {drInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setDr2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input
                                            value={emergencyState}                                        
                                            changed={(e)=>setEmergencyState(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {emergencyStateInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setEmergencyState2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append> 
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input
                                            value={error}                                        
                                            changed={(e)=>setError(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {errorInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setError2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={esSub}                                        
                                            changed={(e)=>setEsSub(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {esSubInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setEsSub2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={esType}                                        
                                            changed={(e)=>setEsType(e.target.value)}                                                                             
                                            elementType='input' 
                                            elementConfig= {esTypeInputConfig}                                                                                                               
                                        />
                                        <Button onClick={(e)=> setEsType2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input
                                            value={ewStatus}                                        
                                            changed={(e)=>setEwStatus(e.target.value)}
                                            elementType='input'
                                            elementConfig={ewStatusInputConfig}
                                        />
                                        <Button onClick={(e)=> setEwStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input 
                                            value={ewVelocity}                                        
                                            changed={(e)=>setEwVelocity(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {ewVelocityInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setEwVelocity2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input 
                                            value={fFlag}                                        
                                            changed={(e)=> setFFlag(e.target.value)}                                        
                                            elementType='input' 
                                            elementConfig= {fFlagInputConfig}                                                                                    
                                        />  
                                         <Button onClick={(e)=> setFFlag2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>                                  
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                     
                                        <Input 
                                            value={flightStatus}                                        
                                            changed={(e)=>setFlightStatus(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {flightStatusInputConfig}                                                                                     
                                        />   
                                        <Button onClick={(e)=> setFlightStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>                                 
                                </InputGroup>                                                                                                            
                            </div>
                        </div>
                        </div>
                        {/*3.*/}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >        
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input
                                            value={haeBaro}                                        
                                            changed={(e)=>setHaeBaro(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {haeBaroInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setHaeBaro2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>  
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input
                                            value={heading}                                        
                                            changed={(e)=>setHeading(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {headingInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setHeading2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={headingStatus}                                        
                                            changed={(e)=>setHeadingStatus(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {headingStatusInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setHeadingStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input
                                            value={icao}                                        
                                            changed={(e)=>setIcao(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {icaoInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setIcao2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                      
                                        <Input
                                            value={identification}                                        
                                            changed={(e)=>setIdentification(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {identificationInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setIdentification2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={iid}                                        
                                            changed={(e)=>setIid(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {iidInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setIid2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                     
                                        <Input 
                                            value={latMin}                                        
                                            changed={(e)=>setLatMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {latMinInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setLat2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                     
                                        <Input
                                            value={latMax}                                        
                                            changed={(e)=>setLatMax(e.target.value)}                                                                             
                                            elementType='input' 
                                            elementConfig= {latMaxInputConfig}                                                                                                               
                                        />
                                        <Button onClick={(e)=> setLat2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input
                                            value={levelMin}                                        
                                            changed={(e)=>setLevelMin(e.target.value)}
                                            elementType='input'
                                            elementConfig={levelMinInputConfig}
                                        />
                                        <Button onClick={(e)=> setLevel2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>                           
                                                                                                               
                            </div>
                        </div>
                        </div>
                        <div className={classes.bar}>    
                        <div className="col-sm-3">                
                            <div className={classes.card}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input 
                                            value={levelMax}                                        
                                            changed={(e)=>setLevelMax(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {levelMaxInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setLevel2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >              
                                        <Input 
                                            value={lonMin}                                        
                                            changed={(e)=>setLonMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {lonMinInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setLon2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>    
                                </InputGroup>
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>      
                                    <InputGroup.Append className={classes.inputApend} >            
                                        <Input 
                                            value={lonMax}                                        
                                            changed={(e)=>setLonMax(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {lonMaxInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setLon2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append> 
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input 
                                            value={modeA}                                        
                                            changed={(e)=>setModeA(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {modeAInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setModeA2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input 
                                            value={modeAIdent}                                        
                                            changed={(e)=>setModeAIdent(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {modeAIdentInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setModeAIdent2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={modeC}                                        
                                            changed={(e)=>setModeC(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {modeCInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setModeC2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input 
                                            value={msgType}                                        
                                            changed={(e)=>setMsgType(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {msgTypeInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setMsgType2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={nacp}                                        
                                            changed={(e)=>setNacp(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {nacpInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setNacp2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={nsStatus}                                        
                                            changed={(e)=>setNsStatus(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {nsStatusInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setNsStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup> 
                                                                                            
                            </div>
                            
                        </div>
                        </div>
                        {/*3.*/}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >               
                                        <Input
                                            value={nsVelocity}                                        
                                            changed={(e)=>setNsVelocity(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {nsVelocityInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setNsVelocity2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append> 
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >               
                                        <Input
                                            value={nucp}                                        
                                            changed={(e)=>setNucp(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {nucpInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setNucp2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>   
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input
                                            value={posDecoding}                                        
                                            changed={(e)=>setPosDecoding(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {posDecodingInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setPosDecoding2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>   
                                    <InputGroup.Append className={classes.inputApend} >              
                                        <Input 
                                            value={report}                                        
                                            changed={(e)=>setReport(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {reportInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setReport2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>  
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={sl}                                        
                                            changed={(e)=>setSl(e.target.value)}                                                                             
                                            elementType='input' 
                                            elementConfig= {slInputConfig}                                                                                                               
                                        />
                                        <Button onClick={(e)=> setSl2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={squawk}                                        
                                            changed={(e)=>setSquawk(e.target.value)}
                                            elementType='input'
                                            elementConfig={squawkInputConfig}
                                        />
                                        <Button onClick={(e)=> setSquawk2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={stationId}                                        
                                            changed={(e)=>setStationId(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {stationIdInputConfig}                     
                                        />
                                        <Button onClick={(e)=> setStationId2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={tFlag}                                        
                                            changed={(e)=>setTFlag(e.target.value)}                                        
                                            elementType='input' 
                                            elementConfig= {tFlagInputConfig}                                                                                    
                                        />
                                        <Button onClick={(e)=> setTFlag2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>                                    
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input 
                                            value={timestampMin}                                        
                                            changed={(e)=>setTimestampMin(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {timeStampMinInputConfig}                                                                                     
                                        /> 
                                        <Button onClick={(e)=> setTimestamp2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>                              
                                </InputGroup>                                                                                                            
                            </div>
                        </div>
                        </div>
                        {/*3.*/}
                        {/*4.*/}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  
                                    <InputGroup.Append className={classes.inputApend} >               
                                        <Input
                                            value={timestampMax}                                        
                                            changed={(e)=>setTimestampMax(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {timeStampMaxInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setTimestamp2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>  
                                </InputGroup>
                                {/* <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={type}                                        
                                        changed={(e)=>setType(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {typeInputConfig}                                               
                                    />
                                </InputGroup> */}
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                   
                                        <Input
                                            value={um}                                        
                                            changed={(e)=>setUm(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {umInputConfig}                                               
                                        />
                                        <Button onClick={(e)=> setUm2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input 
                                            value={verticalRateMin}                                        
                                            changed={(e)=>setVerticalRateMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {verticalMinRateInputConfig}                     
                                        />  
                                        <Button onClick={(e)=> setVerticalRate2(true)} className={classes.existsBtn}>Exist?</Button>                                   
                                    </InputGroup.Append>
                                </InputGroup>                                
                                
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                    <InputGroup.Append className={classes.inputApend} >                    
                                        <Input
                                            value={verticalRateMax}                                        
                                            changed={(e)=> setVerticalRateMax(e.target.value)}                                                                             
                                            elementType='input' 
                                            elementConfig= {verticalMaxRateInputConfig}                                                                                                               
                                        />
                                        <Button onClick={(e)=> setVerticalRate2(true)} className={classes.existsBtn}>Exist?</Button>    
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>    
                                    <InputGroup.Append className={classes.inputApend} >                 
                                        <Input
                                            value={verticalRateSrc}                                        
                                            changed={(e)=>setVerticalRateSrc(e.target.value)}
                                            elementType='input'
                                            elementConfig={verticalRateSrcInputConfig}
                                        />
                                        <Button onClick={(e)=> setVerticalRateSrc2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                      
                                        <Input
                                            value={verticalStatus}                                        
                                            changed={(e)=>setVerticalStatus(e.target.value)}
                                            elementType='input'
                                            elementConfig={verticalStatusInputConfig}
                                        />
                                        <Button onClick={(e)=> setVerticalStatus2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                    <InputGroup.Append className={classes.inputApend} >                  
                                        <Input
                                            value={vs}                                        
                                            changed={(e)=>setVs(e.target.value)}
                                            elementType='input'
                                            elementConfig={vsInputConfig}
                                        />
                                        <Button onClick={(e)=> setVs2(true)} className={classes.existsBtn}>Exist?</Button>
                                    </InputGroup.Append>
                                </InputGroup>                     
                                                                                                               
                            </div>
                            <div className={classes.buttonBox}>
                                <ButtonBordered                                    
                                    clicked={onSerach}
                                    btnType="Success"
                                                                                                                                                           
                                >SEARCH</ButtonBordered>
                                <ButtonBordered                                    
                                    clicked={onReset}
                                    btnType="Secondary"
                                     
                                >RESET</ButtonBordered>
                            </div>
                        </div>
                        </div>
                       
                        
                    </div> 
                </div>          
            </DropdownButton>
        </div> 
    );
}

export default SearchAdsbElement;