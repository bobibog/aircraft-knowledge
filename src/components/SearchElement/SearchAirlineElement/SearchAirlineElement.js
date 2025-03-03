import React, {useState, useEffect, useRef} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirlineElement.module.css';
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


const  SearchAirlineElement = (props) => {

    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleetMin, setFleetMin] = useState('');
    const[fleetMax, setFleetMax] = useState('');

    const[close, setClose]=useState(false);

    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airlineNameInputConfig = {
        type:'text',
        placeholder:'Airline name'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'IATA -code'
    }
    const icaoInputConfig = {
        type:'text',
        placeholder:'ICAO -code'
    }
    const fleetMinInputConfig = {
        type:'number',
        min:0,
        placeholder:'Min. num'
    }
    const fleetMaxInputConfig = {
        type:'number',
        min:0,
        placeholder:'Max. num'
    }

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleetMin("");
        setFleetMax("");
        props.clickedReset();       
    };     

    const handleKeyPress1 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch1(airlineName); 
        }
    }

    const handleKeyPress2 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch2(iata); 
        }
    }

    const handleKeyPress3 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch3(icao); 
        }
    }

    const handleKeyPress4 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch4(fleetMin); 
            props.clickedSearch5(fleetMax);
        }
    }

    const handleKeyPress5 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch4(fleetMin);
            props.clickedSearch5(fleetMax); 
        }
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
    
    return (
        <div className={classes.container}> 
            {/* <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}> */}
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef} >
                <div className={classes.dropdownShow}>
                    <div className={classes.row}>           
                        <div className="col-sm">                        
                            <div className={classes.card} >
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                 
                                    <Input
                                        value={airlineName}
                                        // changed={(e)=>setAirlineName(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAirlineName(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {airlineNameInputConfig}                                                                                                                      
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>              
                                    <Input
                                        value={iata}
                                        // changed={(e)=>setIATA(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setIATA(e.target.value)}
                                        elementType='input'
                                        elementConfig={iataInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>             
                                    <Input 
                                        value={icao}
                                        // changed={(e)=>setICAO(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setICAO(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {icaoInputConfig}                     
                                    />
                                </InputGroup>                                                 
                            </div>
                        </div>    
                        <div className="col-sm">                
                            <div className={classes.card}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>                
                                    <Input
                                        value={fleetMin}
                                        // changed={(e)=>setFleetMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFleetMin(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {fleetMinInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Text className={classes.span}>
                                        <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                    </InputGroup.Text>    
                                    <Input
                                        value={fleetMax}
                                        // changed={(e)=>setFleetMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFleetMax(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {fleetMaxInputConfig}                                               
                                    />
                                </InputGroup>                       
                            </div>
                            <div className={classes.buttonBox}>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch(airlineName, iata, icao, fleetMin, fleetMax))}
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
                            </div>
                        </div>
                    </div> 
                </div>          
            </DropdownButton>
        </div> 
    );
   
};

export default SearchAirlineElement;