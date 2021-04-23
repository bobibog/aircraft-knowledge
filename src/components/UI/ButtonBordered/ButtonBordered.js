import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonBordered.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.ButtonBodered, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

button.propTypes = {
    btnType: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func
};

export default button;