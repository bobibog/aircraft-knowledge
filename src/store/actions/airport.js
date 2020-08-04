import * as actionTypes from './actionTypes';
import axios from '../../axios-local';

export const setAirportsOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRPORTS_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAirportsPage = (page) => {
    return {
        type: actionTypes.SET_AIRPORTS_PAGE,
        page: page
    }
};

export const fetchAirportsSuccess = (airports, airportsCount) => {
    return {
        type: actionTypes.FETCH_AIRPORTS_SUCCESS,
        airports: airports,
        airportsCount: airportsCount
    }
};

export const fetchAirportsFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRPORTS_FAIL,
        error: error
    }
};

export const fetchAirportsStart = () => {
    return {
        type: actionTypes.FETCH_AIRPORTS_START
    }
};

export const fetchAirports = (offset, limit, airportId) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        // eslint-disable-next-line no-useless-concat
        //let queryString = '?' + 'offset=' + offset + '&' + 'limit=' + limit;
        let queryString = limit !== "-1" 
            // eslint-disable-next-line no-useless-concat
            ? ('?' + 'offset=' + offset + '&' + 'limit=' + limit)
            : '';
        
        if (!airportId) {
            axios.get('/airport' + queryString)
                .then(response => {
                    dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
                })
                .catch(error => {
                    dispatch(fetchAirportsFail(error));                
                });
        } else {
            axios.get(`/airport/${airportId}`)
                .then(response => {
                    const airportsArray = [];
                    if (response.data) {
                        airportsArray.push(response.data);
                    }
                    const airportsArrayCount =  airportsArray.length
                    // dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))
                    dispatch(fetchAirportsSuccess(airportsArray, airportsArrayCount))                 
                })
                .catch(error => {
                    dispatch(fetchAirportsFail(error));                
                });            
        }
    }
};

export const unmountAirports = () => {
    return {
        type: actionTypes.UNMOUNT_AIRPORTS
    }
};