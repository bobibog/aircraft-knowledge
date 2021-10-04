import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';

//import TableAKRx from '../../components/UI/Table/TableAKRx';
//import TableAKRx from '../../components/UI/Table/ReactTable/TableAKRx/TableAKRxCustomSide';
import TableAKRx from '../../components/UI/Table/ReactTable/TableAKRx/TableAKRx';

const Akrx = props => {
    const acarsMessages = useSelector(state => {
        return state.acarsMessage.acarsMessages;
    });

    //console.log(acarsMessages);

    const acarsMessagesCount = useSelector(state => {
        return state.acarsMessage.acarsMessagesCount;
    });
    const loading = useSelector(state => {
        return state.acarsMessage.acarsMessagesLoading;
    });
    const offset = useSelector(state => {
        return state.acarsMessage.acarsMessagesOffset;
    });
    const limit = useSelector(state => {
        return state.acarsMessage.acarsMessagesLimit;
    });
    const page = useSelector(state => {
        return state.acarsMessage.acarsMessagesPage;
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
    const[attachments, setAttachments] = useState('');
    const[etag, setEtag] = useState('');
    const[rid, setRid]= useState('');
    const[self, setSelf]= useState('');
    const[tsMin, setTsMin]=useState('');
    const[tsMax, setTsMax]=useState('');
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
    const[partitionKey, setPartitionKey]=useState('');
    const[toAddr, setToAddr]=useState('');
    const[type, setType]=useState('');

    const dispatch = useDispatch();
    
    const onFetchAkrx = useCallback(
        () => dispatch(actions.fetchAkrx(offset, limit, timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, attachments,
            etag, rid, self, tsMin, tsMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, partitionKey,
            toAddr, type))
        , [dispatch, offset, limit, timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, attachments,
            etag, rid, self, tsMin, tsMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, partitionKey,
            toAddr, type]
    );    
    
    const onSetAkrxOffsetLimit = (offset, limit) => dispatch(actions.setAkrxOffsetLimit(offset, limit));    
    const onSetAkrxPage = (page) => dispatch(actions.setAkrxPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAkrxOffsetLimit(tableOffset, tableLimit);   
    };
    const setAkrxPageHandler = page => {                
        onSetAkrxPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (timestampMin, timestampMax,
        stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
        flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax,attachments,
        etag, rid, self, tsMin, tsMax, altMin, altMax, dsta, icao,
        isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, partitionKey,
        toAddr, type) => {  
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
        setAttachments(attachments);
        setEtag(etag);
        setRid(rid);
        setSelf(self);
        setTsMin(tsMin);
        setTsMax(tsMax);
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
        setPartitionKey(partitionKey);
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
        setAttachments("");
        setEtag("");
        setRid("");
        setSelf("");
        setTsMin("");
        setTsMax("");
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
        setPartitionKey("");
        setToAddr("");
        setType("");    
        setAllOption(0);    
    };    
       
    useEffect(() => { 
        onFetchAkrx();
    }, [onFetchAkrx]); 
    
        
    const akrxPageHeader =
        <CardsInBox
            headerText="AKRx Messages"
            backColor="#F0F8FF" 
            
        />; 
        
    const[allOption, setAllOption]=useState(0);

    function allChanger(allOption){
        if(allOption==0){
            setAllOption(1);
        return allOption; 
        }
               
    };

      
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
        <React.Fragment>                       
            {akrxPageHeader}             
            <SearchAKRxElement
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />                                     
            {akrxTable}                       
        </React.Fragment>        
    );
};

export default withErrorHandler(Akrx, axios);