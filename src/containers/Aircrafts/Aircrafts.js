import React, {useState, useEffect} from 'react';
import Hidden from '@material-ui/core/Hidden';
//import {useParams} from 'react-router-dom';

// import axios from '../../axios-airlines';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import Airline from '../Airlines/Airline/Airline';
import { aircraftsHeader } from '../../shared/staticData';
import {aircraftsInit} from '../../shared/staticData';

const Aircrafts = props => {
    const {match} = props;
    
    const [aircrafts, setAircrafts] = useState(null);
    const [loading, setLoading] = useState(false);

    const aircraftsInitHandler = () => {
        for (let aircraft of aircraftsInit) {
            axios.post('/aircrafts.json', aircraft)
                .then(response => console.log('Odgovor je: ' + response))
                .catch(error => console.log('Greska je: ' + error));
        }        
    };
    
    // let {id} = useParams();
    // console.log(id);
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
        if ( match.params.id ) {
            axios.get('/aircraft/getaircraftinairline/' + match.params.id)
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
    }, [match.params.id]);

    let aircraftsTable = <p style={{ textAlign: 'center' }}>Please select an Airline!</p>;
    //let airlinesDataRows = null;
    if (match.params.id) {
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
    
    let airlineBox = null;
    if (match.params.id) {
        airlineBox = <Airline airlineId={match.params.id} />;
    }

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
            {airlineBox}
            {aircraftsTable}
            <Hidden {...hideCell(12)}>
                <button onClick={aircraftsInitHandler}>Aircrafts Init</button>
            </Hidden> 
        </React.Fragment>        
    );
};

export default withErrorHandler(Aircrafts, axios);