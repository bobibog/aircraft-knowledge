import React, {useState, useEffect, useRef} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAircraftElement.module.css';
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


const  SearchAircraftElement = (props) => {

    const[airline, setAirline] = useState('');
    const[operators, setOperator] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[fullType, setFullType] = useState('');
    const[registration, setRegistration]=useState('');
    const[serialNumber, setSerialNumber]=useState('');
    const[modeS, setModeS]=useState('');    
    const[minManufactureDate, setMinManufactureDate]=useState('');
    const[maxManufactureDate, setMaxManufactureDate]=useState('');     

    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airlineInputConfig = {
        type:'text',
        placeholder:'Airline name'
    }
    const operatorInputConfig = {
        type:'text',
        placeholder:'Operator name'
    }
    const typeCodeInputConfig = {
        type:'text',
        placeholder:'Type code'
    }
    const fullTypeInputConfig = {
        type:'text',
        placeholder:'Aircraft type'
    } 
    const registrationInputConfig = {
        type:'text',
        placeholder:'Aircraft registration'
    }
    const serialNumberInputConfig = {
        type:'text',
        placeholder:'Aircraft serial number'
    }
    const modeSInputConfig = {
        type:'text',
        placeholder:'Mode S'
    }  

    
    const minManufactureDateInputConfig = {
        type:'date',
        placeholder:'Production from:'        
    }
    const maxManufactureDateInputConfig = {
        type:'date',                
        placeholder:'Production to:'        
    }     

    const resetSearchHandler = () => {
        setAirline("");
        setOperator("");
        setTypeCode("");
        setFullType("");
        setRegistration("");
        setSerialNumber("");
        setModeS("");
        setMaxManufactureDate("");
        setMinManufactureDate("");
        props.clickedReset();       
    };     

    
    // Changing Dropdown Button title according to event (search or reset click)
    const[filter, setFilter] = useState('');
    let title = filter ? 'FILTER ON': 'FILTER OFF';;

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


    return (
       
        <div className={classes.container}> 
            {/* <DropdownButton title={title} className={classes.Drop} role='menu' show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}> */}
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef} >
                <div className={classes.dropdownShow}>   
                    <div className={classes.row}>           
                        <div className="col-md">                        
                            <div className={classes.card} >
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={airline}
                                        // changed={(e)=>setAirline(e.target.value) & setFilter(e.target.value)} 
                                        changed={(e)=>setAirline(e.target.value)}                                                                            
                                        elementType='input' 
                                        elementConfig= {airlineInputConfig} 
                                        className={classes.input}                                                                                                                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={operators}
                                        // changed={(e)=>setOperator(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setOperator(e.target.value)}
                                        elementType='input'
                                        elementConfig={operatorInputConfig}
                                        className={classes.input}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={typeCode}
                                        // changed={(e)=>setTypeCode(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setTypeCode(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {typeCodeInputConfig} 
                                        className={classes.input}                    
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={fullType}
                                        // changed={(e)=>setFullType(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFullType(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {fullTypeInputConfig}    
                                        className={classes.input}                 
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={registration}
                                        // changed={(e)=>setRegistration(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setRegistration(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {registrationInputConfig} 
                                        className={classes.input}                    
                                    />
                                </InputGroup>                                                
                            </div>
                        </div>
                        <div className="col-md">                        
                        <div className={classes.card} >                               
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={serialNumber}
                                    // changed={(e)=>setSerialNumber(e.target.value) & setFilter(e.target.value)}
                                    changed={(e)=>setSerialNumber(e.target.value)}
                                    elementType='input' 
                                    elementConfig= {serialNumberInputConfig}   
                                    className={classes.input}                                            
                                />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={modeS}
                                        // changed={(e)=>setModeS(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setModeS(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {modeSInputConfig}
                                        className={classes.input}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={minManufactureDate}
                                        // changed={(e)=>setMinManufactureDate(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMinManufactureDate(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {minManufactureDateInputConfig}
                                        className={classes.input}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={maxManufactureDate}
                                        // changed={(e)=>setMaxManufactureDate(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMaxManufactureDate(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {maxManufactureDateInputConfig}  
                                        className={classes.input}                                             
                                    />
                                </InputGroup>
                                                                            
                            </div>
                            <div className={classes.buttonBox}>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch(airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate))}
                                btnType="Success"
                                mouseDown={(e)=>setFilter('a')}
                                //mouseLeave={(e)=>toggleDropdown()}                             
                            >SEARCH</ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary" 
                                mouseDown={(e)=>setFilter('')} 
                                //mouseLeave={(e)=>toggleDropdown()}   
                            >RESET</ButtonBordered>
                            {/* <ReactToExcel
                                table={props.id}
                                filename="Aircraft Report"
                                sheet="sheet 1"
                                buttonText="Export to Excel"
                                className="btn"
                            /> */}                                                 
                            </div>
                        </div>    
                        
                    </div>
                </div>           
            </DropdownButton> 
        </div> 
    );
    
};

export default SearchAircraftElement;