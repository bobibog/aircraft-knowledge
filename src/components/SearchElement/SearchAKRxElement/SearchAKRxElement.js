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

    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[stationId, setStationId] = useState('');
    const[channel, setChannel] = useState('');
    const[freqMin, setFreqMin] = useState('');
    const[freqMax, setFreqMax] = useState('');
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[errorMin, setErrorMin] = useState('');
    const[errorMax, setErrorMax] = useState('');
    const[mode, setMode] = useState('');
    const[label, setLabel] = useState('');
    const[blockId, setBlockId] = useState('');
    const[ack, setAck] = useState('');
    const[tail, setTail] = useState('');
    const[flight, setFlight] = useState('');
    const[msgno, setMsgno] = useState('');
    const[text, setText] = useState('');
    const[end, setEnd] = useState('');
    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');    
    const[altMin, setAltMin]=useState('');
    const[altMax, setAltMax]=useState('');
    const[dsta, setDsta]=useState('');
    const[icao, setIcao]=useState('');
    const[isOnground, setIsOnground]=useState('');
    const[isResponse, setIsResponse]=useState('');
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');    
    const[toAddr, setToAddr]=useState('');
    const[type, setType]=useState('');
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
        
        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();        
    };    

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
        min:0,
        placeholder:'Icao'
    }
    const isOnGroundInputConfig = {
        type:'text',
        min:0,
        placeholder:'Is on Ground'
    }
    const isResponseInputConfig = {
        type:'text',
        min:0,
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

    const onSerach = (e) =>{
        props.clickedSearch(timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type);
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
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'17px', width:'256px', wordWrap:'break-word', textAlign:'right'}}>{dateFromErr[key]}</div>
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
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'17px', width:'256px', wordWrap:'break-word', textAlign:'right'}}>{dateToErr[key]}</div>
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
                                        value={tail}
                                        // changed={(e)=>setTail(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTail(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {tailInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={flight}
                                        // changed={(e)=>setFlight(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFlight(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {flightInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={text}
                                        // changed={(e)=>setText(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setText(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {textInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={freqMin}
                                        // changed={(e)=>setFreqMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFreqMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {freqMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={freqMax}
                                        // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFreqMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {freqMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={timestampMin}
                                        // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTimestampMin(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {timeStampMinInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
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
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={stationId}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
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
                                        value={channel}
                                        // changed={(e)=>setChannel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setChannel(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {channelInputConfig}                     
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
                                        // changed={(e)=>setLevelMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setLevelMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {levelMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={levelMax}
                                        // changed={(e)=>setLevelMax(e.target.value) & setFilter(e.target.value)}
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
                                        value={errorMin}
                                        // changed={(e)=>setErrorMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setErrorMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {errorMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={errorMax}
                                        // changed={(e)=>setErrorMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setErrorMax(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {errorMaxInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={mode}
                                        // changed={(e)=>setMode(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMode(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeInputConfig}                     
                                    />
                                </InputGroup> 
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={label}
                                        // changed={(e)=>setLabel(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setLabel(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {labelInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
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
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={ack}
                                        // changed={(e)=>setAck(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAck(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {ackInputConfig}                                               
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={msgno}
                                        // changed={(e)=>setMsgno(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMsgno(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {msgnoInputConfig}                                               
                                    />
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={end}
                                        // changed={(e)=>setEnd(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setEnd(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {endInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={altMin}
                                        // changed={(e)=>setFreqMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltMin(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {altMinInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={altMax}
                                        // changed={(e)=>setTimestampMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAltMax(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {altMaxInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={dsta}
                                        // changed={(e)=>setTimestampMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setDsta(e.target.value)}
                                        elementType='input'
                                        elementConfig={dstaInputConfig}
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
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
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
                                        value={isOnground}                                        
                                        changed={(e)=>(setIsOnground(e.target.value))}                                        
                                        elementType='input' 
                                        elementConfig= {isOnGroundInputConfig}                                                                                    
                                    />                                    
                                </InputGroup>                             
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                                       
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
                                <InputGroup className="mb-3 input-group-sm">
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
                                
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={toAddr}                                        
                                        changed={(e)=>setToAddr(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {toAddrInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={type}                                        
                                        changed={(e)=>setType(e.target.value)}
                                        elementType='input'
                                        elementConfig={typeInputConfig}
                                    />
                                </InputGroup>                     
                                                                                                               
                            </div>
                            <div className={classes.buttonBox}>
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