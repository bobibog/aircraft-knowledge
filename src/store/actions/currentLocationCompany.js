import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import axios2 from 'axios';


export const fetchCurrentLocationSuccessCompany = (currentLocations) => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_SUCCESS_COMPANY,
        currentLocations: currentLocations,        
    }
};

export const fetchCurrentLocationFailCompany = (error) => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_FAIL_COMPANY,
        error: error
    }
};

export const fetchCurrentLocationStartCompany = () => {
    return {
        type: actionTypes.FETCH_CURRENTLOCATION_START_COMPANY
    }
};


// Data fetched by our transponder for defined company
export const fetchCurrentLocationsCompany = (lat1, lat2, lon1, lon2, company) => {
    return dispatch => {
        dispatch(fetchCurrentLocationStartCompany());        
          
        const query = new URLSearchParams(); 
            query.append('lat1', lat1);
            query.append('lat2', lat2);           
            query.append('lon1', lon1);
            query.append('lon2', lon2); 
            query.append('company', company); 
                                 
        let queryString = query;
         
            // axios.get(`/CurrentLocation?`+queryString)
            axios.get(`/CurrentLocation/GetCurrentLocation2?`+queryString)
                .then(response => {                
                    dispatch(fetchCurrentLocationSuccessCompany(response.data['currentLocations']))                 
                })
                .catch(error => {
                    dispatch(fetchCurrentLocationFailCompany(error));                                
                })
                       
        
    }
};

