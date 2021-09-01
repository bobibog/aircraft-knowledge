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
import SearchAircraftElement2 from '../../components/SearchElement/SearchAircraftElement2/SearchAircraftElement2';


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
    const[airlineDesc, setAirlineDesc]=useState('');
    const[airlineAsc, setAirlineAsc]=useState('');
    const[operatorsDesc, setOperatorsDesc]=useState('');
    const[operatorsAsc, setOperatorsAsc]=useState('');
    const[typeCodeDesc, setTypeCodeDesc]=useState('');
    const[typeCodeAsc, setTypeCodeAsc]=useState('');
    const[fullTypeDesc, setFullTypeDesc]=useState('');
    const[fullTypeAsc, setFullTypeAsc]=useState('');
    const[registrationDesc, setRegistrationDesc]=useState('');
    const[registrationAsc, setRegistrationAsc]=useState('');
    const[serialNumberDesc, setSerialNumberDesc]=useState('');
    const[serialNumberAsc, setSerialNumberAsc]=useState('');
    const[modeSDesc, setModeSDesc]=useState('');
    const[modeSAsc, setModeSAsc]=useState('');
    const[manufactureDateDesc, setManufactureDateDesc]=useState('');
    const[manufactureDateAsc, setManufactureDateAsc]=useState('');
           
    const dispatch = useDispatch();
    
    const onFetchAircrafts = useCallback(
        () => dispatch(actions.fetchAircrafts(offset, limit, airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate, airlineDesc, airlineAsc, operatorsDesc, operatorsAsc, typeCodeDesc, typeCodeAsc, fullTypeDesc, fullTypeAsc, registrationDesc, registrationAsc, serialNumberDesc, serialNumberAsc, modeSDesc, modeSAsc, manufactureDateDesc, manufactureDateAsc))
        , [dispatch, offset, limit, airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate, airlineDesc, airlineAsc, operatorsDesc, operatorsAsc, typeCodeDesc, typeCodeAsc, fullTypeDesc, fullTypeAsc, registrationDesc, registrationAsc, serialNumberDesc, serialNumberAsc, modeSDesc, modeSAsc, manufactureDateDesc, manufactureDateAsc]
    );
    const onSetAircraftOffsetLimit = (offset, limit) => dispatch(actions.setAircraftOffsetLimit(offset, limit));    
    const onSetAircraftPage = (page) => dispatch(actions.setAircraftPage(page));    
    

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAircraftOffsetLimit(tableOffset, tableLimit);   
    };
    const setAircraftPageHandler = page => {                
        onSetAircraftPage(page);
    };

    // SORTING
    const orderAirlineDsc = (airlineDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setAirlineDesc(airlineDesc);
    }
    const orderAirlineAsc = (airlineAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setAirlineAsc(airlineAsc);
    }
    const orderOperatorDsc = (operatorsDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setOperatorsDesc(operatorsDesc);
    }
    const orderOperatorAsc = (operatorsAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setOperatorsAsc(operatorsAsc);
    }
    const orderTypeCodeDsc = (typeCodeDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setTypeCodeDesc(typeCodeDesc);
    }
    const orderTypeCodeAsc = (typeCodeAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setTypeCodeAsc(typeCodeAsc);
    }
    const orderFullTypeDsc = (fullTypeDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setFullTypeDesc(fullTypeDesc);
    }
    const orderFullTypeAsc = (fullTypeAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setFullTypeAsc(fullTypeAsc);
    }
    const orderRegistrationDsc = (registrationDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setRegistrationDesc(registrationDesc);
    }
    const orderRegistrationAsc = (registrationAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setRegistrationAsc(registrationAsc);
    }
    const orderSerialNumberDsc = (serialNumberDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setSerialNumberDesc(serialNumberDesc);
    }
    const orderSerialNumberAsc = (serialNumberAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setSerialNumberAsc(serialNumberAsc);
    }
    const orderModeSDsc = (modeSDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setModeSDesc(modeSDesc);
    }
    const orderModeSAsc = (modeSAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setModeSAsc(modeSAsc);
    }
    const orderManufactureDateDsc = (manufactureDateDesc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setManufactureDateDesc(manufactureDateDesc);
    }
    const orderManufactureDateAsc = (manufactureDateAsc)=>{
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setManufactureDateAsc(manufactureDateAsc);
    }

    // FILTERING/SEARCHING
    const submitSearchHandler1 = (airline) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler2 = (operators) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler3 = (typeCode) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    }; 
    const submitSearchHandler4 = (fullType) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler5 = (registration) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler6 = (serialNumber) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler7 = (modeS) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler8 = (maxManufactureDate) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        setMaxManufactureDate(maxManufactureDate);
        // setMinManufactureDate(minManufactureDate);
    };
    const submitSearchHandler9 = (minManufactureDate) => {  
        onSetAircraftOffsetLimit(0, limit);
        onSetAircraftPage(0);
        // setAirline(airline);
        // setOperator(operators);
        // setTypeCode(typeCode);
        // setFullType(fullType);
        // setRegistration(registration);
        // setSerialNumber(serialNumber);
        // setModeS(modeS);
        // setMaxManufactureDate(maxManufactureDate);
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
        setAirlineDesc("");
        setAirlineAsc("");
        setOperatorsDesc("");
        setOperatorsAsc("");
        setTypeCodeDesc("");
        setTypeCodeAsc("");
        setFullTypeDesc("");
        setFullTypeAsc("");
        setRegistrationDesc("");
        setRegistrationAsc("");
        setSerialNumberDesc("");
        setSerialNumberAsc("");
        setModeSDesc("");
        setModeSAsc("");
        setManufactureDateDesc("");
        setManufactureDateAsc("");
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
    // if (airline == '' || operators == '' || typeCode == '' || fullType == '' || registration == '' || serialNumber == '' || modeS == '' || minManufactureDate == '' || maxManufactureDate == '' || airlineAsc == '' || airlineDesc == '' || operatorsAsc == '' || operatorsDesc == '' || typeCodeAsc == '' || typeCodeDesc == '' || fullTypeAsc == '' || fullTypeDesc =='' || registrationAsc == '' || registrationDesc == '' || serialNumberAsc =='' || serialNumberDesc=='' || modeSAsc == '' || modeSDesc == '' || manufactureDateAsc == '' || manufactureDateDesc == '') {
    //     aircraftsTable = <p style={{ textAlign: 'center', color:'white', marginTop:'65px', fontSize:'24px', background:'#007bff', borderRadius:'5px', marginLeft:'25px', marginRight:'25px' }}><u>↑ Please start your search ↑</u></p>;
    // }
    if (aircraft && !loading ) {
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
            <SearchAircraftElement2
                clickedSearch1={submitSearchHandler1}
                clickedSearch2={submitSearchHandler2}
                clickedSearch3={submitSearchHandler3}
                clickedSearch4={submitSearchHandler4}
                clickedSearch5={submitSearchHandler5}
                clickedSearch6={submitSearchHandler6}
                clickedSearch7={submitSearchHandler7}
                clickedSearch8={submitSearchHandler8}
                clickedSearch9={submitSearchHandler9}

                orderAircraftByAirlineDsc={orderAirlineDsc}
                orderAircraftByAirlineAsc={orderAirlineAsc}
                orderAircraftByOperatorDsc={orderOperatorDsc}
                orderAircraftByOperatorAsc={orderOperatorAsc}
                orderAircraftByRegistrationDsc={orderRegistrationDsc}
                orderAircraftByRegistrationAsc={orderRegistrationAsc}
                orderAircraftByTypeCodeDsc={orderTypeCodeDsc}
                orderAircraftByTypeCodeAsc={orderTypeCodeAsc}
                orderAircraftByFullTypeDsc={orderFullTypeDsc}
                orderAircraftByFullTypeAsc={orderFullTypeAsc}
                orderAircraftBySerialNumberDsc={orderSerialNumberDsc}
                orderAircraftBySerialNumberAsc={orderSerialNumberAsc}
                orderAircraftByModeSDsc={orderModeSDsc}
                orderAircraftByModeSAsc={orderModeSAsc}
                orderAircraftByManufactureDateDsc={orderManufactureDateDsc}
                orderAircraftByManufactureDateAsc={orderManufactureDateAsc}

                clickedReset={resetSearchHandler}
                id={aircraftsTable.tableId}                   
            /> 
                                               
            {aircraftsTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(AircraftsSearch, axios);