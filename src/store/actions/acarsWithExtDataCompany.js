import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';

/*
function removeEmptyParams(queryString) {
    const params = new URLSearchParams(queryString);
    
    let keys = [...params.keys()];

    keys.forEach(key => {
        if (!params.get(key))
            params.delete(key);//ako nema vrednosti u query odnosno ako je vrednost ''
    });

    return params.toString();
}
*/

//poseban state(offset i limit) azurira u odnosu na setAkrxOffsetLimit iz acarsMessage
export const setAcarsWithExtDataOffsetLimitCompany = (offset, limit) => {
    return {
        type: actionTypes.SET_ACARSWITHEXTDATA_OFFSET_LIMIT_COMPANY,//
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

export const fetchAcarsWithExtDataSuccessCompany = (acarsPerAircraftMessages, acarsPerAircraftMessagesCount) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_SUCCESS_COMPANY,
        acarsPerAircraftMessages: acarsPerAircraftMessages,
        acarsPerAircraftMessagesCount: acarsPerAircraftMessagesCount
    }
};

export const fetchAcarsWithExtDataFailCompany = (error) => {
    return {
        type: actionTypes.FETCH_ACARSWITHEXTDATA_FAIL_COMPANY,
        error: error
    }
};

                                               //      //
export const fetchAcarsWithExtDataCompany = (offset,  limit     ,acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
    tail, flight, text, mode, label, blockId, msgno, dsta, serialNumber
    , aircraftType, typeCode, modeS, company,
    
    ////////
    aggrStatus,consensusStatus,parsedText,consensusResult
    ////////

    ) => {
    return dispatch => {
        dispatch(fetchAcarsWithExtDataStartCompany());                      
                  
        const query = new URLSearchParams();         
        
        
        query.append('offset', offset);//
        query.append('limit', limit);// 


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
        query.append('serialNumber', serialNumber);        
        query.append('aircraftType', aircraftType);
        query.append('typeCode', typeCode);   
        query.append('modeS', modeS);       
        
        
        //query.append('company', company);//

        
        //Error: response status is 500 https://api-dev.aviolog.com/api/v1/AcarsMessage/acarsWithExtDataCompany

        query.append('parsedText',parsedText);
        query.append('consensusResult',consensusResult);

        ///////////
        query.append('aggregationStatus',aggrStatus);
        query.append('consensusStatus',consensusStatus);
        ///////////

        //deo 1) 
        let queryString = limit !== "-1"            
        ? query
        : '';

        /*
        //deo 2) 
        let queryString = limit !== "-1"            
        ? query
        : '';
        */

        //deo 3)
        //////////////////////////////////////////////
        /*
        let queryString = limit === "-1"
            ? ''
            : removeEmptyParams(query.toString()).toString()
        */
        //////////////////////////////////////////////

        

        let url = '/AcarsMessage/acarsWithExtDataCompany?'
        
        axios.get(url+ queryString)
            .then(response => {                
                dispatch(fetchAcarsWithExtDataSuccessCompany(response.data['acarsPerAircraftMessages'], response.data['acarsPerAircraftMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAcarsWithExtDataFailCompany(error));                                
            }    
        );        
    }
};

