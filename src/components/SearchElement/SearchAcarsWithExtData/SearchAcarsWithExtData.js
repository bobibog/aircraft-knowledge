import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAdsbElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


const  SearchAcarsWithExtData = (props) => {

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

    const changer=0;

    const onSerach = (e) =>{
        props.clickedSearch(address, addressType, aircraftType, airspeedMin, 
            airspeedMax, airspeedStatus, altInfo, altUnit, altitudeMin, altitudeMax, bds2Identification,
            capability, cc, commBBds, commBMb, controlField, dr, emergencyState, error, esSub, esType, 
            ewStatus, ewVelocity, fFlag, flightStatus, haeBaro, heading, headingStatus, icao, identification,
            iid, latMin, latMax, levelMin, levelMax, lonMin, lonMax, modeA, modeAIdent, modeC, msgType, 
            nacp, nsStatus, nsVelocity, nucp, posDecoding, report, sl, squawk, stationId, tFlag,
            timestampMin, timestampMax, type, um, verticalRateMin, verticalRateMax, verticalRateSrc, 
            verticalStatus, vs, acarsMessageDateTimeMin, acarsMessageDateTimeMax);
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
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}>
                <div className={classes.dropdownShow}>
                    <div className="row"> 
                        {/* 1. kolona */}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
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
                                        changed={(e)=>(setAcarsMessageDateTimeMin(e.target.value))}                                        
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
                                        changed={(e)=>setAcarsMessageDateTimeMax(e.target.value)}
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
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={address}
                                        // changed={(e)=>setTail(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAddress(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {addressInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={addressType}
                                        // changed={(e)=>setFlight(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAddressType(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {addressTypeInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={aircraftType}
                                        // changed={(e)=>setText(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAircraftType(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {aircraftTypeInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={airspeedMin}
                                        // changed={(e)=>setFreqMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAirspeedMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {airspeedMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={airspeedMax}
                                        // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAirspeedMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {airspeedMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={airspeedStatus}
                                        // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAirspeedStatus(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {airspeedStatusInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={altInfo}
                                        // changed={(e)=>setTimestampMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltInfo(e.target.value)}
                                        elementType='input'
                                        elementConfig={altInfoInputConfig}
                                    />
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
                                    <Input 
                                        value={altUnit}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltUnit(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {altUnitInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={altitudeMin}
                                        // changed={(e)=>setChannel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltitudeMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {altitudeMinInputConfig}                     
                                    />
                                </InputGroup>
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={altitudeMax}                                        
                                        changed={(e)=>setAltitudeMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {altitudeMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={bds2Identification}                                        
                                        changed={(e)=>setBds2Identification(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {bds2InputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={capability}                                        
                                        changed={(e)=>setCapability(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {capabilityInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={cc}                                        
                                        changed={(e)=>setCc(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {ccInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={commBMb}                                        
                                        changed={(e)=>setCommBMb(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {commBBmbInputConfig}                     
                                    />
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={commBBds}
                                        // changed={(e)=>setLabel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setCommBBds(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {commBdsInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={controlField}                                        
                                        changed={(e)=>setControlField(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {controlFieldInputConfig}                                               
                                    />
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
                                    <Input
                                        value={dr}                                        
                                        changed={(e)=>setDr(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {drInputConfig}                                               
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={emergencyState}                                        
                                        changed={(e)=>setEmergencyState(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {emergencyStateInputConfig}                                               
                                    />
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={error}                                        
                                        changed={(e)=>setError(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {errorInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={esSub}                                        
                                        changed={(e)=>setEsSub(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {esSubInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={esType}                                        
                                        changed={(e)=>setEsType(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {esTypeInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={ewStatus}                                        
                                        changed={(e)=>setEwStatus(e.target.value)}
                                        elementType='input'
                                        elementConfig={ewStatusInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={ewVelocity}                                        
                                        changed={(e)=>setEwVelocity(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {ewVelocityInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                                      
                                    <Input 
                                        value={fFlag}                                        
                                        changed={(e)=> setFFlag(e.target.value)}                                        
                                        elementType='input' 
                                        elementConfig= {fFlagInputConfig}                                                                                    
                                    />                                    
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                                       
                                    <Input 
                                        value={flightStatus}                                        
                                        changed={(e)=>setFlightStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {flightStatusInputConfig}                                                                                     
                                    />                                    
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
                                    <Input
                                        value={haeBaro}                                        
                                        changed={(e)=>setHaeBaro(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {haeBaroInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={heading}                                        
                                        changed={(e)=>setHeading(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {headingInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={headingStatus}                                        
                                        changed={(e)=>setHeadingStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {headingStatusInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={icao}                                        
                                        changed={(e)=>setIcao(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {icaoInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={identification}                                        
                                        changed={(e)=>setIdentification(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {identificationInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={iid}                                        
                                        changed={(e)=>setIid(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {iidInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={latMin}                                        
                                        changed={(e)=>setLatMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {latMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={latMax}                                        
                                        changed={(e)=>setLatMax(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {latMaxInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={levelMin}                                        
                                        changed={(e)=>setLevelMin(e.target.value)}
                                        elementType='input'
                                        elementConfig={levelMinInputConfig}
                                    />
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
                                    <Input 
                                        value={levelMax}                                        
                                        changed={(e)=>setLevelMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {levelMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={lonMin}                                        
                                        changed={(e)=>setLonMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {lonMinInputConfig}                     
                                    />
                                </InputGroup>
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={lonMax}                                        
                                        changed={(e)=>setLonMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {lonMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={modeA}                                        
                                        changed={(e)=>setModeA(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeAInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={modeAIdent}                                        
                                        changed={(e)=>setModeAIdent(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeAIdentInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={modeC}                                        
                                        changed={(e)=>setModeC(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeCInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={msgType}                                        
                                        changed={(e)=>setMsgType(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {msgTypeInputConfig}                     
                                    />
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={nacp}                                        
                                        changed={(e)=>setNacp(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {nacpInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={nsStatus}                                        
                                        changed={(e)=>setNsStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {nsStatusInputConfig}                                               
                                    />
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
                                    <Input
                                        value={nsVelocity}                                        
                                        changed={(e)=>setNsVelocity(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {nsVelocityInputConfig}                                               
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={nucp}                                        
                                        changed={(e)=>setNucp(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {nucpInputConfig}                                               
                                    />
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={posDecoding}                                        
                                        changed={(e)=>setPosDecoding(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {posDecodingInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={report}                                        
                                        changed={(e)=>setReport(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {reportInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={sl}                                        
                                        changed={(e)=>setSl(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {slInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={squawk}                                        
                                        changed={(e)=>setSquawk(e.target.value)}
                                        elementType='input'
                                        elementConfig={squawkInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={stationId}                                        
                                        changed={(e)=>setStationId(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {stationIdInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                                      
                                    <Input 
                                        value={tFlag}                                        
                                        changed={(e)=>setTFlag(e.target.value)}                                        
                                        elementType='input' 
                                        elementConfig= {tFlagInputConfig}                                                                                    
                                    />                                    
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                                       
                                    <Input 
                                        value={timestampMin}                                        
                                        changed={(e)=>setTimestampMin(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {timeStampMinInputConfig}                                                                                     
                                    />                                    
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
                                    <Input
                                        value={timestampMax}                                        
                                        changed={(e)=>setTimestampMax(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {timeStampMaxInputConfig}                                               
                                    />
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
                                    <Input
                                        value={um}                                        
                                        changed={(e)=>setUm(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {umInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={verticalRateMin}                                        
                                        changed={(e)=>setVerticalRateMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {verticalMinRateInputConfig}                     
                                    />
                                </InputGroup>                                
                                
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={verticalRateMax}                                        
                                        changed={(e)=> setVerticalRateMax(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {verticalMaxRateInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={verticalRateSrc}                                        
                                        changed={(e)=>setVerticalRateSrc(e.target.value)}
                                        elementType='input'
                                        elementConfig={verticalRateSrcInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={verticalStatus}                                        
                                        changed={(e)=>setVerticalStatus(e.target.value)}
                                        elementType='input'
                                        elementConfig={verticalStatusInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={vs}                                        
                                        changed={(e)=>setVs(e.target.value)}
                                        elementType='input'
                                        elementConfig={vsInputConfig}
                                    />
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

export default SearchAcarsWithExtData;