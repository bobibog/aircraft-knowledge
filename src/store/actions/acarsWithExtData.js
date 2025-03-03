import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';


export const setAcarsWithExtDataOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_ACARSWITHEXTDATA_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAcarsWithExtDataPage = (page) => {
    return {
        type: actionTypes.SET_ACARSWITHEXTDATA_PAGE,
        page: page
    }
};

export const fetchAcarsWithExtDataStart = () => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_START
    }
};

export const fetchAcarsWithExtDataSuccess = (acarsWithExtData, acarsWithExtDataCount) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_SUCCESS,
        acarsWithExtData: acarsWithExtData,
        acarsWithExtDataCount: acarsWithExtDataCount
    }
};

export const fetchAcarsWithExtDataFail = (error) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_FAIL,
        error: error
    }
};




export const fetchAcarsWithExtData = (offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
    tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
    serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode,     
    
    ////////
    aggrStatus,consensusStatus,     aggrText,consensusResult                             
    ////////

    ) => {
    return dispatch => {
        dispatch(fetchAcarsWithExtDataStart());                      
                  
        const query = new URLSearchParams();         
        
        query.append('offset', offset);
        query.append('limit', limit); 
        
        query.append('acarsMessageDateTimeMin', acarsMessageDateTimeMin);
        query.append('acarsMessageDateTimeMax', acarsMessageDateTimeMax);        
        query.append('tail', tail);
        query.append('flight', flight);
        query.append('text', text);
        query.append('mode', mode);
        query.append('label', label);
        query.append('blockId', blockId);
        query.append('msgno', msgno);
        query.append('dsta', dsta);
        query.append('airlineName', airlineName);
        query.append('airlineIata', airlineIata);
        query.append('airlineIcao', airlineIcao);
        query.append('operatorName', operatorName != null ? operatorName : '');
        query.append('operatorIata', operatorIata != null ? operatorIata : '');
        query.append('operatorIcao', operatorIcao != null ? operatorIcao : '');  
        query.append('serialNumber', serialNumber);        
        query.append('aircraftType', aircraftType != null ? aircraftType : '');
        query.append('typeCode', typeCode != null ? typeCode : '');
        
        //query.append('aggregatedText', aggregatedText != null ? aggregatedText : '');//nije deo zadatka

        /////////////////
        query.append('aggregationStatus',aggrStatus);
        query.append('consensusStatus',consensusStatus);

        
        query.append('aggregatedText',aggrText);
        query.append('consensusResult',consensusResult);
        /////////////////
   


        let queryString = limit !== "-1"            
            ? query
            : '';
            
        let url = '/AcarsMessage/acarsWithExtData?'
            
        axios.get(url + queryString)
            .then(response => {                
                dispatch(fetchAcarsWithExtDataSuccess(response.data['acarsPerAircraftMessages'], response.data['acarsPerAircraftMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAcarsWithExtDataFail(error));                                
            }    
        );        
    }
};

