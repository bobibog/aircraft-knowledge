import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';
import {AuthContext} from '../../context/auth-context';
import {UserContext} from '../../context/user-context';
import TableAKRx from '../../components/UI/Table/ReactTable/TableAKRx/TableAKRx';

const AkrxAll = props => {
    // const authContext = useContext(AuthContext);
    // const authCheckState = authContext.authenticationCheckState;    
    // let isCompany = authContext.user.company;
    
    const acarsMessages = useSelector(state => {
        return state.acarsMessageAll.acarsMessages;
    });

    
    const acarsMessagesCount = useSelector(state => {
        return state.acarsMessageAll.acarsMessagesCount;
    });
    const loading = useSelector(state => {
        return state.acarsMessageAll.acarsMessagesLoading;
    });
    const offset = useSelector(state => {
        return state.acarsMessageAll.acarsMessagesOffset;
    });
    const limit = useSelector(state => {
        return state.acarsMessageAll.acarsMessagesLimit;
    });
    const page = useSelector(state => {
        return state.acarsMessageAll.acarsMessagesPage;
    });   
           
    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[stationId, setStationId] = useState('');
    const[channel, setChannel] = useState('');
    const[freqMin, setFreqMin] = useState('');
    const[freqMax, setFreqMax] = useState('');
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[errorMin, setErrorMin] = useState('');
    const[errorMax, setErrorMax] = useState('');
    const[mode, setMode] = useState('');
    const[label, setLabel] = useState('');
    const[blockId, setBlockId] = useState('');
    const[ack, setAck] = useState('');
    const[tail, setTail] = useState('');
    const[flight, setFlight] = useState('');
    const[msgno, setMsgno] = useState('');
    const[text, setText] = useState('');
    const[end, setEnd] = useState('');
    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');    
    const[altMin, setAltMin]=useState('');
    const[altMax, setAltMax]=useState('');
    const[dsta, setDsta]=useState('');
    const[icao, setIcao]=useState('');
    const[isOnground, setIsOnground]=useState('');
    const[isResponse, setIsResponse]=useState('');
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');    
    const[toAddr, setToAddr]=useState('');
    const[type, setType]=useState('');  
    
    //console.log(`Dev: ${process.env.REACT_APP_URL_API_DEV}. Prod: ${process.env.REACT_APP_URL_API_PROD}.`);

    
    const dispatch = useDispatch();
    
    const onFetchAkrx = useCallback(
        () => dispatch(actions.fetchAkrxAll(offset, limit, timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type))
        , [dispatch, offset, limit, timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type]
    );    
    
    const onSetAkrxOffsetLimit = (offset, limit) => dispatch(actions.setAkrxOffsetLimitAll(offset, limit));    
    const onSetAkrxPage = (page) => dispatch(actions.setAkrxPageAll(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAkrxOffsetLimit(tableOffset, tableLimit);   
    };
    const setAkrxPageHandler = page => {                
        onSetAkrxPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (timestampMin, timestampMax,
        stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
        flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
        isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type) => {  
        onSetAkrxOffsetLimit(0, limit);
        onSetAkrxPage(0);
        setTimestampMin(timestampMin);
        setTimestampMax(timestampMax);
        setStationId(stationId);
        setChannel(channel);
        setFreqMin(freqMin);
        setFreqMax(freqMax);
        setLevelMin(levelMin);
        setLevelMax(levelMax);
        setErrorMin(errorMin);
        setErrorMax(errorMax);
        setMode(mode);
        setLabel(label);
        setBlockId(blockId);
        setAck(ack);
        setTail(tail);
        setFlight(flight);
        setMsgno(msgno);
        setText(text);
        setEnd(end);
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin);
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax);       
        setAltMin(altMin);
        setAltMax(altMax);
        setDsta(dsta);
        setIcao(icao);
        setIsOnground(isOnground);
        setIsResponse(isResponse);
        setLatMin(latMin);
        setLatMax(latMax);
        setLonMin(lonMin);
        setLonMax(lonMax);        
        setToAddr(toAddr);
        setType(type);        
    };
    
    
    const resetSearchHandler = () => {
        onSetAkrxOffsetLimit(0, 10);
        onSetAkrxPage(0);
        setTimestampMin("");
        setTimestampMax("");
        setStationId("");
        setChannel("");
        setFreqMin("");
        setFreqMax("");
        setLevelMin("");
        setLevelMax("");
        setErrorMin("");
        setErrorMax("");
        setMode("");
        setLabel("");
        setBlockId("");
        setAck("");
        setTail("");
        setFlight("");
        setMsgno("");
        setText("");
        setEnd("");
        setAcarsMessageDateTimeMin("");
        setAcarsMessageDateTimeMax("");       
        setAltMin("");
        setAltMax("");
        setDsta("");
        setIcao("");
        setIsOnground("");
        setIsResponse("");
        setLatMin("");
        setLatMax("");
        setLonMin("");
        setLonMax("");        
        setToAddr("");
        setType("");    
        setAllOption(0);    
    };    
       
    useEffect(() => { 
        onFetchAkrx();                 
    }, [onFetchAkrx]); 
    
        
    const akrxPageHeader =
        <CardsInBox
            // headerText="ACARS Messages"
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
      
    let akrxTable = <Spinner />;
    if (!acarsMessages && !loading  ) {
        akrxTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read AKRX messages from the server!</p>;
    }
    
    if (acarsMessages && !loading ) {
        // akrxTable = <TableAKRx 
        //     data={acarsMessages}
        //     header={akrxHeader}            
        //     rowsPerPageDef={limit}
        //     changeOffsetOrLimit={changeOffsetOrLimitHandler}
        //     totalDataCount={acarsMessagesCount}
        //     setPageStore={setAkrxPageHandler}
        //     currPage={page}                      
        // /> ;  

        akrxTable =  <TableAKRx
            data={acarsMessages}
            rowsPerPageDef={limit}            
            totalDataCount={acarsMessagesCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setAkrxPageHandler}   
            allOption={allOption}                     
        />;
        
    }      
    
    return (
        <div style={{marginTop:'-2px'}}>                       
            {akrxPageHeader}             
            <SearchAKRxElement
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />                                     
            {akrxTable}                       
        </div>        
    );
};

export default withErrorHandler(AkrxAll, axios);