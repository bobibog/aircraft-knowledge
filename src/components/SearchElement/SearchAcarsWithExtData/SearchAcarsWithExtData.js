import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAcarsWithExtData.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


const  SearchAcarsWithExtData = (props) => {

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');
    const[tail, setTail]= useState('');
    const[flight, setFlight]=useState('');
    const[text, setText]=useState('');
    const[mode, setMode]= useState('');
    const[label, setLabel]= useState('');
    const[blockId, setBlockId] = useState('');
    const[msgno, setMsgno]= useState('');
    const[dsta, setDsta]= useState('');
    const[airline, setAirline]= useState('');
    const[serialNumber, setSerialNumber] = useState('');
    const[aircraftOperator, setAircraftOperator] = useState('');
    const[aircraftType, setAircraftType] = useState('');


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
        setAcarsMessageDateTimeMin('');
        setAcarsMessageDateTimeMax('');
        setTail('');
        setFlight('');
        setText('');
        setMode('');
        setLabel('');
        setBlockId('');
        setMsgno('');
        setDsta('');
        setAirline('');
        setSerialNumber('');
        setAircraftOperator('');
        setAircraftType('');       
        
        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();        
    };    

       
    const acarsMessageDateTimeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const acarsMessageDateTimeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }  
    const tailInputConfig = {
        type:'text',
        placeholder:'Tail'
    } 
    const flightInputConfig = {
        type:'text',
        placeholder:'Flight'
    } 
    const textInputConfig = {
        type:'text',
        placeholder:'Text'
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
    const msgnoIdInputConfig = {
        type:'text',
        placeholder:'Msgno'
    } 
    const dstaIdInputConfig = {
        type:'text',
        placeholder:'Destination Airport'
    }
    const airlineInputConfig = {
        type:'text',
        placeholder:'Airline'
    }
    const serialNumberInputConfig = {
        type:'text',
        placeholder:'Serial Number'
    }
    const operatorInputConfig = {
        type:'text',
        placeholder:'Operator'
    }
    const aircraftTypeInputConfig = {
        type:'text',
        placeholder:'Aircraft Type'
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
        props.clickedSearch(acarsMessageDateTimeMin, acarsMessageDateTimeMax,
            tail, flight, text, mode, label, blockId, msgno, dsta, airline, serialNumber
            ,aircraftOperator, aircraftType);
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
                                        value={tail}                                        
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
                                        value={mode}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
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
                                        value={msgno}                                        
                                        changed={(e)=>setMsgno(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {msgnoIdInputConfig}                     
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
                                        changed={(e)=>setDsta(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {dstaIdInputConfig}                     
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
                                        value={airline}                                        
                                        changed={(e)=>setAirline(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {airlineInputConfig}                                               
                                    />
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={serialNumber}                                        
                                        changed={(e)=>setSerialNumber(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {serialNumberInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={aircraftOperator}                                        
                                        changed={(e)=>setAircraftOperator(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {operatorInputConfig}                     
                                    />
                                </InputGroup>                                
                                
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={aircraftType}                                        
                                        changed={(e)=> setAircraftType(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {aircraftTypeInputConfig}                                                                                                               
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