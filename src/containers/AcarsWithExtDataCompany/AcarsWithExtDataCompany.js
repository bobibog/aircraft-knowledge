import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
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
import Clock from '../../components/Clock/Clock';
import {AuthContext} from '../../context/auth-context';

const AcarsWithExtDataCompany = props => {
    
    const authContext = useContext(AuthContext);
    const authCheckState = authContext.authenticationCheckState;    
    let isCompany = authContext.user.company;
    
    const acarsWithExtData = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsPerAircraftMessages;
    });        
    
    const acarsWithExtDataCount = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsPerAircraftMessagesCount;
    });

    const loading = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsWithExtDataLoading;
    });
    const offset = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsWithExtDataOffset;
    });
    const limit = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsWithExtDataLimit;
    });
    const page = useSelector(state => {
        return state.acarsWithExtDataCompany.acarsWithExtDataPage;
    });   
       
    const [nowDateTime, setNowDateTime] = useState(new Date());
    const [twentyFourHoursAgoDateTime, setTwentyFourHoursAgoDateTime] = useState(new Date(Date.now() - 360 * 60 * 60 * 1000));

    useEffect(() => {
        // Update the state variables with the current and 24 hours before date and time
        const interval = setInterval(() => {
          setNowDateTime(new Date());
          setTwentyFourHoursAgoDateTime(new Date(Date.now() - 360 * 60 * 60 * 1000));
        }, 1000); // Update every second
    
        // Clean up interval on component unmount
        return () => clearInterval(interval);
      }, []);
    
      // Function to format date to yyyy-MM-dd HH:mm:ss format
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
      

    /////////////////////////////
    const[aggrStatus, setAggrStatus]=useState('');
    const[parsedText, setParsedText]=useState('');
    const[consensusStatus, setConsensusStatus]=useState('');
    const[consensusResult, setConsensusResult]=useState('');
    /////////////////////////////

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState(formatDate(twentyFourHoursAgoDateTime));
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState(formatDate(nowDateTime));
    const[tail, setTail]= useState('');
    const[flight, setFlight]=useState('');
    const[text, setText]=useState('');
    const[mode, setMode]= useState('');
    const[label, setLabel]= useState('');
    const[blockId, setBlockId] = useState('');
    const[msgno, setMsgno]= useState('');
    const[dsta, setDsta]= useState('');    
    const[serialNumber, setSerialNumber] = useState('');    
    const[aircraftType, setAircraftType] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[modeS, setModeS] = useState('');
    const[company, setCompany] = useState(isCompany);
    const[refresh, setRefresh] = useState(0);


    const dispatch = useDispatch();
    
    {/*--*/}
    const onFetchAcarsWithExtData = useCallback(
        () => dispatch(actions.fetchAcarsWithExtDataCompany(offset,  limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
            tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber
            , aircraftType, typeCode, modeS, company,
        
            aggrStatus,consensusStatus,parsedText,consensusResult))//
        
        , [dispatch, offset,  limit,acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
            tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber
            , aircraftType, typeCode, modeS, company,
            
            aggrStatus,consensusStatus]//
    );    
    
    const onSetAcarsWithExtDataOffsetLimit = (offset, limit) => dispatch(actions.setAcarsWithExtDataOffsetLimitCompany(offset, limit));    
    const onSetAcarsWithExtDataPage = (page) => dispatch(actions.setAcarsWithExtDataPageCompany(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAcarsWithExtDataOffsetLimit(tableOffset, tableLimit);   
    };
    const setAcarsAircraftPAgeHandler = page => {                
        onSetAcarsWithExtDataPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
        tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber
        , aircraftType, typeCode, modeS,
    
        aggrStatus,consensusStatus
        
        ) => {  
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
        setSerialNumber(serialNumber);        
        setAircraftType(aircraftType);
        setTypeCode(typeCode);
        setModeS(modeS);

        
        ///////////////
        setAggrStatus(aggrStatus);
        setConsensusStatus(consensusStatus);
        ///////////////
    };
    
    
    const resetSearchHandler = () => {
        onSetAcarsWithExtDataOffsetLimit(0, 10);
        onSetAcarsWithExtDataPage(0);
        setAcarsMessageDateTimeMin(formatDate(twentyFourHoursAgoDateTime));
        setAcarsMessageDateTimeMax(formatDate(nowDateTime));
        setTail('');
        setFlight('');
        setText('');
        setMode('');
        setLabel('');
        setBlockId('');
        setMsgno('');
        setDsta('');        
        setSerialNumber('');        
        setAircraftType('');
        setTypeCode('');   
        setModeS('');        
        setAllOption(0);    

        
        ///////////////
        setAggrStatus('');
        setConsensusStatus('');
        ///////////////
    };    
       
    useEffect(() => { 
        
            onFetchAcarsWithExtData();
            authCheckState();

            // setTimeout(()=>{
            //     setRefresh(1);       
            // }, 3000); 
        
    }, [onFetchAcarsWithExtData, authCheckState, setCompany, refresh]); 
    
            
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
          
        {/*--*/}
        acarsWithExtDataTable =  <TableAcarsWithExtData
            data={acarsWithExtData}
            rowsPerPageDef={limit}            
            totalDataCount={acarsWithExtDataCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setAcarsAircraftPAgeHandler}   
            allOption={allOption}                     
        />;
        
    }      
    
    return (
        <div style={{marginTop:'-2px'}}>

            {/*--*/}             
            <SearchAcarsWithExtData
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />                                      
            {acarsWithExtDataTable}                       
        </div>        
    );
};

export default withErrorHandler(AcarsWithExtDataCompany, axios);