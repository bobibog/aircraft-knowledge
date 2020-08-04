import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    flights: null,
    flightsCount: null,
    flightsLoading: false,
    flightsOffset: 0,
    flightsLimit: rowsPerPageDefault,
    flightsPage: 0
};

const setFlightsOffsetLimit = (state, action) => {
    return updateObject(state, {
        flightsOffset: action.offset,
        flightsLimit: action.limit
    });
};
const setFlightsPage = (state, action) => {
    return updateObject(state, {
        flightsPage: action.page
    });
};
const fetchFlightsStart = (state, action) => {
    return updateObject(state, {
        flightsLoading: true
    });
};
const fetchFlightsSuccess = (state, action) => {
    return updateObject(state, {
        flights: action.flights,
        flightsCount: action.flightsCount,
        flightsLoading: false
    });
};
const fetchFlightsFail = (state, action) => {
    return updateObject(state, {
        flightsLoading: false
    });
};

const unmountFlights = (state, action) => {
    return updateObject(state, {
        flightsOffset: 0,
        flightsPage: 0
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FLIGHTS_OFFSET_LIMIT: return setFlightsOffsetLimit(state, action);
        case actionTypes.SET_FLIGHTS_PAGE: return setFlightsPage(state, action);            
        case actionTypes.FETCH_FLIGHTS_START: return fetchFlightsStart(state, action);            
        case actionTypes.FETCH_FLIGHTS_SUCCESS: return fetchFlightsSuccess(state, action);            
        case actionTypes.FETCH_FLIGHTS_FAIL: return fetchFlightsFail(state, action);
        case actionTypes.UNMOUNT_FLIGHTS: return unmountFlights(state, action);
        default: return state;
    }
};

export default reducer;