import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirlineElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';

const  SearchAirlineElement = (props) => {

    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleetMin, setFleetMin] = useState('');
    const[fleetMax, setFleetMax] = useState('');

    const airlineNameInputConfig = {
        type:'text',
        placeholder:'Enter airline name.'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'Enter IATA -code.'
    }
    const icaoInputConfig = {
        type:'text',
        placeholder:'Enter ICAO -code.'
    }
    const fleetMinInputConfig = {
        type:'number',
        placeholder:'Enter min. number of aircraft in a fleet .'
    }
    const fleetMaxInputConfig = {
        type:'number',
        placeholder:'Enter max. number of aircraft in a fleet .'
    }

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleetMin("");
        setFleetMax("");
        props.clickedReset();       
    };     

    return (
        <div className={classes.container}> 
        
            <div className="row">           
                <div className="col-md">                        
                    <div className={classes.card} >
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={airlineName}
                                changed={(e)=>setAirlineName(e.target.value)}                                                                             
                                elementType='input' 
                                elementConfig= {airlineNameInputConfig}                                                                                                                      
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
                                value={icao}
                                changed={(e)=>setICAO(e.target.value)}          
                                elementType='input' 
                                elementConfig= {icaoInputConfig}                     
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
                                value={fleetMin}
                                changed={(e)=>setFleetMin(e.target.value)}
                                elementType='input' 
                                elementConfig= {fleetMinInputConfig}                                               
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={fleetMax}
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
                    >SEARCH</ButtonBordered>
                    <ButtonBordered
                        clicked={resetSearchHandler}
                        btnType="Secondary"    
                    >RESET</ButtonBordered>
                    </div>
                </div>
            </div>           
        
        </div> 
    );
};

export default SearchAirlineElement;