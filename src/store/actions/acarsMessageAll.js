import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';

export const setAkrxOffsetLimitAll = (offset, limit) => {
    return {
        
        type: actionTypes.SET_AKRX_OFFSET_LIMIT_ALL,
        ////////////////////////////////////
        offset: offset,
        limit: limit
    }
};

export const setAkrxPageAll = (page) => {
    return {
        type: actionTypes.SET_AKRX_PAGE_ALL,
        page: page
    }
};
                //2.(DISPATCHED ACTION)
export const fetchAkrxSuccessAll = (acarsMessages, acarsMessagesCount) => {
    return {
        type: actionTypes.FETCH_AKRX_SUCCESS_ALL,
        ///////////////////////////////
        acarsMessages: acarsMessages,
        acarsMessagesCount: acarsMessagesCount
    }
};

export const fetchAkrxFailAll = (error) => {
    return {
        type: actionTypes.FETCH_AKRX_FAIL_ALL,
        error: error
    }
};

export const fetchAkrxStartAll = () => {
    return {
        type: actionTypes.FETCH_AKRX_START_ALL
    }
};


export const fetchAkrxAll = (offset, limit, timestampMin, timestampMax,
    stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
    flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
    isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type,

    ////////
    aggrStatus,consensusStatus,     aggrText,consensusResult
    ////////

    ) => {

        //vracamo funkciju umesto actionObject
    return dispatch => {
        
        dispatch(fetchAkrxStartAll());

        //console.log("FETCH2") 

        // Converting Local in UTC
        var acarsMINUtc="";
        if(acarsMessageDateTimeMin!=''){
            var acarsMINUtc = new Date(acarsMessageDateTimeMin).toUTCString();
            //console.log("Datum="+ acarsMINUtc);
        }
        var acarsMAXUtc="";
        if(acarsMessageDateTimeMax!=''){
            var acarsMAXUtc = new Date(acarsMessageDateTimeMax).toUTCString();
            //console.log("Datum="+ acarsMAXUtc);
        }                
                  
        const query = new URLSearchParams();                        
        query.append('timestampMin', timestampMin);
        query.append('timestampMax', timestampMax);
        query.append('stationId', stationId);
        
        query.append('channel', channel);//

        query.append('freqMin', freqMin);
        query.append('freqMax', freqMax);
        query.append('levelMin', levelMin);
        query.append('levelMax', levelMax);
        query.append('errorMin', errorMin);
        query.append('errorMax', errorMax);
        query.append('mode', mode);
        query.append('label', label);
        query.append('blockId', blockId);
        query.append('ack', ack);
        query.append('tail', tail);
        query.append('flight', flight);
        query.append('msgno', msgno);
        query.append('text', text);
        query.append('end', end);
        query.append('acarsMessageDateTimeMin', acarsMessageDateTimeMin);
        query.append('acarsMessageDateTimeMax', acarsMessageDateTimeMax);        
        query.append('altMin', altMin);
        query.append('altMax', altMax);
        query.append('dsta', dsta);
        query.append('icao', icao);
        query.append('isOnground', isOnground);
        query.append('isResponse',isResponse);
        query.append('latMin', latMin);
        query.append('latMax', latMax);
        query.append('lonMin',lonMin);
        query.append('lonMax', lonMax);        
        query.append('toAddr', toAddr);
        query.append('type',type);        

        
        query.append('offset', offset);
        query.append('limit', limit);     

        /////////////////
        query.append('aggregationStatus',aggrStatus);
        query.append('consensusStatus',consensusStatus);//

        
        query.append('aggregatedText',aggrText);
        query.append('consensusResult',consensusResult);
        /////////////////
   

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/AcarsMessage/allUsers?`+ queryString)
            .then(response => { 

                                //1.(DISPATCHED ACTION)
                dispatch(fetchAkrxSuccessAll(response.data['acarsMessages'], response.data['acarsMessagesCount']))                 
            
            })
            .catch(error => {
                dispatch(fetchAkrxFailAll(error));                                
            }    
        );        
    }
};



