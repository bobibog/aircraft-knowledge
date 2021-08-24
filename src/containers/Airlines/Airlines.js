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
    const[airlineNameDesc, setAirlineNameDesc] = useState('');
    const[airlineNameAsc, setAirlineNameAsc] = useState('');
    const[iataDesc, setIataDesc] = useState('');
    const[iataAsc, setIataAsc] = useState('');
    const[icaoDesc, setIcaoDesc] = useState('');
    const[icaoAsc, setIcaoAsc] = useState('');
    const[fleetDesc, setFleetDesc] = useState('');
    const[fleetAsc, setFleetAsc] = useState('');

    const dispatch = useDispatch();
    
    const onFetchAirlines = useCallback(
        () => dispatch(actions.fetchAirlines(offset, limit, airlineName, iata, icao, fleetMin, fleetMax, airlineNameDesc, airlineNameAsc, iataDesc, iataAsc, icaoDesc, icaoAsc, fleetDesc, fleetAsc))
        , [dispatch, offset, limit, airlineName, iata, icao, fleetMin, fleetMax, airlineNameDesc, airlineNameAsc, iataDesc, iataAsc, icaoDesc, icaoAsc, fleetDesc, fleetAsc]
    );
    
    // Ordering Dsc/Asc
    // const onOrderAirlinesByNameDesc = useCallback(
    //     () => dispatch(actions.orderAirlinesByNameDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByNameAsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByNameAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByIataDsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByIataDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByIataAsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByIataAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByIcaoDsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByIcaoDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByIcaoAsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByIcaoAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByFleetDsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByFleetDsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );
    // const onOrderAirlinesByFleetAsc = useCallback(
    //     () => dispatch(actions.orderAirlinesByFleetAsc(offset, limit))
    //     , [dispatch, offset, limit]
    // );


    const onSetAirlinesOffsetLimit = (offset, limit) => dispatch(actions.setAirlinesOffsetLimit(offset, limit));    
    const onSetAirlinesPage = (page) => dispatch(actions.setAirlinesPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirlinesOffsetLimit(tableOffset, tableLimit);   
    };
    const setAirlinesPageHandler = page => {                
        onSetAirlinesPage(page);
    };

    // SORTING
    const orderAirlineNameDsc = (airlineNameDesc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setAirlineNameDesc(airlineNameDesc);
    }
    const orderAirlineNameAsc = (airlineNameAsc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setAirlineNameAsc(airlineNameAsc);
    }
    const orderIataDsc = (iataDesc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setIataDesc(iataDesc);
    }
    const orderIataAsc = (iataAsc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setIataAsc(iataAsc);
    }
    const orderIcaoDsc = (icaoDesc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setIcaoDesc(icaoDesc);
    }
    const orderIcaoAsc = (icaoAsc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setIcaoAsc(icaoAsc);
    }
    const orderFleetDsc = (fleetDesc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setFleetDesc(fleetDesc);
    }
    const orderFleetAsc = (fleetAsc)=>{
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);
        setFleetAsc(fleetAsc);
    }
       
    // FILTERING/SEARCHING
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
        setAirlineNameDesc("");  
        setAirlineNameAsc("");
        setIataDesc("");
        setIataAsc("");
        setIcaoAsc("");
        setIcaoDesc("");
        setFleetAsc("");
        setFleetDesc("");         
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
        airlinesTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read airlines from the server!</p>;
    }
    // if (airlineName == '' || iata == '' || icao == '' || fleetMin =='' || fleetMax == '' || airlineNameDesc == '' || airlineNameAsc == '' || iataAsc == '' || iataDesc == '' || icaoAsc == '' || icaoDesc == '' || fleetAsc == '' || fleetDesc == '' ) {
    //     airlinesTable = <p style={{ textAlign: 'center', color:'white', marginTop:'65px', fontSize:'24px', background:'#007bff', borderRadius:'5px', marginLeft:'25px', marginRight:'25px' }}><u>↑ Please start your search ↑</u></p>;
        
    // }
    if (airlines && !loading ) {
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
                       
            /> ;        
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

                orderAirlinesByNameDesc={orderAirlineNameDsc}
                orderAirlinesByNameAsc={orderAirlineNameAsc}
                orderAirlinesByIataDesc={orderIataDsc}
                orderAirlinesByIataAsc={orderIataAsc}
                orderAirlinesByIcaoDesc={orderIcaoDsc}
                orderAirlinesByIcaoAsc={orderIcaoAsc}
                orderAirlinesByFleetDsc={orderFleetDsc}
                orderAirlinesByFleetAsc={orderFleetAsc}
                clickedReset={resetSearchHandler}                       
            />                                     
            {airlinesTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);