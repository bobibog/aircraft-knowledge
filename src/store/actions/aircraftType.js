import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';



export const fetchAircraftTypeSuccess = (aircraftTypes) => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_SUCCESS,
        aircraftTypes: aircraftTypes,        
    }
};

export const fetchAircraftTypeFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_FAIL,
        error: error
    }
};

export const fetchAircraftTypeStart = () => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_START
    }
};



export const fetchAircraftTypes = () => {
    return dispatch => {
        dispatch(fetchAircraftTypeStart());        
          
        const query = new URLSearchParams();                        
        //query.append('aircraftType', aircraftType);
          

        let queryString = query;            
            
        axios.get(`/AircraftTypeFull/GetAircraftTypesFullAll?`+queryString)
            .then(response => {                
                dispatch(fetchAircraftTypeSuccess(response.data['aircraftTypes']))                 
            })
            .catch(error => {
                dispatch(fetchAircraftTypeFail(error));                                
            }    
        );        
    }
};

