import React, {useState, useEffect} from 'react';
//import Hidden from '@material-ui/core/Hidden';

//import axiosFirebase from '../../axios-firebase';
//import axios from '../../axios-local';
import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import { flightHeader, aircraftHeader, airlineHeader } from '../../shared/staticData';
//import {flightsInit} from '../../shared/staticData';
//import Airline from '../Airlines/Airline/Airline';
//import Aircraft from '../Aircrafts/Aircraft/Aircraft';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';

const Flights = props => {
    const {match} = props;

    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false);

    // const [airline, setAirline] = useState(null);
    // const [loadingAirline, setLoadingAirline] = useState(false);

    // const flightsInitHandler = () => {
    //     for (let flight of flightsInit) {
    //         axiosFirebase.post('/flights.json', flight)
    //             .then(response => console.log('Odgovor je: ' + response))
    //             .catch(error => console.log('Greska je: ' + error));
    //     }
        
    // };
    

    useEffect(() => {
        setLoading(true);
        //setLoadingAirline(true);
        if (match.params.id) {
            // axios.get(`/airline/getairlineforaircraft/${match.params.id}`)
            //     .then(response => {
            //         //console.log('Odgovor je: ' + response);
            //         // const fetchedFlights = [];
            //         // if(response) {
            //         //     for (let key in response.data) {
            //         //         fetchedFlights.push(
            //         //             response.data[key]
            //         //         );
            //         //     };  
            //         // }                 
            //         // setFlights(fetchedFlights);
            //         setAirline(response.data);
            //         setLoadingAirline(false); 
            //     })
            //     .catch(error => {
            //         setLoadingAirline(false);
            //         //console.log('Greska je: ' + error);                
            //     });  
            axios.get(`/flight/getflightsforaircraft/${match.params.id}`)
                .then(response => {
                    //console.log('Odgovor je: ' + response);
                    // const fetchedFlights = [];
                    // if(response) {
                    //     for (let key in response.data) {
                    //         fetchedFlights.push(
                    //             response.data[key]
                    //         );
                    //     };  
                    // }                 
                    setFlights(response.data);
                    setLoading(false); 
                })
                .catch(error => {
                    setLoading(false);
                    //console.log('Greska je: ' + error);                
                });            
        }

    }, [match.params.id]);

    let airlineBox = null;
    let aircraftBox = null;
    // if (match.params.id) {
    //     airlineBox = <Spinner />;
    // }
    // if (airline) {
    //     airlineBox = <Airline airlineId={airline.airlineId} />;
    // }

    // let aircraftBox = null;
    // if (match.params.id) {
    //     aircraftBox = <Aircraft airlineId={match.params.id} />;
    // }

    let flightsAirline = null;
    let flightsAircraft = null;
    

    let flightsTable = <p style={{ textAlign: 'center' }}>Please select an Airline!</p>;
    if (match.params.id) {
        flightsTable = <Spinner />;
    }    
    if (!flights && !loading) {
        flightsTable = <p style={{ textAlign: 'center' }}>Could not read flights from the server!</p>;
    }
    if (flights && flights.length === 0 && !loading) {
        match.params.id
            ? flightsTable = <p style={{ textAlign: 'center' }}>There is no flights for the selected Airline!</p>
            : flightsTable = <p style={{ textAlign: 'center' }}>There is no flights!</p>;
    }
    if (flights && !loading) {
        for (const flight of flights) {
            if (flight && flight.aircraft && flight.aircraft.airline) {
                flightsAircraft = flight.aircraft;
                flightsAirline = flight.aircraft.airline;
                break;
            }
        }
        airlineBox = flightsAirline
            ? <CardsInBox 
                data={flightsAirline}
                header={airlineHeader}
                headerColumnName="airlineName"
                // backColor="lightsalmon"
                backColor="#ffebee"
                // headerText="Airline"
                // headerTextDelimiter=":"
            />
            : null;
        
        aircraftBox = flightsAircraft
            ? <CardsInBox 
                data={flightsAircraft}
                header={aircraftHeader}
                headerColumnName="registration"
                // backColor="powderblue"
                backColor="#e3f2fd"
                // headerText="Airline"
                // headerTextDelimiter=":"
            />
            : null;
             
        flightsTable = <Table 
            data={flights}
            header={flightHeader} />;        
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
        <React.Fragment>
            {/* <h2>Flights</h2> */}
            {airlineBox}
            {aircraftBox}
            {flightsTable}
            {/* <Hidden {...hideCell(12)}>
                <button onClick={flightsInitHandler}>Flights Init</button>
            </Hidden>  */}
        </React.Fragment>        
    );
};

export default withErrorHandler(Flights, axios);