import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonBordered.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.ButtonBordered, classes[props.btnType]].join(' ')}        
        data-toggle={props.toggle} 
        data-placement={props.placement} 
        title={props.title} 
        onClick={props.clicked}
        onMouseDown={props.mouseDown}  
        onMouseLeave={props.mouseLeave}   
        onMouseUp={props.onMouseUp}         
        >{props.children}</button>
);

button.propTypes = {
    btnType: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func
};

export default button;