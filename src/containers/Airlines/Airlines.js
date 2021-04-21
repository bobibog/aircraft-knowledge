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
    
    const[airlineName, setAirlineName] = useState('');
    const[iata, setIATA] = useState('');
    const[icao, setICAO] = useState('');
    const[fleet, setFleet] = useState('');    
           
    const dispatch = useDispatch();

    /* const inputName = useRef(); 
    const inputIata = useRef();
    const inputIcao = useRef();
    const inputFleet = useRef(); */

    const onFetchAirlines = useCallback(() => dispatch(actions.fetchAirlines(offset, limit, airlineName, iata, icao, fleet)), [dispatch, offset, limit]);
    const onSetAirlinesOffsetLimit = (offset, limit) => dispatch(actions.setAirlinesOffsetLimit(offset, limit));    
    const onSetAirlinesPage = (page) => dispatch(actions.setAirlinesPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirlinesOffsetLimit(tableOffset, tableLimit);   
    };
    const setAirlinesPageHandler = page => {                
        onSetAirlinesPage(page);
    };

    const submitSearchHandler = (airlineName, iata, icao, fleet) => {
        setAirlineName(airlineName);
        setIATA(iata);
        setICAO(icao);
        setFleet(fleet);
        onFetchAirlines();                   
    };    

    /* const resetSearchHandler = () => {
        setAirlineName("");
        setIATA("");
        setICAO("");
        setFleet("");        
        onFetchAirlines();        
        onSetAirlinesOffsetLimit(0, limit);
        onSetAirlinesPage(0);       
    };  */
      
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

    
    /* const airlinesNameSearch = <Search  
                                type={"text"}                                                            
                                //inputRef={inputName} 
                                value={airlineName} 
                                changed={(e) => setAirlineName(e.target.value)} 
                                placeholder={'Enter airline name'}
                                />;
    
    const iataSearch = <Search  
                            type={"text"}                                                            
                            //inputRef={inputIata} 
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
            {/* <div className={classes.container}>     
            <div className="row"> 
                <div className="col-md">          
                    <div className="card" style={{paddingLeft:"5px", width:"500px", marginLeft:"9px", opacity:"0.75" }}>
                        <SearchInstructions />
                        {airlinesNameSearch}                         
                        {iataSearch}
                    </div>
                </div>    
                <div className="col-md">                
                    <div className="card" style={{paddingLeft:"5px", opacity:"0.75", paddingTop:"5px", marginLeft:"9px", width:"500px" }}> 
                        {icaoSearch}                             
                        {fleetSearch} 
                                 
                    </div>{submitSearch} 
                        {resetSearch} 
                </div>
            </div>                           
            
        </div> */}  
        <SearchAirlineElement clickedSearch={submitSearchHandler} />                                     
            {airlinesTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);

