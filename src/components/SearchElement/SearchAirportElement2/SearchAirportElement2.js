import React, {useState, useSelector} from 'react';
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
        placeholder:'Enter airport name'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'Enter IATA -code'
    }
    const cityInputConfig = {
        type:'text',
        placeholder:'Enter city'
    }
    const countryInputConfig = {
        type:'text',
        placeholder:'Enter country'
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

    // return (
    //     <div className={classes.container}> 
        
    //         <div className="row">           
    //             <div className="col-md">                        
    //                 <div className={classes.card} >
    //                     <InputGroup className="mb-3 input-group-sm">
    //                         <InputGroup.Prepend className={classes.inputPrepend}>
    //                             <InputGroup.Text className={classes.span}>
    //                                 <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
    //                             </InputGroup.Text>                                
    //                         </InputGroup.Prepend>                   
    //                         <Input
    //                             value={airportName}
    //                             changed={(e)=>setAirportName(e.target.value)}                                                                             
    //                             elementType='input' 
    //                             elementConfig= {airportNameInputConfig}                                                                                                                      
    //                         />
    //                     </InputGroup>
    //                     <InputGroup className="mb-3 input-group-sm">
    //                         <InputGroup.Prepend className={classes.inputPrepend}>
    //                             <InputGroup.Text className={classes.span}>
    //                                 <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
    //                             </InputGroup.Text>                                
    //                         </InputGroup.Prepend>                   
    //                         <Input
    //                             value={iata}
    //                             changed={(e)=>setIATA(e.target.value)}
    //                             elementType='input'
    //                             elementConfig={iataInputConfig}
    //                         />
    //                     </InputGroup>
    //                     <InputGroup className="mb-3 input-group-sm">
    //                         <InputGroup.Prepend className={classes.inputPrepend}>
    //                             <InputGroup.Text className={classes.span}>
    //                                 <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
    //                             </InputGroup.Text>                                
    //                         </InputGroup.Prepend>                   
    //                         <Input 
    //                             value={city}
    //                             changed={(e)=>setCity(e.target.value)}          
    //                             elementType='input' 
    //                             elementConfig= {cityInputConfig}                     
    //                         />
    //                     </InputGroup>                                                 
    //                 </div>
    //             </div>    
    //             <div className="col-md">                
    //                 <div className={classes.card}>
    //                     <InputGroup className="mb-3 input-group-sm">
    //                         <InputGroup.Prepend className={classes.inputPrepend}>
    //                             <InputGroup.Text className={classes.span}>
    //                                 <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
    //                             </InputGroup.Text>                                
    //                         </InputGroup.Prepend>                   
    //                         <Input
    //                             value={country}
    //                             changed={(e)=>setCountry(e.target.value)}
    //                             elementType='input' 
    //                             elementConfig= {countryInputConfig}                                               
    //                         />
    //                     </InputGroup>                                              
    //                 </div>
    //                 <div className={classes.buttonBox}>
    //                 <ButtonBordered 
    //                     clicked={() => (props.clickedSearch(airportName, iata, city, country))}
    //                     btnType="Success"                            
    //                 >SEARCH</ButtonBordered>
    //                 <ButtonBordered
    //                     clicked={resetSearchHandler}
    //                     btnType="Secondary"    
    //                 >RESET</ButtonBordered>
    //                 </div>
    //             </div>
    //         </div>           
        
    //     </div> 
    // );
    return(
        <div className={classes.grid_container}>
                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" title="Name">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByNameAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByNameDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={airportName}
                                    changed={(e)=>setAirportName(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress1}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch1(airportName))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"
                                toggle="tooltip"
                                placement="right"
                                title="Reset all columns"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>
                
                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" title="IATA">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByIataAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByIataDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={iata}
                                    changed={(e)=>setIATA(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress2}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch2(iata))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"
                                toggle="tooltip"
                                placement="right"
                                title="Reset all columns"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" title="City">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByCityAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByCityDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={city}
                                    changed={(e)=>setCity(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress3}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch3(city))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"
                                toggle="tooltip"
                                placement="right"
                                title="Reset all columns"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" className={classes.dropButton} title="Country">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByCountryAsc("asc"))}><FcNumericalSorting12/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirportsByCountryDsc("dsc"))}><FcNumericalSorting21/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={country}
                                    changed={(e)=>setCountry(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress4}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch4(country))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered>
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"
                                toggle="tooltip"
                                placement="right"
                                title="Reset all columns"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

            </div>
    );
};

export default SearchAirportElement;