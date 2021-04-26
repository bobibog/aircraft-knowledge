import React from 'react';
import classes from './LabelCustom.module.css';


const LabelCustom = React.memo((props) =>{            
    
    return(        
        <label className={classes.label}>{props.children}</label>           
    );   
});

export default LabelCustom;