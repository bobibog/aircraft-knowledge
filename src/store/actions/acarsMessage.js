import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import {generatePath} from 'react-router';


export const setAkrxOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AKRX_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAkrxPage = (page) => {
    return {
        type: actionTypes.SET_AKRX_PAGE,
        page: page
    }
};

export const fetchAkrxSuccess = (acarsMessages, acarsMessagesCount) => {
    return {
        type: actionTypes.FETCH_AKRX_SUCCESS,
        acarsMessages: acarsMessages,
        acarsMessagesCount: acarsMessagesCount
    }
};

export const fetchAkrxFail = (error) => {
    return {
        type: actionTypes.FETCH_AKRX_FAIL,
        error: error
    }
};

export const fetchAkrxStart = () => {
    return {
        type: actionTypes.FETCH_AKRX_START
    }
};


export const fetchAkrx = (offset, limit, timestampMin, timestampMax,
    stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
    flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax) => {
    return dispatch => {
        dispatch(fetchAkrxStart());        
          
        const query = new URLSearchParams();                        
        query.append('timestampMin', timestampMin);
        query.append('timestampMax', timestampMax);
        query.append('stationId', stationId);
        query.append('channel', channel);
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
        query.append('offset', offset);
        query.append('limit', limit);     

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/AcarsMessage?`+ queryString)
            .then(response => {                
                dispatch(fetchAkrxSuccess(response.data['acarsMessages'], response.data['acarsMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAkrxFail(error));                                
            }    
        );        
    }
};

