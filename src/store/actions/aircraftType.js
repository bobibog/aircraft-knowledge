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


//Must add token here, because /AircraftTypeFull/GetAircraftTypesFullAll API endpoint is now Authorized
//(user must be logged in - have a valid token) !!!
export const fetchAircraftTypes = (aircraftType, token) => {
    return dispatch => {
        dispatch(fetchAircraftTypeStart());        
          
        const query = new URLSearchParams();                        
        query.append('aircraftType', aircraftType);
          

        let queryString = query;   
        
        const config ={
            headers: {'Authorization': `Bearer ${token}`}
        }
            
        axios.get(`/AircraftTypeFull/GetAircraftTypesFullAll?`+queryString, config)
            .then(response => {                
                dispatch(fetchAircraftTypeSuccess(response.data['aircraftTypes']))                 
            })
            .catch(error => {
                dispatch(fetchAircraftTypeFail(error));                                
            }    
        );        
    }
};

