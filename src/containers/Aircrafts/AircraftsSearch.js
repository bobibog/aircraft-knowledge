import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {aircraftSearchHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAircraftElement from '../../components/SearchElement/SearchAircraftElement/SearchAircraftElement';


const AircraftsSearch = props => {
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
           
    const[airline, setAirline] = useState('');
    const[operators, setOperator] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[fullType, setFullType] = useState('');
    const[registration, setRegistration]=useState('');
    const[serialNumber, setSerialNumber]=useState('');
    const[modeS, setModeS]=useState('');
    const[maxManufactureDate, setMaxManufactureDate]=useState('');
    const[minManufactureDate, setMinManufactureDate]=useState('');    
           
    const dispatch = useDispatch();
    
    const onFetchAircrafts = useCallback(
        () => dispatch(actions.fetchAircrafts(offset, limit, airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate))
        , [dispatch, offset, limit, airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate]
    );
    const onSetAircraftOffsetLimit = (offset, limit) => dispatch(actions.setAircraftOffsetLimit(offset, limit));    
    const onSetAircraftPage = (page) => dispatch(actions.setAircraftPage(page));    
    

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAircraftOffsetLimit(tableOffset, tableLimit);   
    };
    const setAircraftPageHandler = page => {                
        onSetAircraftPage(page);
    };

    const submitSearchHandler = (airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setAirline(airline);
        setOperator(operators);
        setTypeCode(typeCode);
        setFullType(fullType);
        setRegistration(registration);
        setSerialNumber(serialNumber);
        setModeS(modeS);
        setMaxManufactureDate(maxManufactureDate);
        setMinManufactureDate(minManufactureDate);
    };    

    const resetSearchHandler = () => {        
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);   
        setAirline("");
        setOperator("");
        setTypeCode("");
        setFullType("");
        setRegistration("");
        setSerialNumber("");
        setModeS("");
        setMaxManufactureDate("");
        setMinManufactureDate("");   
        // If we want to bring back to previous page (not on default one) 
        //onFetchAircrafts();     
    };      
       
    useEffect(() => { 
        onFetchAircrafts();
    }, [onFetchAircrafts]);    
        
    const aircraftsPageHeader =
        <CardsInBox
            headerText="Aircraft"
            backColor="#F0F8FF" />;   
    
    let aircraftsTable = <Spinner />;
    if (!aircraft && !loading  ) {
        aircraftsTable = <p style={{ textAlign: 'center' }}>Could not read aircraft from the server!</p>;
    }
    if (aircraft && !loading) {
        aircraftsTable = <Table 
            tableId="aircraftTable"
            data={aircraft}
            header={aircraftSearchHeader}
            paramsRoute={{
                baseRoute: "/aircraft",
                params: ["aircraftId"],
                delimiter: "-"
            }}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={aircraftCount}
            setPageStore={setAircraftPageHandler}
            currPage={page}  
                       
            />;        
    }          
    
    return (
        <React.Fragment>           
            {aircraftsPageHeader}             
            <SearchAircraftElement
                clickedSearch={submitSearchHandler} 
                clickedReset={resetSearchHandler}
                id={aircraftsTable.tableId}                   
            /> 
                                               
            {aircraftsTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(AircraftsSearch, axios);