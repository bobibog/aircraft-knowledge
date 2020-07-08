import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {airportHeader} from '../../shared/staticData';
import {airportsInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';

const Airports = props => {
    const {match} = props;

    const [airports, setAirports] = useState(null);
    const [loading, setLoading] = useState(false);

    // const airportsInitHandler = () => {
    //     for (let airport of airportsInit) {
    //         axiosFirebase.post('/airports.json', airport)
    //             .then(response => console.log('Odgovor je: ' + response))
    //             .catch(error => console.log('Greska je: ' + error));
    //     }        
    // };    

    useEffect(() => {
        setLoading(true);
        if (!match.params.id) {
            axios.get('/airport')
            .then(response => {
                //console.log('Odgovor je: ' + response);
                // const fetchedAirports = [];
                // if(response) {
                //     for (let key in response.data) {
                //         fetchedAirports.push(
                //             response.data[key]
                //         );
                //     };  
                // }                 
                setAirports(response.data);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });            
        } else {
            axios.get(`/airport/${match.params.id}`)
            .then(response => {
                //console.log('Odgovor je: ' + response);
                // const fetchedAirports = [];
                // if(response) {
                //     for (let key in response.data) {
                //         fetchedAirports.push(
                //             response.data[key]
                //         );
                //     };  
                // }
                const airportsArray = [];
                if (response.data) {
                    airportsArray.push(response.data);
                }                 
                setAirports(airportsArray);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });                      
        }

    }, [match.params.id]);

    const airportsPageHeader =
        <CardsInBox 
            headerText="Airports"
            backColor="#ffebee" />;

    
    let airportsTable = <Spinner />;
    if (!airports && !loading) {
        airportsTable = null;
    }
    if (airports && !loading) {
        airportsTable = <Table 
            data={airports}
            header={airportHeader} />;        
    };    

    // const hideCell = (index) => {
    //     let result = {};
    //     if (index > 11) {
    //         result = {xlDown: true};
    //     } else if (index > 5 && index <= 11) {
    //         result = {lgDown: true};
    //     } else if (index > 3 && index <= 5) {
    //         result = {mdDown: true};
    //     } else if (index === 3) {
    //         result = {smDown: true};
    //     } else if (index > 0 && index <= 2) {
    //         result = {xsDown: true};
    //     }
    //     return result;
    // };
    
    return (
        <div>
            {/* <h2>Airports</h2> */}
            {airportsPageHeader}
            {airportsTable}
            {/* <Hidden {...hideCell(12)}>
                <button onClick={airportsInitHandler}>Airports Init</button>
            </Hidden>  */}
        </div>        
    );
};

export default withErrorHandler(Airports, axios);