import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAcarsWithExtData from '../../components/SearchElement/SearchAcarsWithExtData/SearchAcarsWithExtData';
import TableAcarsWithExtData from '../../components/UI/Table/ReactTable/TableAcarsWithExtData/TableAcarsWithExtData';

const AcarsWithExtData = props => {
    const acarsWithExtData = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtData;
    });    

    console.log(acarsWithExtData);
    
    const acarsWithExtDataCount = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtDataCount;
    });

    const loading = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtDataLoading;
    });
    const offset = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtDataOffset;
    });
    const limit = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtDataLimit;
    });
    const page = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtDataPage;
    });   
       
    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');
    const[tail, setTail]= useState('');
    const[flight, setFlight]=useState('');
    const[text, setText]=useState('');
    const[mode, setMode]= useState('');
    const[label, setLabel]= useState('');
    const[blockId, setBlockId] = useState('');
    const[msgno, setMsgno]= useState('');
    const[dsta, setDsta]= useState('');
    const[airline, setAirline]= useState('');
    const[serialNumber, setSerialNumber] = useState('');
    const[aircraftOperator, setAircraftOperator] = useState('');
    const[aircraftType, setAircraftType] = useState('');


    const dispatch = useDispatch();
    
    const onFetchAcarsWithExtData = useCallback(
        () => dispatch(actions.fetchAcarsWithExtData(offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax,
            tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber,
            airline, aircraftOperator, aircraftType ))
        , [dispatch, offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax,
            tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber,
            airline, aircraftOperator, aircraftType ]
    );    
    
    const onSetAcarsWithExtDataOffsetLimit = (offset, limit) => dispatch(actions.setAcarsWithExtDataOffsetLimit(offset, limit));    
    const onSetAcarsWithExtDataPage = (page) => dispatch(actions.setAcarsWithExtDataPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAcarsWithExtDataOffsetLimit(tableOffset, tableLimit);   
    };
    const setAdsbPageHandler = page => {                
        onSetAcarsWithExtDataPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (acarsMessageDateTimeMin, acarsMessageDateTimeMax,
        tail, flight, text, mode, label, blockId, msgno, dsta, airline, serialNumber
        ,aircraftOperator, aircraftType) => {  
        onSetAcarsWithExtDataOffsetLimit(0, limit);
        onSetAcarsWithExtDataPage(0);
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin);
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax);
        setTail(tail);
        setFlight(flight);
        setText(text);
        setMode(mode);
        setLabel(label);
        setBlockId(blockId);
        setMsgno(msgno);
        setDsta(dsta);
        setAirline(airline);
        setSerialNumber(serialNumber);
        setAircraftOperator(aircraftOperator);
        setAircraftType(aircraftType);
    };
    
    
    const resetSearchHandler = () => {
        onSetAcarsWithExtDataOffsetLimit(0, 10);
        onSetAcarsWithExtDataPage(0);
        setAcarsMessageDateTimeMin('');
        setAcarsMessageDateTimeMax('');
        setTail('');
        setFlight('');
        setText('');
        setMode('');
        setLabel('');
        setBlockId('');
        setMsgno('');
        setDsta('');
        setAirline('');
        setSerialNumber('');
        setAircraftOperator('');
        setAircraftType('');    
        setAllOption(0);    
    };    
       
    useEffect(() => { 
        
            onFetchAcarsWithExtData();
        
    }, [onFetchAcarsWithExtData]); 
    
            
    const akrxPageHeader =
        <CardsInBox            
            backColor="#F0F8FF" 
            
        />; 
        
    const[allOption, setAllOption]=useState(0);

    function allChanger(allOption){
        if(allOption==0){
            setAllOption(1);
        return allOption; 
        }
               
    };
    
    //console.log(acarsMessages);
      
    let acarsWithExtDataTable = <Spinner />;
    if (!acarsWithExtData && !loading  ) {
        acarsWithExtDataTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read Adsb messages from the server!</p>;
    }
    
    if (acarsWithExtData && !loading ) {
          

        acarsWithExtDataTable =  <TableAcarsWithExtData
            data={acarsWithExtData}
            rowsPerPageDef={limit}            
            totalDataCount={acarsWithExtDataCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setAdsbPageHandler}   
            allOption={allOption}                     
        />;
        
    }      
    
    return (
        <div style={{marginTop:'-2px'}}>                       
            {/* {akrxPageHeader}              */}
            <SearchAcarsWithExtData
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />                                      
            {acarsWithExtDataTable}                       
        </div>        
    );
};

export default withErrorHandler(AcarsWithExtData, axios);