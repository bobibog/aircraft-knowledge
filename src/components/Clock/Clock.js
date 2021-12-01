import React, {useState} from 'react';
import classes from './Clock.module.css';

const Clock = () => {
    
    let time = new Date().toUTCString().replace('GMT', ' UTC');

    const[currentTime, setCurrentTime] = useState(time);

    const UpdateTime = () => {
        time = new Date().toUTCString().replace('GMT', ' UTC');
        setCurrentTime(time);
    };

    setInterval(UpdateTime, 1000);

    return (
        <div className={classes.Clock}>
            <label>{currentTime}</label>
        </div>
    )
}

export default Clock;
