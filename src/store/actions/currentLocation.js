import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';


export const fetchCurrentLocationSuccess = (currentLocations) => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_SUCCESS,
        currentLocations: currentLocations,        
    }
};

export const fetchCurrentLocationFail = (error) => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_FAIL,
        error: error
    }
};

export const fetchCurrentLocationStart = () => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_START
    }
};

export const fetchCurrentLocations = (lat1, lat2, lon1, lon2) => {
    return dispatch => {
        dispatch(fetchCurrentLocationStart());        
          
        const query = new URLSearchParams(); 
            query.append('lat1', lat1);
            query.append('lat2', lat2);           
            query.append('lon1', lon1);
            query.append('lon2', lon2);  
                                 
        let queryString = query;
         
            axios.get(`/CurrentLocation?`+queryString)
                .then(response => {                
                    dispatch(fetchCurrentLocationSuccess(response.data['currentLocations']))                 
                })
                .catch(error => {
                    dispatch(fetchCurrentLocationFail(error));                                
                })
                       
        
    }
};

