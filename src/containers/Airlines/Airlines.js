import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';

import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Airline from '../../components/Airline/Airline';
import Table from '../../components/UI/Table/Table';
import {airlineHeader} from '../../shared/staticData';
import {airlinesInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';

const Airlines = props => {
    const [airlines, setAirlines] = useState(null);
    const [loading, setLoading] = useState(false);

    const airlinesInitHandler = () => {
        //setAirlines(airlinesInit);
        for (let airline of airlinesInit) {
            axiosFirebase.post('/airlines.json', airline)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }        
    };
    
    //console.log(props);
    useEffect(() => {        
        setLoading(true);        
        axios.get('/airline')
        .then(response => {
            setAirlines(response.data);
            // setAirlines(fetchedAirlines);

            setLoading(false); 
        })
        .catch(error => {
            setLoading(false);
            //console.log('Greska je: ' + error);                
        });
    }, []);

    const airlinesPageHeader =
        <CardsInBox headerText="Airlines" />;


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
        <React.Fragment>
            {/* <h2>Airlines</h2> */}
            {airlinesPageHeader}
            {airlinesTable}
            <Hidden {...hideCell(12)}>
                <button onClick={airlinesInitHandler}>Airlines Init</button>
            </Hidden> 
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);