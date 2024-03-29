import React from 'react';

import aircraftKnowledgeLogo from '../../assets/images/logo11.JPG';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={aircraftKnowledgeLogo} alt="AK-Logo" />
    </div>
);

export default logo;