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


const  SearchAirlineElement = (props) => {

    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleetMin, setFleetMin] = useState('');
    const[fleetMax, setFleetMax] = useState('');

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
                    <DropdownButton id="dropdown-item-button"  >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByNameAsc())}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByNameDesc())}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
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
                            {/* <ButtonBordered 
                                clicked={() => (props.clickedSearch1(airlineName))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered> */}
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>
                
                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" className={classes.dropBtn} >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIataAsc())}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIataDesc())}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
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
                            {/* <ButtonBordered 
                                clicked={() => (props.clickedSearch2(iata))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered> */}
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIcaoAsc())}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByIcaoDesc())}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
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
                            {/* <ButtonBordered 
                                clicked={() => (props.clickedSearch3(icao))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered> */}
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

                <div className={classes.grid_item}>
                    <DropdownButton id="dropdown-item-button" className={classes.dropButton} >                            
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByFleetAsc())}><FcNumericalSorting12/> <small>Sort Min to Max</small></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>(props.orderAirlinesByFleetDsc())}><FcNumericalSorting21/> <small>Sort Max to Min</small></Dropdown.Item>
                        <div>
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
                            {/* <ButtonBordered 
                                clicked={() => (props.clickedSearch4(fleetMin))}
                                btnType="Success"                            
                                >SEARCH
                            </ButtonBordered> */}
                            <ButtonBordered
                                clicked={resetSearchHandler}
                                btnType="Secondary"    
                                >RESET
                            </ButtonBordered> 
                        </div>                                
                    </DropdownButton>
                </div>

            </div>       
    );
};

export default SearchAirlineElement;