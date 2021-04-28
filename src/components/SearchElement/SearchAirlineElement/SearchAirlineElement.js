import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirlineElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';

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
                        <div className="input-group mb-3 input-group-sm" itemID="wraper"  >
                            <div className="input-group-prepend" style={{height:"38px", marginTop:"8px"}} >
                                <span className="input-group-text" style={{position:"absolute", display:"inline-block", height:"38px"}} >
                                    <FontAwesomeIcon icon={faFilter} style={{position:"relative"}} />                                                                        
                                </span>                                
                            </div>                   
                            <Input
                                value={airlineName}
                                changed={(e)=>setAirlineName(e.target.value)}                                                                             
                                elementType='input' 
                                elementConfig= {airlineNameInputConfig}                                                                                                                      
                            />
                        </div>
                        <div className="input-group mb-3 input-group-sm" itemID="wraper" >
                            <div className="input-group-prepend" style={{height:"38px", marginTop:"8px"}}>
                                <span className="input-group-text" style={{position:"absolute", display:"inline-block", height:"38px"}}>
                                    <FontAwesomeIcon icon={faFilter} style={{position:"relative"}} />                                                                        
                                </span>                                                                
                            </div>                   
                            <Input
                            value={iata}
                            changed={(e)=>setIATA(e.target.value)}
                            elementType='input'
                            elementConfig={iataInputConfig}
                        />
                        </div>                     
                        <div className="input-group mb-3 input-group-sm" itemID="wraper">
                            <div className="input-group-prepend" style={{height:"38px", marginTop:"8px"}}>
                                <span className="input-group-text" style={{position:"absolute", display:"inline-block", height:"38px"}}>
                                    <FontAwesomeIcon icon={faFilter} style={{position:"relative"}} />                                                                        
                                </span>                                
                            </div>                   
                            <Input 
                            value={icao}
                            changed={(e)=>setICAO(e.target.value)}          
                            elementType='input' 
                            elementConfig= {icaoInputConfig}                     
                        />
                        </div>
                                                
                    </div>
                </div>    
                <div className="col-md">                
                    <div className={classes.card}>
                    <div className="input-group mb-3 input-group-sm" itemID="wraper">
                            <div className="input-group-prepend" style={{height:"38px", marginTop:"8px"}}>
                                <span className="input-group-text" style={{position:"absolute", display:"inline-block", height:"38px"}}>
                                    <FontAwesomeIcon icon={faFilter} style={{position:"relative"}}/>                                                                        
                                </span>                                
                            </div>                   
                            <Input
                            value={fleetMin}
                            changed={(e)=>setFleetMin(e.target.value)}
                            elementType='input' 
                            elementConfig= {fleetMinInputConfig}                                               
                        />
                        </div>                                                  
                        <div className="input-group mb-3 input-group-sm" itemID="wraper">
                            <div className="input-group-prepend" style={{height:"38px", marginTop:"8px"}}>
                                <span className="input-group-text" itemID="span" style={{position:"absolute", display:"inline-block", height:"38px"}}>
                                    <FontAwesomeIcon icon={faFilter} style={{position:"relative"}}/>                                                                        
                                </span> 

                            </div>                   
                            <Input
                            value={fleetMax}
                            changed={(e)=>setFleetMax(e.target.value)}
                            elementType='input' 
                            elementConfig= {fleetMaxInputConfig}                                               
                        />
                        </div>
                        
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