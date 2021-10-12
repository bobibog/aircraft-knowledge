import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
//import axios2 from '../../axios-local2';
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


export const fetchAirlines = (offset, limit, airlineName, iata, icao, fleetMin, fleetMax, airlineNameDesc, airlineNameAsc, iataDesc, iataAsc, icaoDesc, icaoAsc, fleetDesc, fleetAsc) => {
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
        query.append('airlineNameDesc', airlineNameDesc);  
        query.append('airlineNameAsc', airlineNameAsc);
        query.append('iataDesc', iataDesc); 
        query.append('iataAsc', iataAsc);
        query.append('icaoDesc', icaoDesc);
        query.append('icaoAsc', icaoAsc);
        query.append('fleetDesc', fleetDesc);
        query.append('fleetAsc', fleetAsc);          

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
            
            axios.get(`/airlineNameDesc?`+ queryString)
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
            
            axios.get(`/airlineNameAsc?`+ queryString)
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
            
            axios.get(`/iataDsc?`+ queryString)
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
            
            axios.get(`/iataAsc?`+ queryString)
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
            
            axios.get(`/icaoDsc?`+ queryString)
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
            
            axios.get(`/icaoAsc?`+ queryString)
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
            
            axios.get(`/fleetDsc?`+ queryString)
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
            
            axios.get(`/fleetAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));                                
            }    
        );        
    }
};