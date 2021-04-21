import React from 'react';
//import classes from '../Search/Search.module.css';

const Search = React.memo((props) =>{            
    
    return(        
        <label ><b>Filter: </b>You can search Airlines by their name, IATA-code, ICAO-code and a number of aircrafts in their fleet.</label>                       
            
    );      
    
});

export default Search;