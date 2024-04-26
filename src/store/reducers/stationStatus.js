import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    stationStatus: null,    
    stationStatusCount: null,  
    stationStatusLoading: false,
    stationStatusOffset: 0,
    stationStatusLimit: rowsPerPageDefault,     
    stationStatusPage: 0     
};

const setStationStatusOffsetLimit = (state, action) => {
    return updateObject(state, {
        stationStatusOffset: action.offset,
        stationStatusLimit: action.limit
    });
};
const setStationStatusPage = (state, action) => {
    return updateObject(state, {
        stationStatusPage: action.page
    });
};
const fetchStationStatusStart = (state, action) => {
    return updateObject(state, {
        stationStatusLoading: true
    });
};
const fetchStationStatusSuccess = (state, action) => {
    return updateObject(state, {
        stationStatus: action.stationStatus,
        stationStatusCount: action.stationStatusCount,
        stationStatusLoading: false
    });
};
const fetchStationStatusFail = (state, action) => {
    return updateObject(state, {
        stationStatusLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATIONSTATUS_OFFSET_LIMIT: return setStationStatusOffsetLimit(state, action);
        case actionTypes.SET_STATIONSTATUS_PAGE: return setStationStatusPage(state, action);            
        case actionTypes.FETCH_STATIONSTATUS_START: return fetchStationStatusStart(state, action);            
        case actionTypes.FETCH_STATIONSTATUS_SUCCESS: return fetchStationStatusSuccess(state, action);            
        case actionTypes.FETCH_STATIONSTATUS_FAIL: return fetchStationStatusFail(state, action);
        
        default: return state;
    }
};

export default reducer;