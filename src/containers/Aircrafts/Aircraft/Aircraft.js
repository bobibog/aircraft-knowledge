import React, {useState, useEffect} from 'react';

import CardsInBox from '../../../components/UI/CardsInBox/CardsInBox';
// import axios from '../../../axios-local';
import axios from '../../../axios-azure';
import {aircraftHeader} from '../../../shared/staticData';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Aircraft = (props) => {
    const [aircraft, setAircraft] = useState(null);
    const [loading, setLoading] = useState(false);

    const {aircraftId} = props;

    useEffect(() => {
        setLoading(true);
        axios.get(`/aircraft/${aircraftId}`)
            .then(response => {
                setAircraft(response.data);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });
    }, [aircraftId]);

    let aircraftBox = <p style={{ textAlign: 'center' }}>Please select an Aircraft!</p>;
    //let aircraftsDataRows = null;
    if (aircraftId) {
        aircraftBox = <Spinner />;
    }
    
    if (!aircraft && !loading) {
        aircraftBox = null;
    }
    if (aircraft && !loading) {
        aircraftBox = <CardsInBox 
            data={aircraft}
            header={aircraftHeader}
            headerColumnName="aircraftName"
            // headerText="Aircraft"
            // headerTextDelimiter=":"
         />;        
    };  

    return (
        <React.Fragment>
            {aircraftBox}
        </React.Fragment>        
    );
};

export default Aircraft;