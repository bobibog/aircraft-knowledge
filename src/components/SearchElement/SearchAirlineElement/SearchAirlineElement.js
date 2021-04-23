import React, {useState, useSelector} from 'react';
import Search from '../Search/Search';
import SearchInstructions from '../../Text/SearchInstructions';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';

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
        props.clickedReset();       
    };     

    return (
        <div >     
            <div className="row"> 
                <div className="col-md">          
                    <div className="card" style={{paddingLeft:"5px", width:"500px", marginLeft:"9px", opacity:"0.75" }}>
                        <SearchInstructions><b>Filter: </b>You can search Airlines by their name, IATA-code, ICAO-code and a number of aircrafts in their fleet.</SearchInstructions>
                        <Search
                            value={airlineName}
                            changed={(e)=>setAirlineName(e.target.value)}                                                                                 
                            type={"text"}
                            placeholder={'Enter airline name'}                            
                        />                         
                        <Search
                            value={iata}
                            changed={(e)=>setIATA(e.target.value)}
                            type={"text"}                            
                            placeholder={'Enter IATA - code'}
                        />
                    </div>
                </div>    
                <div className="col-md">                
                    <div className="card" style={{paddingLeft:"5px", opacity:"0.75", paddingTop:"5px", marginLeft:"9px", width:"500px" }}> 
                        <Search 
                            value={icao}
                            changed={(e)=>setICAO(e.target.value)}          
                            type={"text"}                    
                            placeholder={'Enter ICAO - code'}                            
                        />                         
                        <Search
                            value={fleet}
                            changed={(e)=>setFleet(e.target.value)}
                            type={"number"}
                            placeholder={'Enter minimum number of aircrafts in a fleet'}                          
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