import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axios from '../../axios-airlines';
import axiosGlobal from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Airline from '../../components/Airline/Airline';
import Table from '../../components/UI/Table/Table';
import {airlineHeader} from '../../shared/staticData';

const Airlines = props => {
    const airlinesInit = [
        {AirlineId: 1, AirlineName: 'ABX Air', IATA: 'GB', ICAO: 'ABX', Fleet: 15},
        {AirlineId: 2, AirlineName: 'ACE Belgium Freighters', IATA: 'X7', ICAO: 'FRH', Fleet: 1},
        {AirlineId: 3, AirlineName: 'Advanced Air', IATA: 'AN', ICAO: 'WSN', Fleet: 3},
        {AirlineId: 4, AirlineName: 'Aegean Airlines', IATA: 'A3', ICAO: 'AEE', Fleet: 53},
        {AirlineId: 5, AirlineName: 'Aer Lingus', IATA: 'EI', ICAO: 'EIN', Fleet: 68},
        {AirlineId: 6, AirlineName: 'AerCaribe', IATA: 'JK', ICAO: 'ACL', Fleet: 3},
        {AirlineId: 7, AirlineName: 'Aero Contractors', IATA: '', ICAO: 'NIG', Fleet: 3},
        {AirlineId: 8, AirlineName: 'Aero Mongolia', IATA: 'M0', ICAO: 'MNG', Fleet: 5},
        {AirlineId: 9, AirlineName: 'Aero-Dienst', IATA: '', ICAO: 'ADN', Fleet: 9},
        {AirlineId: 10, AirlineName: 'Aerodynamics', IATA: '4A', ICAO: 'DYN', Fleet: 2},
        {AirlineId: 11, AirlineName: 'Aero Union', IATA: '6R', ICAO: 'TNO', Fleet: 8}
    ];

    // const airlinesHeader = [
    //     {
    //       name: "Name",
    //       prop: "airlineName"
    //     },
    //     {
    //       name: "IATA",
    //       prop: "iata"
    //     },
    //     {
    //       name: "ICAO",
    //       prop: "icao"
    //     },
    //     {
    //       name: "Fleet",
    //       prop: "fleet"
    //     }
    // ];
    
    const [airlines, setAirlines] = useState(null);
    const [loading, setLoading] = useState(false);

    const airlinesInitHandler = () => {
        //setAirlines(airlinesInit);
        for (let airline of airlinesInit) {
            axios.post('/airlines.json', airline)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }
        
    };
    
    //console.log(props);
    useEffect(() => {        
        setLoading(true);
        // axios.get('/airlines.json'
        //     // , {
        //     // validateStatus: function (status) {
        //     //   return status >= 200 && status < 300; // Resolve only if the status code is less than 500
        //     // }
        //     )
        //     .then(response => {
        //         //console.log('Odgovor je: ' + response);
        //         const fetchedAirlines = [];
        //         if(response) {
        //             for (let key in response.data) {
        //                 fetchedAirlines.push(
        //                     response.data[key]
        //                 );
        //             };  
        //         }                 
        //         setAirlines(fetchedAirlines);
        //         setLoading(false); 
        //     }
        //     // , error => {
        //     //     if (error.response.status === 401) {
        //     //      //place your reentry code
        //     //     }
        //     //     return error;
        //     //   }
        //     )
        //     .catch(error => {
        //         setLoading(false);
        //         //console.log('Greska je: ' + error);                
        //     });
        
            axiosGlobal.get('https://localhost:44350/api/v1/airline'
            // , {
            // validateStatus: function (status) {
            //   return status >= 200 && status < 300; // Resolve only if the status code is less than 500
            // }
            )
            .then(response => {
                //console.log('Odgovor je: ' + response);
                
                // const fetchedAirlines = [];                
                // if(response) {
                //     for (let key in response.data) {
                //         fetchedAirlines.push(
                //             response.data[key]
                //         );
                //     };  
                // }  

                setAirlines(response.data);
                // setAirlines(fetchedAirlines);

                setLoading(false); 
            }
            // , error => {
            //     if (error.response.status === 401) {
            //      //place your reentry code
            //     }
            //     return error;
            //   }
            )
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });
    }, []);

    //let airlinesDataRows = null;
    let airlinesTable = <Spinner />;
    if (!airlines && !loading) {
        airlinesTable = null;
    }
    if (airlines && !loading) {
        airlinesTable = <Table 
            data={airlines}
            header={airlineHeader}
            paramsRoute={{
                baseRoute: "/aircraft",
                params: ["airlineId"],
                delimiter: "-"
            }} />;        
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
            <h2>Airlines</h2>
            {airlinesTable}
            <Hidden {...hideCell(12)}>
                <button onClick={airlinesInitHandler}>Airlines Init</button>
            </Hidden> 
        </div>        
    );
};

export default withErrorHandler(Airlines, axios);