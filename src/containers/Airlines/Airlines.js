import React, {useState, useEffect, useCallback, useRef} from 'react';
//import Hidden from '@material-ui/core/Hidden';
import {useSelector, useDispatch} from 'react-redux';
/* import classes from '../../components/Search/Search.module.css';
import SearchInstructions from '../../components/Text/SearchInstructions'; */
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
/* import Search from '../../components/SearchElement/Search/Search';
import Button from '../../components/UI/Button/Button'; */
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
    /* const airlineName= useSelector(state => {
        return state.airline.airlineName;
    });
    const iata = useSelector(state => {
        return state.airline.iata;
     });
    const icao = useSelector(state=>{
        return state.airline.icao;
    });
    const fleet = useSelector(state=>{
        return state.airline.fleet;
    }); */
       
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
        /*  onFetchAirlines();        
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0); */        
    };
      
    /* useEffect(()=>{        
        const timer = setTimeout(()=>{
            if(airlineName===inputName.current.value || iata === inputIata.current.value || icao === inputIcao.current.value || fleet === inputFleet.current.value){
               onSetAirlinesOffsetLimit(0, limit) ;
                onFetchAirlines(offset, limit, airlineName, iata, icao, fleet);
            }                                      
        }, 500);           
        return () => { clearTimeout(timer); };
    }, [onFetchAirlines, inputName, inputIata, inputIcao, inputFleet]); */   
    
    useEffect(() => { 
        onFetchAirlines();
    }, [onFetchAirlines]);

    /* useEffect(()=>{
        if(page>0 && airlinesCount<offset){
            onSetAirlinesOffsetLimit(0, limit) ;
            onSetAirlinesPage(0);                           
        }         
        onFetchAirlines();          
        
    }, [offset, limit, airlinesCount]); */   
        
    const airlinesPageHeader =
        <CardsInBox
            headerText="Airlines"
            backColor="#ffebee" />;    

    
   /* const airlinesNameSearch = <SearchAirlineElement  
                                type={"text"}                                                            
                                 
                                value={airlineName} 
                                changed={(e) => setAirlineName(e.target.value)} 
                                placeholder={'Enter airline name'}
                                />;
     
    const iataSearch = <Search  
                            type={"text"}                                                            
                             
                            value={iata} 
                            changed={(e) => setIATA(e.target.value)} 
                            placeholder={'Enter IATA - code'}
                        />;

    const icaoSearch = <Search 
                            type={"text"}                                                             
                            //inputRef={inputIcao} 
                            value={icao} 
                            changed={(e) => setICAO(e.target.value)} 
                            placeholder={'Enter ICAO - code'}
                        />;

    const fleetSearch = <Search 
                            type={"number"}                                                             
                            //inputRef={inputFleet} 
                            value={fleet} 
                            changed={(e) => setFleet(e.target.value)} 
                            placeholder={'Enter minimum number of aircrafts in a fleet'}
                        />;

    const submitSearch = <Button
                            clicked={submitSearchHandler}
                            btnType="Success"                            
                        >SEARCH</Button>

    const resetSearch = <Button
                            clicked={resetSearchHandler}
                            btnType="Secondary"    
                        >CLEAR/RESET</Button> */
    
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

    // console.log("OFFSET="+offset);
    // console.log("PAGES="+page);
    
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

