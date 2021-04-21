import React, {useState} from 'react';
import Search from '../Search/Search';
//import classes from '../SearchElement/Search/Search.module.css';
import SearchInstructions from '../../Text/SearchInstructions';
import Button from '../../UI/Button/Button';


const  SearchAirlineElement = (props) => {

    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleet, setFleet] = useState('');

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleet("");       
    }; 

    return (
        <div >     
            <div className="row"> 
                <div className="col-md">          
                    <div className="card" style={{paddingLeft:"5px", width:"500px", marginLeft:"9px", opacity:"0.75" }}>
                        <SearchInstructions />
                        <Search
                            type={"text"}
                            value={airlineName} 
                            changed={(e) => setAirlineName(e.target.value)} 
                            placeholder={'Enter airline name'}
                        />                         
                        <Search
                            type={"text"}                                                            
                            value={iata} 
                            changed={(e) => setIATA(e.target.value)} 
                            placeholder={'Enter IATA - code'}
                        />
                    </div>
                </div>    
                <div className="col-md">                
                    <div className="card" style={{paddingLeft:"5px", opacity:"0.75", paddingTop:"5px", marginLeft:"9px", width:"500px" }}> 
                        <Search 
                            type={"text"}                                                             
                            value={icao} 
                            changed={(e) => setICAO(e.target.value)} 
                            placeholder={'Enter ICAO - code'}                            
                        />                         
                        <Search
                            type={"number"}                                                             
                            value={fleet} 
                            changed={(e) => setFleet(e.target.value)} 
                            placeholder={'Enter minimum number of aircrafts in a fleet'}                          
                        />                           
                    </div>
                    <Button 
                        clicked={props.clickedSearch(airlineName, iata, icao, fleet)}
                        btnType="Success"                            
                    >SEARCH</Button>
                    <Button
                        clicked={resetSearchHandler}
                        btnType="Secondary"    
                    >CLEAR/RESET</Button> 
                </div>
            </div>           
        
        </div> 
    );
};

export default SearchAirlineElement;