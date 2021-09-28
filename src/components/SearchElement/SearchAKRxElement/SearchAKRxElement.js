import React, {useState, useSelector} from 'react';
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


const  SearchAKRxElement = (props) => {

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
                   
    return (
        <div className={classes.container}> 
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}>
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
                                        changed={(e)=>setAcarsMessageDateTimeMin(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {acarsMessageDateTimeMinInputConfig} 
                                        toggle="tooltip"
                                        placement="right"
                                        title="FROM DATE & TIME"                                              
                                    />
                                    
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
                                    />
                                    
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
                                
                                                            
                            </div>
                            <div className={classes.buttonBox}>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch(timestampMin, timestampMax,
                                    stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
                                    flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax))}
                                btnType="Success"
                                mouseDown={(e)=>setFilter('a')}  
                                mouseLeave={(e)=>toggleDropdown()} 
                                onMouseUp={(e)=> props.allChanger(changer)}                                                                                                                        
                            >SEARCH</ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"
                                mouseDown={(e)=>setFilter('')} 
                                mouseLeave={(e)=>toggleDropdown()}  
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