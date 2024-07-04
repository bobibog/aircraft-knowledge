import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';

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
                                //akciji se prosledjuju podaci koje cemo wrapovati u objekat i kojim zelimo da azuriramo state i ne moraju svi da se proslede iz state
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
    flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
    isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, company,
    
    ////////
    aggrStatus,consensusStatus
    ////////

    ) => {
    
    // => ({}) == => {return {}}

            //vracamo thunk funkciju umesto obicnog objekta a onda ce je redux thunk middleware dobiti pre redux reducera
            //kada dodje do middleware onda on zove thunk funkciju koja sadrzi asinhrone pozive a u njoj mozemo nakon njihovog izvrsenja da zovemo obicne redux akcije 

           //moze i sa parametrom getState odnosno (dispatch, getState)
  
        
    return dispatch => {
        dispatch(fetchAkrxStart());       
        
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
        query.append('company',company);
        query.append('offset', offset);
        query.append('limit', limit);
        
        /////////////////
        query.append('',aggrStatus);
        query.append('',consensusStatus);
        /////////////////

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/AcarsMessage?`+ queryString)
            .then(response => { 
                        //sada dispatchujemo obicne akcije da wrapujemo rezultat async poziva u objekat za azuriranje state koji ide u reducere odnosno konkretnog reducera                    
                dispatch(fetchAkrxSuccess(response.data['acarsMessages'], response.data['acarsMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAkrxFail(error));                                
            }    
        );        
    }
};



