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
    const[airportICAO, setICAO] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const[continent, setContinent] = useState('');
    const[isoCountry, setIsoCountry] = useState('');
    const[airportType, setAirportType] = useState('');
    const[elevationFtMin, setElevationFtMin] = useState('');
    const[elevationFtMax, setElevationFtMax] = useState('');
    const[isoRegion, setIsoRegion] = useState('');
    const[gpsCode, setGpsCode] = useState('');
    const[localCode, setLocalCode] = useState('');
    const[latitudeDegMin, setLatitudeDegMin] = useState('');
    const[latitudeDegMax, setLatitudeDegMax] = useState('');
    const[longitudeDegMin, setLongitudeDegMin] = useState('');
    const[longitudeDegMax, setLongitudeDegMax] = useState('');
    
    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airportNameInputConfig = {
        type:'text',
        placeholder:'Airport name'
    }
    const typeInputConfig = {
        type:'text',
        placeholder:'Airport Type'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'IATA'
    }
    const icaoInputConfig = {
        type:'text',
        placeholder:'ICAO'
    }
    const cityInputConfig = {
        type:'text',
        placeholder:'City'
    }
    const countryInputConfig = {
        type:'text',
        placeholder:'Country'
    } 
    const continentInputConfig = {
        type:'text',
        placeholder:'Continent'
    }
    const isoCountryInputConfig = {
        type:'text',
        placeholder:'ISO Country'
    }
    const isoRegionInputConfig = {
        type:'text',
        placeholder:'ISO Region'
    } 
    const gpsInputConfig = {
        type:'text',
        placeholder:'GPS Code'
    }
    const localCodeInputConfig = {
        type:'text',
        placeholder:'Local Code'
    }
    const elevationMinInputConfig = {
        type:'number',
        placeholder:'Elevation min.'
    }
    const elevationMaxInputConfig = {
        type:'number',
        placeholder:'Elevation max.'
    }
    const latitudeMinInputConfig = {
        type:'number',
        placeholder:'Latitude min.'
    }
    const latitudeMaxInputConfig = {
        type:'number',
        placeholder:'Latitude max.'
    }
    const longitudeMinInputConfig = {
        type:'number',
        placeholder:'Longitude min.'
    }
    const longitudeMaxInputConfig = {
        type:'number',
        placeholder:'Longitude max.'
    } 
     

    const resetSearchHandler = () => {
        setAirportName('');
        setIATA('');
        setCity('');
        setCountry('');   
        setICAO('');
        setAirportType('');
        setElevationFtMin('');
        setElevationFtMax('');
        setContinent('');
        setIsoCountry('');
        setIsoRegion('');
        setGpsCode('');
        setLocalCode('');
        setLatitudeDegMin('');
        setLatitudeDegMax('');
        setLongitudeDegMin('');
        setLongitudeDegMax('');
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
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef} >
                <div className={classes.dropdownShow}>
                    <div className={classes.row}>  
                        <div className={classes.bar}>         
                        <div className="col-sm-3">                        
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
                                        value={airportType}
                                        // changed={(e)=>setAirportName(e.target.value) & setFilter(e.target.value)}  
                                        changed={(e)=>setAirportType(e.target.value)}                                                                           
                                        elementType='input' 
                                        elementConfig= {typeInputConfig}                                                                                                                      
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
                                {/* <InputGroup className="mb-3 input-group-sm">
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
                                </InputGroup> */}
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={continent}
                                        // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setContinent(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {continentInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={isoCountry}
                                        // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setIsoCountry(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {isoCountryInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={isoRegion}
                                        // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setIsoRegion(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {isoRegionInputConfig}                                               
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
                                        changed={(e)=>setIATA(e.target.value)}
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
                                        value={airportICAO}
                                        changed={(e)=>setICAO(e.target.value)}
                                        elementType='input'
                                        elementConfig={icaoInputConfig}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={gpsCode}
                                            // changed={(e)=>setAirportName(e.target.value) & setFilter(e.target.value)}  
                                            changed={(e)=>setGpsCode(e.target.value)}                                                                           
                                            elementType='input' 
                                            elementConfig= {gpsInputConfig}                                                                                                                      
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
                                            value={localCode}
                                            // changed={(e)=>setAirportName(e.target.value) & setFilter(e.target.value)}  
                                            changed={(e)=>setLocalCode(e.target.value)}                                                                           
                                            elementType='input' 
                                            elementConfig= {localCodeInputConfig}                                                                                                                      
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={elevationFtMin}
                                            changed={(e)=>setElevationFtMin(e.target.value)}
                                            elementType='input'
                                            elementConfig={elevationMinInputConfig}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={elevationFtMax}
                                            changed={(e)=>setElevationFtMax(e.target.value)}
                                            elementType='input'
                                            elementConfig={elevationMaxInputConfig}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input 
                                            value={latitudeDegMin}
                                            // changed={(e)=>setCity(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setLatitudeDegMin(e.target.value)}          
                                            elementType='input' 
                                            elementConfig= {latitudeMinInputConfig}                     
                                        />
                                    </InputGroup>  
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={latitudeDegMax}
                                            // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setLatitudeDegMax(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {latitudeMaxInputConfig}                                               
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={longitudeDegMin}
                                            // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setLongitudeDegMin(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {longitudeMinInputConfig}                                               
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3 input-group-sm">
                                        <InputGroup.Prepend className={classes.inputPrepend}>
                                            <InputGroup.Text className={classes.span}>
                                                <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                            </InputGroup.Text>                                
                                        </InputGroup.Prepend>                   
                                        <Input
                                            value={longitudeDegMax}
                                            // changed={(e)=>setCountry(e.target.value) & setFilter(e.target.value)}
                                            changed={(e)=>setLongitudeDegMax(e.target.value)}
                                            elementType='input' 
                                            elementConfig= {longitudeMaxInputConfig}                                               
                                        />
                                    </InputGroup>

                                </div>
                                <div className={classes.buttonBox}>
                                <ButtonBordered 
                                    clicked={() => (props.clickedSearch(airportName, iata, city, country, airportICAO, airportType, elevationFtMin, elevationFtMax, continent, isoCountry, isoRegion, gpsCode, localCode, latitudeDegMin, latitudeDegMax
                                                                        , longitudeDegMin, longitudeDegMax))}
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
                </div>         
            </DropdownButton>
        </div> 
    );
    
};

export default SearchAirportElement;