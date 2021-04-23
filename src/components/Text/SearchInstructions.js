import React from 'react';
//import classes from '../Search/Search.module.css';

const Search = React.memo((props) =>{            
    
    return(        
        <label >{props.children}</label>                      
            
    );      
    
});

export default Search;