import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAcarsWithExtData.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../UI/Dropdown/Dropdown';
import SearchBar from '../../UI/SearchBar/SearchBar';


const  SearchAcarsWithExtData = (props) => {

    const airlineNameList = useSelector(state => {
        return state.airline.airlines;
    });       

    const[value, setValue] = useState(null);

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
    const[airlineName, setAirlineName]= useState('');
    const[airlineIata, setAirlineIATA] = useState('');
    const[airlineIcao, setAirlineICAO] = useState('');
    const[operatorName, setOperatorName] = useState('');
    const[operatorIata, setOperatorIata] = useState('');
    const[operatorIcao, setOperatorIcao] = useState('');
    const[serialNumber, setSerialNumber] = useState('');    
    const[aircraftType, setAircraftType] = useState('');
    const[typeCode, setTypeCode] = useState('');   
    
    

    const dispatch = useDispatch();

    const onFetchAirlineName = useCallback(
        () => dispatch(actions.fetchAirlineNameList(airlineName ))
        , [dispatch, airlineName ]
    );

    useEffect(()=>{
        
        onFetchAirlineName(); 
        
              
    }, [onFetchAirlineName]);
    

    // Disable Input
    const [disabled, setDisabled] = useState(false);

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
        setAirlineName('');
        setAirlineIATA('');
        setAirlineICAO('');
        setOperatorName('');
        setOperatorIata('');
        setOperatorIcao('');
        setSerialNumber('');        
        setAircraftType('');
        setTypeCode(''); 
        setValue(null);

        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();        
    };    

    const disabler = () =>{
        if(airlineName!= null){
            setDisabled(true);
        }
    }

    // DROPDOWN MENU
    let drop = '';

    const onDropChange = (e) =>{
        setValue(e);       
        setAirlineName(e.airlineName);
        //disabler();                     
    }

       
    if(airlineNameList != null)
    {
        drop = <Dropdown
            prompt= 'Airline Name'            
            options={airlineNameList}              
            value={value}   
            onChange={onDropChange} 
            descriptor='airlineName'                                                  
        />;
    }

   
       
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
        placeholder:'Airline Name',        
    }
    const airlineIataInputConfig = {
        type:'text',
        placeholder:'Airline IATA',        
    }
    const airlineIcaoInputConfig = {
        type:'text',
        placeholder:'Airline ICAO',        
    }
    const operartorNameInputConfig = {
        type:'text',
        placeholder:'Operator Name',        
    }
    const operartorIataInputConfig = {
        type:'text',
        placeholder:'Operator IATA',        
    }
    const operartorIcaoInputConfig = {
        type:'text',
        placeholder:'Operator ICAO',        
    }
    const aircraftTypeInputConfig = {
        type:'text',
        placeholder:'Aircraft Type',        
    }
    const serialNumberInputConfig = {
        type:'text',
        placeholder:'Serial Number'        
    }
    const typeCodeInputConfig = {
        type:'text',
        placeholder:'Type Code',
        //disabled: disabled        
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
        props.clickedSearch(acarsMessageDateTimeMin, acarsMessageDateTimeMax, tail,  flight, text, 
            mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
            serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode);
        setFilter('a');
        toggleDropdown();
        props.allChanger(changer);
        //onSetAirlineName();
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
                        {/* 2. column */}
                        <div className={classes.bar}>    
                        <div className="col-sm-3">                
                            <div className={classes.card}>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    {/* <Input
                                        value={airlineName}                                        
                                        changed={(e)=>setAirlineName(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {airlineInputConfig}                                               
                                    /> */}
                                    <div className={classes.dropDownList}>
                                        {drop}
                                    </div>                                    
                                    {/* <div className={classes.searchBarContainer}>
                                        {searchBar}
                                    </div> */}
                                </InputGroup>
                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={airlineIata}                                        
                                        changed={(e)=>setAirlineIATA(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {airlineIataInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={airlineIcao}                                        
                                        changed={(e)=>setAirlineICAO(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {airlineIcaoInputConfig}                     
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={operatorName}                                        
                                        changed={(e)=> setOperatorName(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {operartorNameInputConfig}                                                                                                               
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={operatorIata}                                        
                                        changed={(e)=>setOperatorIata(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {operartorIataInputConfig}                     
                                    />
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={operatorIcao}                                        
                                        changed={(e)=> setOperatorIcao(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {operartorIcaoInputConfig}                                                                                                               
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
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={serialNumber}                                        
                                        changed={(e)=> setSerialNumber(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {serialNumberInputConfig}                                                                                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={typeCode}                                        
                                        changed={(e)=> setTypeCode(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {typeCodeInputConfig}                                                                                                               
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