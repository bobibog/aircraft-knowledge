import React from 'react';
import classes from './Search.module.css';


const Search = React.memo((props) =>{            
    
    return(        
        <input  ref={props.inputRef} className={classes.input}  type={props.type} placeholder={props.placeholder} value={props.value}  onChange={props.changed} />
    );     
});

export default Search;