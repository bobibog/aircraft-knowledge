import React, {useState, useEffect, useCallback} from 'react';
//import Hidden from '@material-ui/core/Hidden';
//import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//import axiosFirebase from '../../axios-firebase';
//import axios from '../../axios-local';
import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
//import Airline from '../Airlines/Airline/Airline';
import { aircraftHeader, airlineHeader } from '../../shared/staticData';
//import {aircraftsInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';


const Aircrafts = props => {
    const {match} = props;

    const aircraft = useSelector(state => {
        return state.aircraft.aircraft;
    });
    const aircraftCount = useSelector(state => {
        return state.aircraft.aircraftCount;
    });
    const loading = useSelector(state => {
        return state.aircraft.aircraftLoading;
    });
    const offset = useSelector(state => {
        return state.aircraft.aircraftOffset;
    });
    const limit = useSelector(state => {
        return state.aircraft.aircraftLimit;
    });
    const page = useSelector(state => {
        return state.aircraft.aircraftPage;
    });

    
    const dispatch = useDispatch();
    
    const onFetchAircraft = useCallback((airlineId) => dispatch(actions.fetchAircraft(offset, limit, airlineId)), [dispatch, offset, limit]);
    const onSetAircraftOffsetLimit = (offset, limit) => dispatch(actions.setAircraftOffsetLimit(offset, limit));
    const onSetAircraftPage = (page) => dispatch(actions.setAircraftPage(page));
    const onUnmountAircraft = () => dispatch(actions.unmountAircraft());
    
    // const [aircrafts, setAircrafts] = useState(null);
    // const [loading, setLoading] = useState(false);

    // const aircraftsInitHandler = () => {
    //     for (let aircraft of aircraftsInit) {
    //         axiosFirebase.post('/aircrafts.json', aircraft)
    //             .then(response => console.log('Odgovor je: ' + response))
    //             .catch(error => console.log('Greska je: ' + error));
    //     }        
    // };
    
    // let {id} = useParams();
    // console.log(id);
    

    

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAircraftOffsetLimit(tableOffset, tableLimit);     
    }

    const setAircraftPageHandler = page => {
        onSetAircraftPage(page);
    }

    useEffect(() => {
        onFetchAircraft(match.params.id);        
    }, [onFetchAircraft, match.params.id]);

    // We must reset offset and page to 0 when we leave Aircraft page(component). If we don't
    //do it, then when we click on the other Airline, the app would try to go to the same page
    //number on which we were, when we were on Aircraft page of the previous Airline!
    useEffect(() => {
        return () => {
            onUnmountAircraft();
        };
    }, []);

    let airlineBox = null;
    // if (match.params.id) {
    //     airlineBox = <Airline airlineId={match.params.id} />;
    // }
    
    let aircraftsTable = <p style={{ textAlign: 'center' }}>Please select an Airline!</p>;    
    if (match.params.id) {
        aircraftsTable = <Spinner />;
    } 
    if (!aircraft && !loading) {        
        aircraftsTable = <p style={{ textAlign: 'center' }}>Could not read aircraft from the server!</p>;
    }   
    if (aircraft && aircraft.length === 0 && !loading) {
        match.params.id
            ? aircraftsTable = <p style={{ textAlign: 'center' }}>There is no aircraft for the selected Airline!</p>
            : aircraftsTable = <p style={{ textAlign: 'center' }}>There is no aircraft!</p>;
    }
    if (aircraft && aircraft.length > 0 && !loading) {
        // console.log(aircraft);
        // console.log(!!aircraft);
        airlineBox = aircraft[0].airline
            ? <CardsInBox 
                data={aircraft[0].airline}
                header={airlineHeader}
                headerColumnName="airlineName"
                // backColor="lightsalmon"
                backColor="#ffebee"
                // headerText="Airline"
                // headerTextDelimiter=":"
            />
            : null;        
        aircraftsTable = <Table 
            data={aircraft}
            header={aircraftHeader}
            paramsRoute={{
                baseRoute: "/flights",
                params: ["aircraftId"],
                delimiter: "-"
            }}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={aircraftCount}
            setPageStore={setAircraftPageHandler}
            currPage={page} />;        
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
            {airlineBox}
            {aircraftsTable}
            {/* <Hidden {...hideCell(12)}>
                <button onClick={aircraftsInitHandler}>Aircrafts Init</button>
            </Hidden>  */}
        </React.Fragment>        
    );
};

export default withErrorHandler(Aircrafts, axios);