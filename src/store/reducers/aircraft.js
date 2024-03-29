import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    aircraft: null,
    aircraftCount: null,
    aircraftLoading: false,
    aircraftOffset: 0,
    aircraftLimit: rowsPerPageDefault,
    aircraftPage: 0,
    aircraftJson: null,
    aircraftJsonCount: null,
    aircraftJsonLoading: false
};

const setAircraftOffsetLimit = (state, action) => {
    return updateObject(state, {
        aircraftOffset: action.offset,
        aircraftLimit: action.limit
    });
};
const setAircraftPage = (state, action) => {
    return updateObject(state, {
        aircraftPage: action.page
    });
};
const fetchAircraftStart = (state, action) => {
    return updateObject(state, {
        aircraftLoading: true
    });
};
const fetchAircraftSuccess = (state, action) => {
    return updateObject(state, {
        aircraft: action.aircraft,
        aircraftCount: action.aircraftCount,
        aircraftLoading: false
    });
};
const fetchAircraftFail = (state, action) => {
    return updateObject(state, {
        aircraftLoading: false
    });
};

const unmountAircraft = (state, action) => {
    return updateObject(state, {
        aircraftOffset: 0,
        aircraftPage: 0
    });
};

const fetchAircraftJsonStart = (state, action) => {
    return updateObject(state, {
        aircraftJsonLoading: true
    });
};
const fetchAircraftJsonSuccess = (state, action) => {
    return updateObject(state, {
        aircraftJson: action.aircraftJson,
        aircraftJsonCount: action.aircraftJsonCount,
        aircraftJsonLoading: false
    });
};
const fetchAircraftJsonFail = (state, action) => {
    return updateObject(state, {
        aircraftJsonLoading: false
    });
}; 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AIRCRAFT_OFFSET_LIMIT: return setAircraftOffsetLimit(state, action);
        case actionTypes.SET_AIRCRAFT_PAGE: return setAircraftPage(state, action);            
        case actionTypes.FETCH_AIRCRAFT_START: return fetchAircraftStart(state, action);            
        case actionTypes.FETCH_AIRCRAFT_SUCCESS: return fetchAircraftSuccess(state, action);            
        case actionTypes.FETCH_AIRCRAFT_FAIL: return fetchAircraftFail(state, action);
        case actionTypes.UNMOUNT_AIRCRAFT: return unmountAircraft(state, action);
        case actionTypes.FETCH_AIRCRAFTJSON_START: return fetchAircraftJsonStart(state, action);
        case actionTypes.FETCH_AIRCRAFTJSON_SUCCESS: return fetchAircraftJsonSuccess(state, action);            
        case actionTypes.FETCH_AIRCRAFTJSON_FAIL: return fetchAircraftJsonFail(state, action);
        default: return state;
    }
};

export default reducer;