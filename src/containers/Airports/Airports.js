import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axios from '../../axios-airlines';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';

const Airports = props => {
    const airportsInit = [
        {AirportId: 1, AirportName: 'Seattle Tacoma International Airport', AirportIATA: 'SEA', City: 'Seattle', Country: 'United States'},
        {AirportId: 2, AirportName: 'Portland International Airport', AirportIATA: 'PDX', City: 'Portland', Country: 'United States'},
        {AirportId: 3, AirportName: 'Cincinnati', AirportIATA: 'CVG', City: 'Cincinnati', Country: 'United States'},
        {AirportId: 4, AirportName: 'Norfolk', AirportIATA: 'NGU', City: 'Norfolk', Country: 'United States'},
        {AirportId: 5, AirportName: 'Guantanamo', AirportIATA: 'GAO', City: 'Guantanamo', Country: 'Cuba'},
        {AirportId: 1002, AirportName: 'Norfolk', AirportIATA: 'ORF', City: 'Norfolk', Country: 'United States'},
        {AirportId: 1003, AirportName: 'Mc Guire AFB', AirportIATA: 'WRI', City: 'Wrightstown', Country: 'United States'},
        {AirportId: 1004, AirportName: 'Lajes', AirportIATA: 'TER', City: 'Lajes', Country: 'Portugal'},
        {AirportId: 1005, AirportName: 'Ramstein Air Base', AirportIATA: 'RMS', City: 'Ramstein', Country: 'Germany'},
        {AirportId: 1006, AirportName: 'Cairo', AirportIATA: 'CAI', City: 'Cairo', Country: 'Egypt'},
        {AirportId: 1007, AirportName: 'Mildenhall', AirportIATA: 'MHZ', City: 'Mildenhall', Country: 'United Kingdom'},
        {AirportId: 1008, AirportName: 'Ontario International Airport', AirportIATA: 'ONT', City: 'Ontario', Country: 'United States'},
        {AirportId: 1009, AirportName: 'St. Louis', AirportIATA: 'STL', City: 'St. Louis', Country: 'United States'},
        {AirportId: 1010, AirportName: 'Baltimore', AirportIATA: 'BWI', City: 'Baltimore', Country: 'United States'}
    ];

    const airportsHeader = [
        {
          name: "Name",
          prop: "AirportName"
        },
        {
          name: "IATA",
          prop: "AirportIATA"
        },
        {
          name: "City",
          prop: "City"
        },
        {
          name: "Country",
          prop: "Country"
        }
    ];
    
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
        axios.get('/airports.json'
            // , {
            // validateStatus: function (status) {
            //   return status >= 200 && status < 300; // Resolve only if the status code is less than 500
            // }
            )
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