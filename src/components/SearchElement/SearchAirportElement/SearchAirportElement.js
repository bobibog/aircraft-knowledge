import React, {useState, useEffect, useRef} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirportElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {FcAlphabeticalSortingAz} from 'react-icons/fc';
import {FcAlphabeticalSortingZa} from 'react-icons/fc';
import {FcNumericalSorting12} from 'react-icons/fc';
import {FcNumericalSorting21} from 'react-icons/fc';
import {FcSearch} from 'react-icons/fc';

const  SearchAirportElement = (props) => {

    const[airportName, setAirportName] = useState('');
    const[iata, setIATA] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState(''); 
    
    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airportNameInputConfig = {
        type:'text',
        placeholder:'Airport name'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'IATA -code'
    }
    const cityInputConfig = {
        type:'text',
        placeholder:'City'
    }
    const countryInputConfig = {
        type:'text',
        placeholder:'Country'
    }    

    const resetSearchHandler = () => {
        setAirportName("");
        setIATA("");
        setCity("");
        setCountry("");
        props.clickedReset();       
    };     

    const handleKeyPress1 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch1(airportName); 
        }
    }

    const handleKeyPress2 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch2(iata); 
        }
    }

    const handleKeyPress3 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch3(city); 
        }
    }

    const handleKeyPress4 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch4(country); 
        }
    }

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
            {/* <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}> */}
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
                                        value={airportName}
                                        // changed={(e)=>setAirportName(e.target.value) & setFilter(e.target.value)}  
                                        changed={(e)=>setAirportName(e.target.value)}                                                                           
                                        elementType='input' 
                                        elementConfig= {airportNameInputConfig}                                                                                                                      
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={iata}
                                        changed={(e)=>setIATA(e.target.value) & setFilter(e.target.value)}
                                        elementType='input'
                                        elementConfig={iataInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={city}
                                        // changed={(e)=>setCity(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setCity(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {cityInputConfig}                     
                                    />
                                </InputGroup>                                                 
                            </div>
                        </div>    
                        <div className="col-md">                
                            <div className={classes.card}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={country}
                                        // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setCountry(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {countryInputConfig}                                               
                                    />
                                </InputGroup>                                              
                            </div>
                            <div className={classes.buttonBox}>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch(airportName, iata, city, country))}
                                btnType="Success" 
                                mouseDown={(e)=>setFilter('a')}
                                mouseLeave={(e)=>toggleDropdown()}                           
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
            </DropdownButton>
        </div> 
    );
    
};

export default SearchAirportElement;