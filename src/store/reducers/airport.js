import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    airports: null,
    airportsCount: null,
    airportsLoading: false,
    airportsOffset: 0,
    airportsLimit: rowsPerPageDefault,
    airportsPage: 0
};

const setAirportsOffsetLimit = (state, action) => {
    return updateObject(state, {
        airportsOffset: action.offset,
        airportsLimit: action.limit
    });
};
const setAirportsPage = (state, action) => {
    return updateObject(state, {
        airportsPage: action.page
    });
};
const fetchAirportsStart = (state, action) => {
    return updateObject(state, {
        airportsLoading: true
    });
};
const fetchAirportsSuccess = (state, action) => {
    return updateObject(state, {
        airports: action.airports,
        airportsCount: action.airportsCount,
        airportsLoading: false
    });
};
const fetchAirportsFail = (state, action) => {
    return updateObject(state, {
        airportsLoading: false
    });
};

const unmountAirports = (state, action) => {
    return updateObject(state, {
        airportsOffset: 0,
        airportsPage: 0
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AIRPORTS_OFFSET_LIMIT: return setAirportsOffsetLimit(state, action);
        case actionTypes.SET_AIRPORTS_PAGE: return setAirportsPage(state, action);            
        case actionTypes.FETCH_AIRPORTS_START: return fetchAirportsStart(state, action);            
        case actionTypes.FETCH_AIRPORTS_SUCCESS: return fetchAirportsSuccess(state, action);            
        case actionTypes.FETCH_AIRPORTS_FAIL: return fetchAirportsFail(state, action);
        case actionTypes.UNMOUNT_AIRPORTS: return unmountAirports(state, action);
        default: return state;
    }
};

export default reducer;