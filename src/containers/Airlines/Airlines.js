import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Airline from '../../components/Airline/Airline';
import Table from '../../components/UI/Table/Table';
import {airlineHeader} from '../../shared/staticData';
//import {airlinesInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAirlineElement from '../../components/SearchElement/SearchAirlineElement/SearchAirlineElement';


const Airlines = props => {
    const airlines = useSelector(state => {
        return state.airline.airlines;
    });
    const airlinesCount = useSelector(state => {
        return state.airline.airlinesCount;
    });
    const loading = useSelector(state => {
        return state.airline.airlinesLoading;
    });
    const offset = useSelector(state => {
        return state.airline.airlinesOffset;
    });
    const limit = useSelector(state => {
        return state.airline.airlinesLimit;
    });
    const page = useSelector(state => {
        return state.airline.airlinesPage;
    });   
           
    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleetMin, setFleetMin] = useState('');
    const[fleetMax, setFleetMax] = useState('');
           
    const dispatch = useDispatch();
    
    const onFetchAirlines = useCallback(
        () => dispatch(actions.fetchAirlines(offset, limit, airlineName, iata, icao, fleetMin, fleetMax))
        , [dispatch, offset, limit, airlineName, iata, icao, fleetMin, fleetMax]
    );
    
    // Ordering Dsc/Asc
    const onOrderAirlinesByNameDesc = useCallback(
        () => dispatch(actions.orderAirlinesByNameDsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByNameAsc = useCallback(
        () => dispatch(actions.orderAirlinesByNameAsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByIataDsc = useCallback(
        () => dispatch(actions.orderAirlinesByIataDsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByIataAsc = useCallback(
        () => dispatch(actions.orderAirlinesByIataAsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByIcaoDsc = useCallback(
        () => dispatch(actions.orderAirlinesByIcaoDsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByIcaoAsc = useCallback(
        () => dispatch(actions.orderAirlinesByIcaoAsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByFleetDsc = useCallback(
        () => dispatch(actions.orderAirlinesByFleetDsc(offset, limit))
        , [dispatch, offset, limit]
    );
    const onOrderAirlinesByFleetAsc = useCallback(
        () => dispatch(actions.orderAirlinesByFleetAsc(offset, limit))
        , [dispatch, offset, limit]
    );


    const onSetAirlinesOffsetLimit = (offset, limit) => dispatch(actions.setAirlinesOffsetLimit(offset, limit));    
    const onSetAirlinesPage = (page) => dispatch(actions.setAirlinesPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirlinesOffsetLimit(tableOffset, tableLimit);   
    };
    const setAirlinesPageHandler = page => {                
        onSetAirlinesPage(page);
    };

       
    const submitSearchHandler1 = (airlineName) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setAirlineName(airlineName);
        // setIATA(iata);
        // setICAO(icao);
        // setFleetMin(fleetMin);  
        // setFleetMax(fleetMax);        
    };
    
    const submitSearchHandler2 = (iata) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        // setAirlineName(airlineName);
        setIATA(iata);
        // setICAO(icao);
        // setFleetMin(fleetMin);  
        // setFleetMax(fleetMax);        
    };

    const submitSearchHandler3 = (icao) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        // setAirlineName(airlineName);
        // setIATA(iata);
        setICAO(icao);
        // setFleetMin(fleetMin);  
        // setFleetMax(fleetMax);        
    };

    const submitSearchHandler4 = (fleetMin) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);        
        setFleetMin(fleetMin);  
        // setFleetMax(fleetMax);        
    };
    const submitSearchHandler5 = (fleetMax) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);        
        //setFleetMin(fleetMin);  
        setFleetMax(fleetMax);        
    };

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleetMin("");
        setFleetMax("");
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0); 
        onOrderAirlinesByNameAsc();  
                    
    };      
       
    useEffect(() => { 
        onFetchAirlines();
        
    }, [onFetchAirlines]);  
    
    
        
    const airlinesPageHeader =
        <CardsInBox
            headerText="Airlines"
            backColor="#F0F8FF" 
            
        />;   
    
    let airlinesTable = <Spinner />;
    if (!airlines && !loading  ) {
        airlinesTable = <p style={{ textAlign: 'center' }}>Could not read airlines from the server!</p>;
    }
    if (airlines && !loading) {
        airlinesTable = <Table 
            data={airlines}
            header={airlineHeader}
            paramsRoute={{
                baseRoute: "/aircraft",
                params: ["airlineId"],
                delimiter: "-"
            }}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={airlinesCount}
            setPageStore={setAirlinesPageHandler}
            currPage={page}  
                       
            />;        
    }      
    
    return (
        <React.Fragment>           
            {airlinesPageHeader}             
            <SearchAirlineElement
                clickedSearch1={submitSearchHandler1} 
                clickedSearch2={submitSearchHandler2}
                clickedSearch3={submitSearchHandler3}
                clickedSearch4={submitSearchHandler4}
                clickedSearch5={submitSearchHandler5}
                orderAirlinesByNameDesc={onOrderAirlinesByNameDesc}
                orderAirlinesByNameAsc={onOrderAirlinesByNameAsc}
                orderAirlinesByIataDesc={onOrderAirlinesByIataDsc}
                orderAirlinesByIataAsc={onOrderAirlinesByIataAsc}
                orderAirlinesByIcaoDesc={onOrderAirlinesByIcaoDsc}
                orderAirlinesByIcaoAsc={onOrderAirlinesByIcaoAsc}
                orderAirlinesByFleetDsc={onOrderAirlinesByFleetDsc}
                orderAirlinesByFleetAsc={onOrderAirlinesByFleetAsc}
                clickedReset={resetSearchHandler}                       
            />                                     
            {airlinesTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);