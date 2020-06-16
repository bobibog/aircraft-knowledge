import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axios from '../../axios-airlines';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';

const Flights = props => {
    const flightsInit = [
        {FlightId: 933, FlightCode: 'GB3482', FlightDate: '2020-01-27', FromAirportName: 'Charlotte (CLT)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '61', FlightStd: '06:00', FlightAtd: '06:40', FlightSta: '07:41', FlightStatus: 'Landed', FlightLanded: '07:41', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 934, FlightCode: 'GB3406', FlightDate: '2020-01-27', FromAirportName: 'Wilmington (ILN)', ToAirportName: 'Charlotte (CLT)', FlightTime: '52', FlightStd: '01:19', FlightAtd: '01:29', FlightSta: '02:20', FlightStatus: 'Landed', FlightLanded: '02:21', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 935, FlightCode: 'GB3403', FlightDate: '2020-01-26', FromAirportName: 'Charlotte (CLT)', ToAirportName: 'Wilmington (ILN)', FlightTime: '57', FlightStd: '18:39', FlightAtd: '18:57', FlightSta: '19:56', FlightStatus: 'Landed', FlightLanded: '19:54', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 936, FlightCode: 'GB3427', FlightDate: '2020-01-26', FromAirportName: 'Charlotte (CLT)', ToAirportName: '', FlightTime: '', FlightStd: '', FlightAtd: '', FlightSta: '', FlightStatus: 'Scheduled', FlightLanded: '', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 937, FlightCode: 'GB3427', FlightDate: '2020-01-26', FromAirportName: 'Cincinnati (CVG)', ToAirportName: 'Charlotte (CLT)', FlightTime: '69', FlightStd: '14:43', FlightAtd: '15:36', FlightSta: '16:44', FlightStatus: 'Landed', FlightLanded: '16:45', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 938, FlightCode: 'GB903', FlightDate: '2020-01-24', FromAirportName: 'Seattle (SEA)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '229', FlightStd: '19:56', FlightAtd: '20:12', FlightSta: '03:04', FlightStatus: 'Landed', FlightLanded: '03:01', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 939, FlightCode: 'GB903', FlightDate: '2020-01-24', FromAirportName: 'Portland (PDX)', ToAirportName: 'Seattle (SEA)', FlightTime: '33', FlightStd: '18:12', FlightAtd: '18:33', FlightSta: '18:42', FlightStatus: 'Landed', FlightLanded: '19:06', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 940, FlightCode: 'GB904', FlightDate: '2020-01-24', FromAirportName: 'Seattle (SEA)', ToAirportName: 'Portland (PDX)', FlightTime: '28', FlightStd: '08:09', FlightAtd: '10:32', FlightSta: '08:56', FlightStatus: 'Landed', FlightLanded: '10:59', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 941, FlightCode: 'GB904', FlightDate: '2020-01-24', FromAirportName: 'Cincinnati (CVG)', ToAirportName: 'Seattle (SEA)', FlightTime: '247', FlightStd: '05:06', FlightAtd: '05:56', FlightSta: '07:03', FlightStatus: 'Landed', FlightLanded: '07:03', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 942, FlightCode: 'GB90', FlightDate: '2020-01-17', FromAirportName: 'Norfolk (NGU)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '88', FlightStd: '15:00', FlightAtd: '15:22', FlightSta: '16:49', FlightStatus: 'Landed', FlightLanded: '16:50', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 943, FlightCode: 'GB2251', FlightDate: '2020-01-17', FromAirportName: 'Guantanamo (GAO)', ToAirportName: '', FlightTime: '178', FlightStd: '', FlightAtd: '11:02', FlightSta: '', FlightStatus: 'Landed', FlightLanded: '19:00', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
        {FlightId: 944, FlightCode: 'GB91', FlightDate: '2020-01-17', FromAirportName: 'Norfolk(ORF)', ToAirportName: '', FlightTime: '', FlightStd: '', FlightAtd: '06:43', FlightSta: '', FlightStatus: 'Unknown', FlightLanded: '', DivertedToAirport: '', AircraftRegistration: 'N312AA'}
    ];

    const flightsHeader = [
        {
            name: "Code",
            prop: "FlightCode"
        },
        {
            name: "Date",
            prop: "FlightDate"
        },
        {
            name: "From",
            prop: "FromAirportName"
        },
        {
            name: "To",
            prop: "ToAirportName"
        },
        {
            name: "Duration (minutes)",
            prop: "FlightTime"
        },
        {
            name: "Std",
            prop: "FlightStd"
        },
        {
            name: "Atd",
            prop: "FlightAtd"
        },
        {
            name: "Sta",
            prop: "FlightSta"
        },
        {
            name: "Status",
            prop: "FlightStatus"
        },
        {
            name: "Landed",
            prop: "FlightLanded"
        },
        {
            name: "Diverted",
            prop: "DivertedToAirport"
        },
        {
            name: "Aircraft",
            prop: "AircraftRegistration"
        }
    ];
    
    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false);

    const flightsInitHandler = () => {
        for (let flight of flightsInit) {
            axios.post('/flights.json', flight)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }
        
    };
    

    useEffect(() => {
        setLoading(true);
        axios.get('/flights.json'
            // , {
            // validateStatus: function (status) {
            //   return status >= 200 && status < 300; // Resolve only if the status code is less than 500
            // }
            )
            .then(response => {
                //console.log('Odgovor je: ' + response);
                const fetchedFlights = [];
                if(response) {
                    for (let key in response.data) {
                        fetchedFlights.push(
                            response.data[key]
                        );
                    };  
                }                 
                setFlights(fetchedFlights);
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
    let flightsTable = <Spinner />;
    if (!flights && !loading) {
        flightsTable = null;
    }
    if (flights && !loading) {
        flightsTable = <Table 
            data={flights}
            header={flightsHeader} />;        
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
            <h2>Flights</h2>
            {flightsTable}
            <Hidden {...hideCell(12)}>
                <button onClick={flightsInitHandler}>Flights Init</button>
            </Hidden> 
        </div>        
    );
};

export default withErrorHandler(Flights, axios);