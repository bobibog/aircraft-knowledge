import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import axios2 from '../../axios-local2';
import {generatePath} from 'react-router';


export const setAirlinesOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRLINES_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAirlinesPage = (page) => {
    return {
        type: actionTypes.SET_AIRLINES_PAGE,
        page: page
    }
};

export const fetchAirlinesSuccess = (airlines, airlinesCount) => {
    return {
        type: actionTypes.FETCH_AIRLINES_SUCCESS,
        airlines: airlines,
        airlinesCount: airlinesCount
    }
};

export const fetchAirlinesFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRLINES_FAIL,
        error: error
    }
};

export const fetchAirlinesStart = () => {
    return {
        type: actionTypes.FETCH_AIRLINES_START
    }
};


export const fetchAirlines = (offset, limit, airlineName, iata, icao, fleetMin, fleetMax) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();                        
        query.append('airlineName', airlineName);
        query.append('iata', iata);
        query.append('icao', icao);
        query.append('fleetMin', fleetMin);
        query.append('fleetMax', fleetMax); 
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/airline?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByNameDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/airlineNameDesc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByNameAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/airlineNameAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByIataDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/iataDsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByIataAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/iataAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByIcaoDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/icaoDsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByIcaoAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/icaoAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};

export const orderAirlinesByFleetDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/fleetDsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            });        
    }
};

export const orderAirlinesByFleetAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        const query = new URLSearchParams();        
        query.append('offset', offset);
        query.append('limit', limit);              

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
            axios2.get(`/fleetAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};