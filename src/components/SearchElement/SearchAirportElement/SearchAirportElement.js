import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirportElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';

const  SearchAirportElement = (props) => {

    const[airportName, setAirportName] = useState('');
    const[iata, setIATA] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');     

    const airportNameInputConfig = {
        type:'text',
        placeholder:'Enter airport name.'
    }
    const iataInputConfig = {
        type:'text',
        placeholder:'Enter IATA -code.'
    }
    const cityInputConfig = {
        type:'text',
        placeholder:'Enter city.'
    }
    const countryInputConfig = {
        type:'text',
        placeholder:'Enter country.'
    }    

    const resetSearchHandler = () => {
        setAirportName("");
        setIATA("");
        setCity("");
        setCountry("");
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
                                value={airportName}
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
                                value={city}
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

export default SearchAirportElement;