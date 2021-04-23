import React, {useState, useEffect, useCallback, useRef} from 'react';
//import Hidden from '@material-ui/core/Hidden';
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
    const[fleet, setFleet] = useState('');
           
    const dispatch = useDispatch();
    
    const onFetchAirlines = useCallback(
        () => dispatch(actions.fetchAirlines(offset, limit, airlineName, iata, icao, fleet))
        , [dispatch, offset, limit, airlineName, iata, icao, fleet]
    );
    const onSetAirlinesOffsetLimit = (offset, limit) => dispatch(actions.setAirlinesOffsetLimit(offset, limit));    
    const onSetAirlinesPage = (page) => dispatch(actions.setAirlinesPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirlinesOffsetLimit(tableOffset, tableLimit);   
    };
    const setAirlinesPageHandler = page => {                
        onSetAirlinesPage(page);
    };

    const submitSearchHandler = (airlineName, iata, icao, fleet) => {  
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setAirlineName(airlineName);
        setIATA(iata);
        setICAO(icao);
        setFleet(fleet);          
    };    

    const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleet("");               
    };      
       
    useEffect(() => { 
        onFetchAirlines();
    }, [onFetchAirlines]);    
        
    const airlinesPageHeader =
        <CardsInBox
            headerText="Airlines"
            backColor="#ffebee" />;   
    
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
                clickedSearch={submitSearchHandler} 
                clickedReset={resetSearchHandler}                       
            />                                     
            {airlinesTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);