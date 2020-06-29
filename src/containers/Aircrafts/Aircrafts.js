import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';
import {useParams} from 'react-router-dom';

// import axios from '../../axios-airlines';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';

const Aircrafts = props => {
    console.log(props);
    const aircraftsInit = [
        {AircraftId: 1, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N312AA', SerialNumber: '22315', ModeS: 'A34E40', Age: 35},
        {AircraftId: 2, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N740AX', SerialNumber: '22213', ModeS: 'A9F2A0', Age: 37},
        {AircraftId: 3, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N744AX', SerialNumber: '22221', ModeS: 'AA017C', Age: 36},
        {AircraftId: 4, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N749AX', SerialNumber: '22226', ModeS: 'AA140F', Age: 36},
        {AircraftId: 5, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N750AX', SerialNumber: '22227', ModeS: 'AA1A1F', Age: 35},
        {AircraftId: 6, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N767AX', SerialNumber: '22785', ModeS: 'AA5B9F', Age: 36},
        {AircraftId: 7, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N768AX', SerialNumber: '22786', ModeS: 'AA5F56', Age: 36},
        {AircraftId: 8, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N774AX', SerialNumber: '22789', ModeS: 'AA77F9', Age: 36},
        {AircraftId: 9, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N795AX', SerialNumber: '23145', ModeS: 'AACAAE', Age: 34},
        {AircraftId: 10, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N219CY', SerialNumber: '24358', ModeS: 'A1DB3A', Age: 30},
        {AircraftId: 11, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N226CY', SerialNumber: '26544', ModeS: 'A1F794', Age: 28},
        {AircraftId: 12, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N317CM', SerialNumber: '24317', ModeS: 'A36110', Age: 31}
    ];

    const aircraftsHeader = [
        {
            name: "Airline",
            prop: "airlineName"
        },
        {
            name: "Type Code",
            prop: "typeCode"
        },
        {
            name: "Aircraft Type",
            prop: "aircraftType"
        },
        {
            name: "Registration",
            prop: "registration"
        },
        {
            name: "Serial Number",
            prop: "serialNumber"
        },
        {
            name: "Mode S",
            prop: "modeS"
        },
        {
            name: "Age",
            prop: "age"
        }
    ];
    
    const [aircrafts, setAircrafts] = useState(null);
    const [loading, setLoading] = useState(false);

    const aircraftsInitHandler = () => {
        for (let aircraft of aircraftsInit) {
            axios.post('/aircrafts.json', aircraft)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }
        
    };
    
    let {id} = useParams();
    console.log(id);
    useEffect(() => {
        setLoading(true);
        // axios.get('/aircrafts.json')
        //     .then(response => {
        //         //console.log('Odgovor je: ' + response);
        //         const fetchedAircrafts = [];
        //         if(response) {
        //             for (let key in response.data) {
        //                 fetchedAircrafts.push(
        //                     response.data[key]
        //                 );
        //             };  
        //         }                 
        //         setAircrafts(fetchedAircrafts);
        //         setLoading(false); 
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //         //console.log('Greska je: ' + error);                
        //     });
        if ( props.match.params.id ) {
            axios.get('https://localhost:44350/api/v1/aircraft/getaircraftinairline/' + props.match.params.id)
                .then(response => {
                    //console.log('Odgovor je: ' + response);
                    const fetchedAircrafts = [];
                    if(response) {
                        for (let key in response.data) {
                            fetchedAircrafts.push(
                                response.data[key]
                            );
                        };  
                    }                 
                    setAircrafts(fetchedAircrafts);
                    setLoading(false); 
                })
                .catch(error => {
                    setLoading(false);
                    //console.log('Greska je: ' + error);                
                });
        }
    }, []);

    let aircraftsTable = <p style={{ textAlign: 'center' }}>Please select an Airline!</p>;
    //let airlinesDataRows = null;
    if (props.match.params.id) {
        aircraftsTable = <Spinner />;
    }
    
    if (!aircrafts && !loading) {
        aircraftsTable = null;
    }
    if (aircrafts && !loading) {
        aircraftsTable = <Table 
            data={aircrafts}
            header={aircraftsHeader} />;        
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
            <h2>Aircraft</h2>
            {aircraftsTable}
            <Hidden {...hideCell(12)}>
                <button onClick={aircraftsInitHandler}>Aircrafts Init</button>
            </Hidden> 
        </div>        
    );
};

export default withErrorHandler(Aircrafts, axios);