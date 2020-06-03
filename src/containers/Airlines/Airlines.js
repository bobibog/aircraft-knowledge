import React, {useState, useEffect} from 'react';
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Hidden from '@material-ui/core/Hidden';

import axios from '../../axios-airlines';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Airline from '../../components/Airline/Airline';
import Table from '../../components/UI/Table/Table';

const Airlines = props => {
    const airlinesInit = [
        {AirlineId: 1, AirlineName: 'ABX Air', IATA: 'GB', ICAO: 'ABX', Fleet: 15},
        {AirlineId: 2, AirlineName: 'ACE Belgium Freighters', IATA: 'X7', ICAO: 'FRH', Fleet: 1},
        {AirlineId: 3, AirlineName: 'Advanced Air', IATA: 'AN', ICAO: 'WSN', Fleet: 3},
        {AirlineId: 4, AirlineName: 'Aegean Airlines', IATA: 'A3', ICAO: 'AEE', Fleet: 53}
    ];

    const airlinesHeader = [
        {
          name: "Name",
          prop: "AirlineName"
        },
        {
          name: "IATA",
          prop: "IATA"
        },
        {
          name: "ICAO",
          prop: "ICAO"
        },
        {
          name: "Fleet",
          prop: "Fleet"
        }
    ];
    
    const [airlines, setAirlines] = useState(null);
    //const [loading, setLoading] = useState(false);

    const airlinesInitHandler = () => {
        //setAirlines(airlinesInit);
        for (let airline of airlinesInit) {
            axios.post('/airlines.json', airline)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
        
    };

    useEffect(() => {
        axios.get('/airlines.json')
            .then(response => {
                //console.log(response);
                const fetchedAirlines = [];
                for (let key in response.data) {
                    fetchedAirlines.push(
                        response.data[key]
                    );
                };   
                setAirlines(fetchedAirlines); 
            })
            .catch(error => console.log(error));;
    }, []);



    //let airlinesDataRows = null;
    let airlinesTable = <Spinner />;
    if (airlines) {
        airlinesTable = <Table 
            data={airlines}
            header={airlinesHeader} />;
        // airlinesDataRows = airlines.map(airline => (
        //     <Airline key={airline.AirlineId} airline={airline} />
        // ));
        // airlinesTable = (
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>Id</th>
        //                 <th>Name</th>
        //                 <th>Fleet</th>
        //                 <th>IATA</th>
        //                 <th>ICAO</th>                        
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {airlinesDataRows}
        //         </tbody>                
        //     </table>
        // );
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
            <h1 hidden>Airlines</h1>
            <Hidden {...hideCell(6)}>
                <button onClick={airlinesInitHandler}>Airlines Init</button>
            </Hidden>            
            <br />
            <br />
            {airlinesTable}
        </div>        
    );
};

export default Airlines;