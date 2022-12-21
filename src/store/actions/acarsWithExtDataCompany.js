import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';


export const setAcarsWithExtDataOffsetLimitCompany = (offset, limit) => {
    return {
        type: actionTypes.SET_ACARSWITHEXTDATA_OFFSET_LIMIT_COMPANY,
        offset: offset,
        limit: limit
    }
};

export const setAcarsWithExtDataPageCompany = (page) => {
    return {
        type: actionTypes.SET_ACARSWITHEXTDATA_PAGE_COMPANY,
        page: page
    }
};

export const fetchAcarsWithExtDataStartCompany = () => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_START_COMPANY
    }
};

export const fetchAcarsWithExtDataSuccessCompany = (acarsWithExtData, acarsWithExtDataCount) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_SUCCESS_COMPANY,
        acarsWithExtData: acarsWithExtData,
        acarsWithExtDataCount: acarsWithExtDataCount
    }
};

export const fetchAcarsWithExtDataFailCompany = (error) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_FAIL_COMPANY,
        error: error
    }
};




export const fetchAcarsWithExtDataCompany = (offset, limit, acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
    tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
    serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode, aggregatedText, company                            
    ) => {
    return dispatch => {
        dispatch(fetchAcarsWithExtDataStartCompany());                      
                  
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
        query.append('operatorName', operatorName);
        query.append('operatorIata', operatorIata);
        query.append('operatorIcao', operatorIcao);
        query.append('operatorIcao', operatorIcao);
        query.append('serialNumber', serialNumber);        
        query.append('aircraftType', aircraftType);
        query.append('typeCode', typeCode);
        query.append('aggregatedText', aggregatedText);
        query.append('company', company);

        let queryString = limit !== "-1"            
            ? query
            : '';
            
        let url = '/AcarsMessage/acarsWithExtDataCompany?'
            
        axios.get(url+ queryString)
            .then(response => {                
                dispatch(fetchAcarsWithExtDataSuccessCompany(response.data['acarsWithExtData'], response.data['acarsWithExtDataCount']))                 
            })
            .catch(error => {
                dispatch(fetchAcarsWithExtDataFailCompany(error));                                
            }    
        );        
    }
};

