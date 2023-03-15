import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import axios2 from 'axios';


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

export const fetchStatesSuccess = (states) => {
    return {
        type: actionTypes.FETCH_STATES_SUCCESS,
        states: states,        
    }
};

export const fetchStatesFail = (error) => {
    return {
        type: actionTypes.FETCH_STATES_FAIL,
        error: error
    }
};

export const fetchStatesStart = () => {
    return {
        type: actionTypes.FETCH_STATES_START
    }
};

export const fetchOpenSkysStart = () => {
    return {
        type: actionTypes.FETCH_OPENSKYS_START
    }
};

export const fetchOpenSkysFail = (error) => {
    return {
        type: actionTypes.FETCH_OPENSKYS_FAIL,
        error: error
    }
};

export const fetchOpenSkysSuccess = (openSkys) => {
    return {
        type: actionTypes.FETCH_OPENSKYS_SUCCESS,
        openSkys: openSkys,        
    }
};

// Data fetched by our transponder
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
                    //console.log("STANJE= "+ response.data)       
                })
                .catch(error => {
                    dispatch(fetchCurrentLocationFail(error));                                
                })
                       
        
    }
};

// OpenSky API - directly
export const fetchCurrentLocations2 = (lamin, lomin, lamax, lomax) => {
    return dispatch => {
        dispatch(fetchStatesStart());        
          
        const query = new URLSearchParams(); 
            query.append('lamin', lamin);
            query.append('lomin', lomin);
            query.append('lamax', lamax);            
            query.append('lomax', lomax);  
                                 
        let queryString = query;

        let url = 'https://opensky-network.org/api/states/all?';
         
            axios2.get(url+queryString)
                .then(response => {                
                    dispatch(fetchStatesSuccess(response.data['states']))
                    //console.log("STANJE= "+response.data['states'])                 
                })
                .catch(error => {
                    dispatch(fetchStatesFail(error));                                
                })                      
        
    }
};

// OpenSky data  -  Our API
export const fetchOpenSkyCurrentLocations = (lat1, lat2, lon1, lon2, alt1, alt2) => {
    return dispatch => {
        dispatch(fetchOpenSkysStart());        
          
        const query = new URLSearchParams(); 
            query.append('latitude1', lat2);
            query.append('latitude2', lat1);           
            query.append('longitude1', lon2);
            query.append('longitude2', lon1);  
            query.append('baro_altitude1', alt1);  
            query.append('baro_altitude2', alt2);  
                                 
        let queryString = query;
         
            axios.get(`/OpenSkyFlightsCurrentLocation?`+queryString)
                .then(response => {                
                    dispatch(fetchOpenSkysSuccess(response.data['openSkys']))                 
                })
                .catch(error => {
                    dispatch(fetchOpenSkysFail(error));                                
                })
                       
        
    }
};