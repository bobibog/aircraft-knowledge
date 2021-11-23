import React from 'react';
import classes from './SearchBar.module.css';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar =({placeholder, data})=> {
    return (
        <div className={classes.search}>
            <div className={classes.searchInputs}>
                <div className={classes.searchIcon}><SearchIcon /></div>
                <input type="text" placeholder={placeholder}/>
            </div>
            <div className={classes.dataResults}>
                {data.map((value, key)=>{
                    return <div>{value.airlineName}</div>
                })}
            </div>
        </div>
        
    )
}

export default SearchBar;
