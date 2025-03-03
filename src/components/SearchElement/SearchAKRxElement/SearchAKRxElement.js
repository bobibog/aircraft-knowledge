import React, {useState, useEffect, useRef, useContext} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAKRxElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {FcAlphabeticalSortingAz} from 'react-icons/fc';
import {FcAlphabeticalSortingZa} from 'react-icons/fc';
import {FcNumericalSorting12} from 'react-icons/fc';
import {FcNumericalSorting21} from 'react-icons/fc';
import SearchByColumn from '../SearchByColumn/SearchByColumn';
import {FcSearch} from 'react-icons/fc';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from '../../../context/auth-context';


const  SearchAKRxElement = (props) => {

    // const authContext = useContext(AuthContext);
    // const authCheckState = authContext.authenticationCheckState;
    // let isCompany = authContext.user.company;

    // console.log("Company= "+isCompany);

    //identicna search polja su i u parentu odnosno u AKRx.js a preko onSearch iz parenta ih prosledjujemo parentu
    //jer su filter kolone podskup postojecih kolona tako da ne moraju biti sva iz AKRx u Search(filter)
    const[stationId, setStationId] = useState('');//number filter kolona(ruta AcarsMessage i AcarsMessage/allUsers) stationId=200 jer vraca [] za nepostojanje njene vrednosti na backend
   
   //MENJA SE RESPONSE PRI ISTOM SEARCH U AcarsMessage I AcarsMessage/allUsers
    const[channel, setChannel] = useState('');//number filter kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    
    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[freqMin, setFreqMin] = useState('');
    const[freqMax, setFreqMax] = useState('');
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[errorMin, setErrorMin] = useState('');
    const[errorMax, setErrorMax] = useState('');
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');    
    const[altMin, setAltMin]=useState('');
    const[altMax, setAltMax]=useState('');
    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');    

    //nekada iako je filter kolona, prvi request ne uradi filter

    const[mode, setMode] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers) 
    const[label, setLabel] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers) jer vraca [] za nepostojanje i mora tacno da se sadrzi na backend odnosno da ?label=SA mora biti podskup <= label reci na backend(radimo contains zasigurno jer ne mora SA biti na pocetku ali mora konkatenirano) i ne obrnutno 
    const[blockId, setBlockId] = useState('');//string kolona koja vraca error 500(ruta AcarsMessage i AcarsMessage/allUsers)
    const[ack, setAck] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[tail, setTail] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[flight, setFlight] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[msgno, setMsgno] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[text, setText] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[end, setEnd] = useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[dsta, setDsta]=useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[icao, setIcao]=useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[isOnground, setIsOnground]=useState('');//jeste filter number kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[isResponse, setIsResponse]=useState('');//jeste number filter kolona(ruta AcarsMessage) a nije za AcarsMessage/allUsers
    const[toAddr, setToAddr]=useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)
    const[type, setType]=useState('');//jeste filter string kolona(ruta AcarsMessage i AcarsMessage/allUsers)


    /////////////////////////////
    const[aggrStatus, setAggrStatus]=useState('');//string kolona koja nije filter kolona u ruta AcarsMessage a jeste u AcarsMessage/allUsers
    
     //MENJA SE RESPONSE PRI ISTOM SEARCH U AcarsMessage/allUsers
    const[consensusStatus, setConsensusStatus]=useState('');//number kolona koja nije filter kolona u ruta AcarsMessage ali jeste u AcarsMessage/allUsers
    
    
    const[aggrText, setAggrText]=useState('');
    const[consensusResult, setConsensusResult]=useState('');
    /////////////////////////////

    // const[company, setCompany] = useState('');

    // setCompany(isCompany);

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
            dateFromErr.dateFromInvalid = "Please enter complete date & time or use DatePicker ↑";
            isValid1 = false;
        } 

        setDateFromErr(dateFromErr);        
        return isValid1;
    }
    const dateValidation2 = () =>{
        
        const dateToErr = {};
        let isValid2 = true;

        if(yearMax=='' || monthMax=='' || dayMax=='' || hoursMax=='' || minutesMax=='' ){
            dateToErr.dateToInvalid = "Please enter complete date & time or use DatePicker ↑";
            isValid2 = false;
        }         
        setDateToErr(dateToErr);
        return isValid2;
    }    

    //isto definisana postoji i u parent
    const resetSearchHandler = () => {        
        setTimestampMin("");
        setTimestampMax("");
        setStationId("");
        setChannel("");
        setFreqMin("");
        setFreqMax("");
        setLevelMin("");
        setLevelMax("");
        setErrorMin("");
        setErrorMax("");
        setMode("");
        setLabel("");
        setBlockId("");
        setAck("");
        setTail("");
        setFlight("");
        setMsgno("");
        setText("");
        setEnd("");
        setAcarsMessageDateTimeMin("");
        setAcarsMessageDateTimeMax("");        
        setAltMin("");
        setAltMax("");
        setDsta("");
        setIcao("");
        setIsOnground("");
        setIsResponse("");
        setLatMin("");
        setLatMax("");
        setLonMin("");
        setLonMax("");        
        setToAddr("");
        setType("");
        
        ///////////////
        setAggrStatus("")
        setConsensusStatus("")
        
        setAggrText('');
        setConsensusResult('');
        ///////////////
        
        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();//resetujemo i u parentu filter kolone        
    };    

    ////////////////////////    
    const aggrStatusInputConfig = {
        type:'text',
        placeholder:'Aggregation Status'
    }
    const consensStatusInputConfig = {
        type:'text',
        placeholder:'Consensus Status'
    }
    
    const aggrTextInputConfig = {
        type:'text',
        placeholder:'Aggregated Text'
    }
    const consensResultInputConfig = {
        type:'text',
        placeholder:'Consensus Result'
    }   
    ////////////////////////

    const timeStampMinInputConfig = {
        type:'text',
        placeholder:'Timestamp MIN'
    }
    const timeStampMaxInputConfig = {
        type:'text',
        placeholder:'Timestamp MAX'
    }
    const stationIdInputConfig = {
        type:'text',
        placeholder:'Station ID'
    }
    const channelInputConfig = {
        type:'text',
        placeholder:'Channel'
    }
    const freqMinInputConfig = {
        type:'text',
        placeholder:'Freq MIN'
    }
    const freqMaxInputConfig = {
        type:'text',
        placeholder:'Freq MAX'
    }
    const levelMinInputConfig = {
        type:'text',
        placeholder:'Level MIN'
    }
    const levelMaxInputConfig = {
        type:'text',
        placeholder:'Level MAX'
    }
    const errorMinInputConfig = {
        type:'text',
        placeholder:'Error MIN'
    }
    const errorMaxInputConfig = {
        type:'text',
        placeholder:'Error MAX'
    }
    const modeInputConfig = {
        type:'text',
        placeholder:'Mode'
    }
    const labelInputConfig = {
        type:'text',
        placeholder:'Label'
    }
    const blockIdInputConfig = {
        type:'text',
        placeholder:'Block ID'
    }
    const ackInputConfig = {
        type:'text',
        placeholder:'Ack'
    }
    const tailInputConfig = {
        type:'text',
        placeholder:'Tail'
    }
    const flightInputConfig = {
        type:'text',
        placeholder:'Flight'
    }
    const msgnoInputConfig = {
        type:'text',
        placeholder:'Msgno'
    }
    const textInputConfig = {
        type:'text',
        placeholder:'Text'
    }
    const endInputConfig = {
        type:'text',
        placeholder:'End'
    }
    const acarsMessageDateTimeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const acarsMessageDateTimeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }     
    const altMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Min. Altitude'
    }
    const altMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Max. Altitude'
    }
    const dstaInputConfig = {
        type:'text',
        placeholder:'Dsta'
    }
    const icaoInputConfig = {
        type:'text',
        // min:0,
        placeholder:'Icao'
    }
    const isOnGroundInputConfig = {
        type:'text',
        // min:0,
        placeholder:'Is on Ground'
    }
    const isResponseInputConfig = {
        type:'text',
        // min:0,
        placeholder:'Is Response'
    }
    const latMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Min. Latitude'
    }
    const latMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Max. Latitude'
    }
    const lonMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Min. Longitude'
    }
    const lonMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Max. Longitude'
    }
    
    const toAddrInputConfig = {
        type:'text',
        // min:0,
        placeholder:'To Address'
    }
    const typeInputConfig = {
        type:'text',
        placeholder:'Message Type'
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
            // authCheckState();
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

    //podskup kolona iz AKRx.js jer je filter
    //prosledjujemo parentu iste filter kolone, a nakon sto se proslede posto parent ima kesiranu fetch funkciju sa tim parametriam koje watchuje onda ce se ponovo odraditi fetch
    const onSerach = (e) =>{
        props.clickedSearch(timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, 
            
            aggrStatus,consensusStatus,     aggrText,consensusResult);
        
        
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
                    <div className="row"> 
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">                                    
                                    <InputGroup.Text className={classes.span2}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>
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
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'17px', width:'256px', wordWrap:'break-word', textAlign:'right'}}>{dateFromErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span2}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>
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
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'17px', width:'256px', wordWrap:'break-word', textAlign:'right'}}>{dateToErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                                
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={tail}
                                        // changed={(e)=>setTail(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTail(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {tailInputConfig}                                               
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={flight}
                                        // changed={(e)=>setFlight(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFlight(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {flightInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={text}
                                        // changed={(e)=>setText(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setText(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {textInputConfig}                                               
                                    />
                                </InputGroup>


                                {/*///////////////////////////////////////////////*/}

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input
                                        value={aggrText}                                      
                                        changed={(e)=>setAggrText(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {aggrTextInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                 
                                    <Input
                                        value={aggrStatus}                                        
                                        changed={(e)=>setAggrStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {aggrStatusInputConfig}                                               
                                    />
                                </InputGroup>

                         
                                {/*///////////////////////////////////////////////*/}

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={freqMin}
                                        // changed={(e)=>setFreqMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFreqMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {freqMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>        
                                    <Input 
                                        value={freqMax}
                                        // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFreqMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {freqMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                 
                                    <Input
                                        value={timestampMin}
                                        // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTimestampMin(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {timeStampMinInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>          
                                    <Input
                                        value={timestampMax}
                                        // changed={(e)=>setTimestampMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTimestampMax(e.target.value)}
                                        elementType='input'
                                        elementConfig={timeStampMaxInputConfig}
                                    />
                                </InputGroup>                           
                                                                                                               
                            </div>
                        </div>
                        </div>
                        <div className={classes.bar}>    
                        <div className="col-sm-3">                
                            <div className={classes.card}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={stationId}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setStationId(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {stationIdInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={channel}
                                        // changed={(e)=>setChannel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setChannel(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {channelInputConfig}                     
                                    />
                                </InputGroup>
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                 
                                    <Input 
                                        value={levelMin}
                                        // changed={(e)=>setLevelMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setLevelMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {levelMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>              
                                    <Input 
                                        value={levelMax}
                                        // changed={(e)=>setLevelMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setLevelMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {levelMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                 
                                    <Input 
                                        value={errorMin}
                                        // changed={(e)=>setErrorMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setErrorMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {errorMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input 
                                        value={errorMax}
                                        // changed={(e)=>setErrorMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setErrorMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {errorMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={mode}
                                        // changed={(e)=>setMode(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMode(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeInputConfig}                     
                                    />
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>
                                    <Input
                                        value={label}
                                        // changed={(e)=>setLabel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setLabel(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {labelInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>
                                    <Input
                                        value={blockId}
                                        // changed={(e)=>setBlockId(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setBlockId(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {blockIdInputConfig}                                               
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
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={ack}
                                        // changed={(e)=>setAck(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAck(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {ackInputConfig}                                               
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>              
                                    <Input
                                        value={msgno}
                                        // changed={(e)=>setMsgno(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMsgno(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {msgnoInputConfig}                                               
                                    />
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input
                                        value={end}
                                        // changed={(e)=>setEnd(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setEnd(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {endInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={altMin}
                                        // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {altMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>
                                    <Input
                                        value={altMax}
                                        // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltMax(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {altMaxInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input
                                        value={dsta}
                                        // changed={(e)=>setTimestampMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setDsta(e.target.value)}
                                        elementType='input'
                                        elementConfig={dstaInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input 
                                        value={icao}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setIcao(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {icaoInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                                                      
                                    <Input 
                                        value={isOnground}                                        
                                        changed={(e)=>(setIsOnground(e.target.value))}                                        
                                        elementType='input' 
                                        elementConfig= {isOnGroundInputConfig}                                                                                    
                                    />                                    
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                                                        
                                    <Input 
                                        value={isResponse}                                        
                                        changed={(e)=>setIsResponse(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {isResponseInputConfig}                                                                                     
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
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>             
                                    <Input
                                        value={latMin}                                        
                                        changed={(e)=>setLatMin(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {latMinInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={latMax}                                        
                                        changed={(e)=>setLatMax(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {latMaxInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={lonMin}                                        
                                        changed={(e)=>setLonMin(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {lonMinInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input 
                                        value={lonMax}                                        
                                        changed={(e)=>setLonMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {lonMaxInputConfig}                     
                                    />
                                </InputGroup>                                
                                
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input
                                        value={toAddr}                                        
                                        changed={(e)=>setToAddr(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {toAddrInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={type}                                        
                                        changed={(e)=>setType(e.target.value)}
                                        elementType='input'
                                        elementConfig={typeInputConfig}
                                    />
                                </InputGroup>                     

                                {/*///////////////////////////////////////////////*/}
                         
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>               
                                    <Input
                                        value={consensusStatus}                                      
                                        changed={(e)=>setConsensusStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {consensStatusInputConfig}                                               
                                    />
                                </InputGroup>


                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={consensusResult}                                      
                                        changed={(e)=>setConsensusResult(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {consensResultInputConfig}                                               
                                    />
                                </InputGroup>
                                {/*///////////////////////////////////////////////*/}




                            </div>
                            <div className={classes.buttonBox}>
                                {/*--*/}
                                <ButtonBordered 
                                    // clicked={() => (props.clickedSearch(timestampMin, timestampMax,
                                    //     stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
                                    //     flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax))}
                                    clicked={onSerach}
                                    btnType="Success"
                                    //mouseDown={(e)=>setFilter('a')}  
                                    //mouseLeave={(e)=>toggleDropdown()} 
                                    //onMouseUp={(e)=> props.allChanger(changer)}                                                                                                                        
                                >SEARCH</ButtonBordered>
                                
                                {/*--*/}
                                <ButtonBordered
                                    //clicked={resetSearchHandler}
                                    clicked={onReset}
                                    btnType="Secondary"
                                    //mouseDown={(e)=>setFilter('')} 
                                    //mouseLeave={(e)=>toggleDropdown()}  
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

export default SearchAKRxElement;