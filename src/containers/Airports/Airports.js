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
import SearchAirportElement from '../../components/SearchElement/SearchAirportElement/SearchAirportElement';

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

    const[airportName, setAirportName] = useState('');
    const[iata, setIATA] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const[airportNameDesc, setAirportNameDesc] = useState('');
    const[airportNameAsc, setAirportNameAsc] = useState('');
    const[iataDesc, setIataDesc] = useState('');
    const[iataAsc, setIataAsc] = useState('');
    const[cityDesc, setCityDesc] = useState('');
    const[cityAsc, setCityAsc] = useState('');
    const[countryDesc, setCountryDesc] = useState('');
    const[countryAsc, setCountryAsc] = useState('');

    const dispatch = useDispatch();

    const onFetchAirports = useCallback(
        (airportId) => dispatch(actions.fetchAirports(offset, limit, airportId, airportName, iata, city, country))
        , [dispatch, offset, limit, airportName, iata, city, country]);
    
    // Ordering Dsc/Asc
    // const onOrderAirportsByNameDesc = useCallback(
    //     () => dispatch(actions.orderAirportsByNameDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByNameAsc = useCallback(
    //     () => dispatch(actions.orderAirportsByNameAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByIataDsc = useCallback(
    //     () => dispatch(actions.orderAirportsByIataDesc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByIataAsc = useCallback(
    //     () => dispatch(actions.orderAirportsByIataAesc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByCityDsc = useCallback(
    //     () => dispatch(actions.orderAirportsByCityDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByCityAsc = useCallback(
    //     () => dispatch(actions.orderAirportsByCityAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByCountryDsc = useCallback(
    //     () => dispatch(actions.orderAirportsByCountryDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirportsByCountryAsc = useCallback(
    //     () => dispatch(actions.orderAirportsByCountryAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    
    const onSetAirportsOffsetLimit = (offset, limit) => dispatch(actions.setAirportsOffsetLimit(offset, limit));
    const onSetAirportsPage = (page) => dispatch(actions.setAirportsPage(page)); 
    const onUnmountAirports = () => dispatch(actions.unmountAirports());   

    
    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirportsOffsetLimit(tableOffset, tableLimit);     
    }

    const setAirportsPageHandler = page => {
        onSetAirportsPage(page);
    }

    
    const submitSearchHandler = (airportName, iata, city, country) => {  
        onSetAirportsOffsetLimit(0, limit);
        onSetAirportsPage(0);
        setAirportName(airportName);
        setIATA(iata);
        setCity(city);
        setCountry(country);     
    };  
    
    const resetSearchHandler = () => {
        setAirportName("");
        setIATA("");
        setCity("");
        setCountry("");
        onSetAirportsOffsetLimit(0, limit);
        onSetAirportsPage(0);    
        setAirportNameAsc("");
        setAirportNameDesc("");
        setIataAsc("");
        setIataDesc("");
        setCityAsc("");
        setCityDesc("");
        setCountryAsc("");
        setCountryDesc("");               
    };

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
            backColor="#F0F8FF"/>;

    
    let airportsTable = <Spinner />;
    if (!airports && !loading) {
        airportsTable = <p style={{ textAlign: 'center' }}>Could not read airports from the server!</p>;
    }
    // if (airportName == '' || iata == '' || city == '' || country == '' || airportNameDesc == '' || airportNameAsc == '' || iataDesc == '' || iataAsc == '' || cityDesc == '' || cityAsc == '' || countryDesc == '' || countryAsc == '') {
    //     airportsTable = <p style={{ textAlign: 'center', color:'white', marginTop:'65px', fontSize:'24px', background:'#007bff', borderRadius:'5px', marginLeft:'25px', marginRight:'25px' }}><u>↑ Please start your search ↑</u></p>;
    // }
    if (airports && !loading ) {
        airportsTable = <Table 
            data={airports}
            header={airportHeader}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={airportsCount}
            setPageStore={setAirportsPageHandler}
            currPage={page} />;        
    };    

        
    return (
        <div>
            {/* <h2>Airports</h2> */}
            {airportsPageHeader}
            <SearchAirportElement
                clickedSearch={submitSearchHandler} 
                
                clickedReset={resetSearchHandler}
            />
            {airportsTable}
            {/* <Hidden {...hideCell(12)}>
                <button onClick={airportsInitHandler}>Airports Init</button>
            </Hidden>  */}
        </div>        
    );
};

export default withErrorHandler(Airports, axios);