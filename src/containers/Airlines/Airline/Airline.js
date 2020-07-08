import React, {useState, useEffect} from 'react';

import CardsInBox from '../../../components/UI/CardsInBox/CardsInBox';
//import axios from '../../../axios-local';
import axios from '../../axios-azure';
import {airlineHeader} from '../../../shared/staticData';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Airline = (props) => {
    const [airline, setAirline] = useState(null);
    const [loading, setLoading] = useState(false);

    const {airlineId} = props;

    useEffect(() => {
        setLoading(true);
        axios.get(`/airline/${airlineId}`)
            .then(response => {
                setAirline(response.data);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });
    }, [airlineId]);

    let airlineBox = <p style={{ textAlign: 'center' }}>Please select an Airline!</p>;
    //let airlinesDataRows = null;
    if (airlineId) {
        airlineBox = <Spinner />;
    }
    
    if (!airline && !loading) {
        airlineBox = null;
    }
    if (airline && !loading) {
        airlineBox = <CardsInBox 
            data={airline}
            header={airlineHeader}
            headerColumnName="airlineName"
            // headerText="Airline"
            // headerTextDelimiter=":"
         />;        
    };  

    return (
        <React.Fragment>
            {airlineBox}
        </React.Fragment>        
    );
};

export default Airline;