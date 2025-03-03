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
import Clock from '../../components/Clock/Clock';

const AcarsWithExtData = props => {
    const acarsWithExtData = useSelector(state => {
        return state.acarsWithExtData.acarsWithExtData;
    }); 
    
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

    const [nowDateTime, setNowDateTime] = useState(new Date());
    const [twentyFourHoursAgoDateTime, setTwentyFourHoursAgoDateTime] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000));

    // useEffect(() => {
    //     // Update the state variables with the current and 24 hours before date and time
    //     const interval = setInterval(() => {
    //       setNowDateTime(new Date());
    //       setTwentyFourHoursAgoDateTime(new Date(Date.now() - 2 * 60 * 60 * 1000));
    //     }, 1000); // Update every second
    
    //     // Clean up interval on component unmount
    //     return () => clearInterval(interval);
    //   }, []);

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
       
    // const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState(formatDate(twentyFourHoursAgoDateTime));
    // const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState(formatDate(nowDateTime));
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
    const[airlineName, setAirlineName]= useState('');
    const[airlineIata, setAirlineIATA] = useState('');
    const[airlineIcao, setAirlineICAO] = useState('');
    const[operatorName, setOperatorName] = useState('');
    const[operatorIata, setOperatorIata] = useState('');
    const[operatorIcao, setOperatorIcao] = useState('');
    const[serialNumber, setSerialNumber] = useState('');    
    const[aircraftType, setAircraftType] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[aggregatedText, setAggregatedText] = useState('');

    
    /////////////////////////////
    const[aggrStatus, setAggrStatus]=useState('');
    const[consensusStatus, setConsensusStatus]=useState('');

    
    const[aggrText, setAggrText]=useState('');
    const[consensusResult, setConsensusResult]=useState('');
    /////////////////////////////

    const dispatch = useDispatch();
    
    const onFetchAcarsWithExtData = useCallback(
        () => dispatch(actions.fetchAcarsWithExtData(offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
            tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
            serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode,
        
            aggrStatus,consensusStatus,     aggrText,consensusResult
        ))
        , [dispatch, offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
            tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
            serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode 
        
            ,aggrStatus,consensusStatus,    aggrText,consensusResult
            ]
    );    
    
    const onSetAcarsWithExtDataOffsetLimit = (offset, limit) => dispatch(actions.setAcarsWithExtDataOffsetLimit(offset, limit));    
    const onSetAcarsWithExtDataPage = (page) => dispatch(actions.setAcarsWithExtDataPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAcarsWithExtDataOffsetLimit(tableOffset, tableLimit);   
    };
    const setAcarsAircraftPAgeHandler = page => {                
        onSetAcarsWithExtDataPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
        tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
        serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode,
    
        aggrStatus,consensusStatus,     aggrText,consensusResult

        ) => {  
        onSetAcarsWithExtDataOffsetLimit(0, limit);
        onSetAcarsWithExtDataPage(0);
        // setAcarsMessageDateTimeMin(acarsMessageDateTimeMin ? acarsMessageDateTimeMin : formatDate(twentyFourHoursAgoDateTime));
        // setAcarsMessageDateTimeMax(acarsMessageDateTimeMax ? acarsMessageDateTimeMax : formatDate(nowDateTime));   
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin );
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax );   
        setTail(tail);
        setFlight(flight);
        setText(text);
        setMode(mode);
        setLabel(label);
        setBlockId(blockId);
        setMsgno(msgno);
        setDsta(dsta);
        setAirlineName(airlineName);
        setAirlineIATA(airlineIata);
        setAirlineICAO(airlineIcao);
        setOperatorName(operatorName);
        setOperatorIata(operatorIata);
        setOperatorIcao(operatorIcao);
        setSerialNumber(serialNumber);        
        setAircraftType(aircraftType);
        setTypeCode(typeCode);
        //setAggregatedText(aggregatedText);

        ///////////////
        setAggrStatus(aggrStatus);
        setConsensusStatus(consensusStatus);

        
        setAggrText(aggrText)
        setConsensusResult(consensusResult)
        ///////////////
    };
    
    
    const resetSearchHandler = () => {
        onSetAcarsWithExtDataOffsetLimit(0, 10);
        onSetAcarsWithExtDataPage(0);
        // setAcarsMessageDateTimeMin(formatDate(twentyFourHoursAgoDateTime));
        // setAcarsMessageDateTimeMax(formatDate(nowDateTime));
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
        setAirlineName('');
        setAirlineIATA('');
        setAirlineICAO('');
        setOperatorName('');
        setOperatorIata('');
        setOperatorIcao('');
        setSerialNumber('');        
        setAircraftType('');
        setTypeCode('');   
        
        //setAggregatedText('');//ne filtriramo po aggregatedText   
        
        ///////////////
        setAggrStatus('');
        setConsensusStatus('');

        setAggrText('')
        setConsensusResult('')
        ///////////////

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
        acarsWithExtDataTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read Acars messages from the server!</p>;
    }
    
    if (acarsWithExtData && !loading ) {
          
        
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
    // if(acarsWithExtDataCount){
    //     console.log("ACARSWITHEXTDATA messagesCountField = "+acarsWithExtDataCount);
    //     console.log("ACARSWITHEXTDATA messages = "+acarsWithExtData)
    //     console.log("ACARSWITHEXTDATA messagesCountReal = "+acarsWithExtData.length)
    // }

    return (
        <div style={{marginTop:'-2px'}}>     

    {/*-u filter su aircraftType fetch i typeCode fetch-*/}        
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