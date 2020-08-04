import React, {useState, useEffect, useCallback} from 'react';
//import Hidden from '@material-ui/core/Hidden';
import {useSelector, useDispatch} from 'react-redux';

//import axiosFirebase from '../../axios-firebase';
// import axios from '../../axios-local';
import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {airportHeader} from '../../shared/staticData';
//import {airportsInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';

const Airports = props => {
    const {match} = props;

    const airports = useSelector(state => {
        return state.airport.airports;
    });
    const airportsCount = useSelector(state => {
        return state.airport.airportsCount;
    });
    const loading = useSelector(state => {
        return state.airport.airportsLoading;
    });
    const offset = useSelector(state => {
        return state.airport.airportsOffset;
    });
    const limit = useSelector(state => {
        return state.airport.airportsLimit;
    });
    const page = useSelector(state => {
        return state.airport.airportsPage;
    });

    const dispatch = useDispatch();

    const onFetchAirports = useCallback((airportId) => dispatch(actions.fetchAirports(offset, limit, airportId)), [dispatch, offset, limit]);
    const onSetAirportsOffsetLimit = (offset, limit) => dispatch(actions.setAirportsOffsetLimit(offset, limit));
    const onSetAirportsPage = (page) => dispatch(actions.setAirportsPage(page)); 
    const onUnmountAirports = () => dispatch(actions.unmountAirports());   

    // const [airports, setAirports] = useState(null);
    // const [loading, setLoading] = useState(false);

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirportsOffsetLimit(tableOffset, tableLimit);     
    }

    const setAirportsPageHandler = page => {
        onSetAirportsPage(page);
    }

    useEffect(() => {
        onFetchAirports(match.params.id);
    }, [match.params.id, onFetchAirports]);

    useEffect(() => {
        return () => {
            onUnmountAirports();
        };
    }, []);

    const airportsPageHeader =
        <CardsInBox 
            headerText="Airports"
            backColor="#ffebee" />;

    
    let airportsTable = <Spinner />;
    if (!airports && !loading) {
        airportsTable = <p style={{ textAlign: 'center' }}>Could not read airports from the server!</p>;
    }
    if (airports && !loading) {
        airportsTable = <Table 
            data={airports}
            header={airportHeader}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={airportsCount}
            setAirlinesPage={setAirportsPageHandler}
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