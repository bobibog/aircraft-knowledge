import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';



export const fetchTypeCodeSuccess = (typeCodes) => {
    return {
        type: actionTypes.FETCH_TYPECODE_SUCCESS,
        typeCodes: typeCodes,        
    }
};

export const fetchTypeCodeFail = (error) => {
    return {
        type: actionTypes.FETCH_TYPECODE_FAIL,
        error: error
    }
};

export const fetchTypeCodeStart = () => {
    return {
        type: actionTypes.FETCH_TYPECODE_START
    }
};



export const fetchTypeCodes = (typeCode) => {
    return dispatch => {
        dispatch(fetchTypeCodeStart());        
          
        const query = new URLSearchParams();                        
        query.append('typeCode', typeCode);
          

        let queryString = query;            
            
        axios.get(`/AircraftTypeCode/GetAircraftTypeCodesAll?`+queryString)
            .then(response => {                
                dispatch(fetchTypeCodeSuccess(response.data['typeCodes']))                 
            })
            .catch(error => {
                dispatch(fetchTypeCodeFail(error));                                
            }    
        );        
    }
};

