import * as actionTypes from './actionTypes';
import axios from '../../axios-local';

export const setAircraftOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRCRAFT_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAircraftPage = (page) => {
    return {
        type: actionTypes.SET_AIRCRAFT_PAGE,
        page: page
    }
};

export const fetchAircraftSuccess = (aircraft, aircraftCount) => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_SUCCESS,
        aircraft: aircraft,
        aircraftCount: aircraftCount
    }
};

export const fetchAircraftFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_FAIL,
        error: error
    }
};

export const fetchAircraftStart = () => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_START
    }
};

export const fetchAircraft = (offset, limit, airlineId) => {
    return dispatch => {
        dispatch(fetchAircraftStart());
        // eslint-disable-next-line no-useless-concat
        //let queryString = '?' + 'offset=' + offset + '&' + 'limit=' + limit;
        let queryString = limit !== "-1" 
            // eslint-disable-next-line no-useless-concat
            ? ('?' + 'offset=' + offset + '&' + 'limit=' + limit)
            : '';

        if (airlineId) {
            axios.get('/aircraft/getaircraftinairline/' + airlineId + queryString)
                .then(response => {                    
                    dispatch(fetchAircraftSuccess(response.data['aircraft'], response.data['aircraftCount']));
                })
                .catch(error => {
                    dispatch(fetchAircraftFail(error));               
                });            
        }

    }
};

export const unmountAircraft = () => {
    return {
        type: actionTypes.UNMOUNT_AIRCRAFT
    }
};