import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axios from '../../axios-airlines';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {airportsHeader} from '../../shared/staticData';
import {airportsInit} from '../../shared/staticData';

const Airports = props => {
    const [airports, setAirports] = useState(null);
    const [loading, setLoading] = useState(false);

    const airportsInitHandler = () => {
        for (let airport of airportsInit) {
            axios.post('/airports.json', airport)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }        
    };    

    useEffect(() => {
        setLoading(true);
        axios.get('/airports.json')
            .then(response => {
                //console.log('Odgovor je: ' + response);
                const fetchedAirports = [];
                if(response) {
                    for (let key in response.data) {
                        fetchedAirports.push(
                            response.data[key]
                        );
                    };  
                }                 
                setAirports(fetchedAirports);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });
    }, []);
    
    let airportsTable = <Spinner />;
    if (!airports && !loading) {
        airportsTable = null;
    }
    if (airports && !loading) {
        airportsTable = <Table 
            data={airports}
            header={airportsHeader} />;        
    };    

    const hideCell = (index) => {
        let result = {};
        if (index > 11) {
            result = {xlDown: true};
        } else if (index > 5 && index <= 11) {
            result = {lgDown: true};
        } else if (index > 3 && index <= 5) {
            result = {mdDown: true};
        } else if (index === 3) {
            result = {smDown: true};
        } else if (index > 0 && index <= 2) {
            result = {xsDown: true};
        }
        return result;
    };
    
    return (
        <div>
            <h2>Airports</h2>
            {airportsTable}
            <Hidden {...hideCell(12)}>
                <button onClick={airportsInitHandler}>Airports Init</button>
            </Hidden> 
        </div>        
    );
};

export default withErrorHandler(Airports, axios);