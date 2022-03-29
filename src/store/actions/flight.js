import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';

export const setFlightsOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_FLIGHTS_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setFlightsPage = (page) => {
    return {
        type: actionTypes.SET_FLIGHTS_PAGE,
        page: page
    }
};

export const fetchFlightsSuccess = (flights, flightsCount) => {
    return {
        type: actionTypes.FETCH_FLIGHTS_SUCCESS,
        flights: flights,
        flightsCount: flightsCount
    }
};

export const fetchFlightsFail = (error) => {
    return {
        type: actionTypes.FETCH_FLIGHTS_FAIL,
        error: error
    }
};

export const fetchFlightsStart = () => {
    return {
        type: actionTypes.FETCH_FLIGHTS_START
    }
};

export const fetchFlights = (offset, limit, aircraftId) => {
    return dispatch => {
        dispatch(fetchFlightsStart());
        // eslint-disable-next-line no-useless-concat
        //let queryString = '?' + 'offset=' + offset + '&' + 'limit=' + limit;
        let queryString = limit !== "-1" 
            // eslint-disable-next-line no-useless-concat
            ? ('?' + 'offset=' + offset + '&' + 'limit=' + limit)
            : '';

        if (aircraftId) {
            axios.get('/flight/getflightsforaircraft/' + aircraftId)            
                .then(response => {                    
                    dispatch(fetchFlightsSuccess(response.data['flights']));
                })
                .catch(error => {
                    dispatch(fetchFlightsFail(error));               
                });            
        }

    }
};

export const unmountFlights = () => {
    return {
        type: actionTypes.UNMOUNT_FLIGHTS
    }
};