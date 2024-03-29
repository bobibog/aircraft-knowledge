import React, {useState, useSelector} from 'react';
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

    // const toggleDropdown = () => {        
    //         setClose(true);        
    // }

    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airlineNameInputConfig = {
        type:'text',
        placeholder:'Enter airline name'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'Enter IATA -code'
    }
    const icaoInputConfig = {
        type:'text',
        placeholder:'Enter ICAO -code'
    }
    const fleetMinInputConfig = {
        type:'number',
        placeholder:'Min. num'
    }
    const fleetMaxInputConfig = {
        type:'number',
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
    //                             value={airlineName}
    //                             changed={(e)=>setAirlineName(e.target.value)}                                                                             
    //                             elementType='input' 
    //                             elementConfig= {airlineNameInputConfig}                                                                                                                      
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
    //                             value={icao}
    //                             changed={(e)=>setICAO(e.target.value)}          
    //                             elementType='input' 
    //                             elementConfig= {icaoInputConfig}                     
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
    //                             value={fleetMin}
    //                             changed={(e)=>setFleetMin(e.target.value)}
    //                             elementType='input' 
    //                             elementConfig= {fleetMinInputConfig}                                               
    //                         />
    //                     </InputGroup>
    //                     <InputGroup className="mb-3 input-group-sm">
    //                         <InputGroup.Prepend className={classes.inputPrepend}>
    //                             <InputGroup.Text className={classes.span}>
    //                                 <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
    //                             </InputGroup.Text>                                
    //                         </InputGroup.Prepend>                   
    //                         <Input
    //                             value={fleetMax}
    //                             changed={(e)=>setFleetMax(e.target.value)}
    //                             elementType='input' 
    //                             elementConfig= {fleetMaxInputConfig}                                               
    //                         />
    //                     </InputGroup>                       
    //                 </div>
    //                 <div className={classes.buttonBox}>
    //                 <ButtonBordered 
    //                     clicked={() => (props.clickedSearch(airlineName, iata, icao, fleetMin, fleetMax))}
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
                    <DropdownButton id="dropdown-item-button" title="Name" >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByNameAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByNameDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={airlineName}
                                    changed={(e)=>setAirlineName(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress1}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch1(airlineName))}
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
                    <DropdownButton id="dropdown-item-button" className={classes.dropBtn} title="IATA" >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIataAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIataDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
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
                    <DropdownButton id="dropdown-item-button" title="ICAO">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIcaoAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIcaoDesc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                        <div className={classes.label}><small><label>Contains:</label></small></div>
                        <div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={icao}
                                    changed={(e)=>setICAO(e.target.value)}
                                    elementType='input'
                                    elementConfig= {columnInputConfig}
                                    onKeyUp = {handleKeyPress3}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch3(icao))}
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
                    <DropdownButton id="dropdown-item-button" className={classes.dropButton} title="Fleet">                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByFleetAsc("asc"))}><FcNumericalSorting12/> <small>Sort Min to Max</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByFleetDsc("dsc"))}><FcNumericalSorting21/> <small>Sort Max to Min</small></Dropdown.Item>
                        
                        <div>
                        <div className={classes.label}><small><label>Is:</label></small></div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                                <Input
                                    value={fleetMin}
                                    changed={(e)=>setFleetMin(e.target.value)}
                                    elementType='input'
                                    elementConfig= {fleetMinInputConfig}
                                    onKeyUp = {handleKeyPress4}
                                />                                
                            </InputGroup>
                            <div className={classes.label}><small><label>Is:</label></small></div>
                            <InputGroup className="mb-3 input-group-sm">
                                <InputGroup.Prepend className={classes.inputPrepend}>
                                    <InputGroup.Text className={classes.span}>
                                        <FcSearch/>                                                                        
                                    </InputGroup.Text>                                
                                </InputGroup.Prepend>                             
                                <Input
                                    value={fleetMax}
                                    changed={(e)=>setFleetMax(e.target.value)}
                                    elementType='input'
                                    elementConfig= {fleetMaxInputConfig}
                                    onKeyUp = {handleKeyPress5}
                                />
                                
                            </InputGroup>
                            <ButtonBordered 
                                clicked={() => (props.clickedSearch4(fleetMin), props.clickedSearch5(fleetMax))}
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

export default SearchAirlineElement;