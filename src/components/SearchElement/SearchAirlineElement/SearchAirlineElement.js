import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import LabelCustom from '../../UI/Text/LabelCustom';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAirlineElement.module.css';

const  SearchAirlineElement = (props) => {

    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleet, setFleet] = useState('');

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
    const fleetInputConfig = {
        type:'number',
        placeholder:'Enter min. number of airplanes in a fleet .'
    }

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleet("");
        props.clickedReset();       
    };     

    return (
        <div className={classes.container}>     
            <div className="row"> 
                <div className="col-md">          
                    <div className={classes.card} >
                        <LabelCustom>
                            <b>Filter: </b>
                            You can search Airlines by their name, IATA-code, ICAO-code and a number of aircrafts in their fleet.
                        </LabelCustom>
                        <Input
                            value={airlineName}
                            changed={(e)=>setAirlineName(e.target.value)}                                                                             
                            elementType='input' 
                            elementConfig= {airlineNameInputConfig}                       
                        />                         
                        <Input
                            value={iata}
                            changed={(e)=>setIATA(e.target.value)}
                            elementType='input'
                            elementConfig={iataInputConfig}
                        />
                    </div>
                </div>    
                <div className="col-md">                
                    <div className={classes.card}> 
                        <Input 
                            value={icao}
                            changed={(e)=>setICAO(e.target.value)}          
                            elementType='input' 
                            elementConfig= {icaoInputConfig}                     
                        />                         
                        <Input
                            value={fleet}
                            changed={(e)=>setFleet(e.target.value)}
                            elementType='input' 
                            elementConfig= {fleetInputConfig}                                               
                        />                           
                    </div>
                    <ButtonBordered 
                        clicked={() => (props.clickedSearch(airlineName, iata, icao, fleet))}
                        btnType="Success"                            
                    >SEARCH</ButtonBordered>
                    <ButtonBordered
                        clicked={resetSearchHandler}
                        btnType="Secondary"    
                    >CLEAR/RESET</ButtonBordered> 
                </div>
            </div>           
        
        </div> 
    );
};

export default SearchAirlineElement;