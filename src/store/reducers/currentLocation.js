import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    currentLocations: null,    
    currentLocationLoading: false,
    states: null,
    statesLoading: false,
    openSkys: null,
    openSkyAPIloading: false
};

const fetchCurrentLocationStart = (state, action) => {
    return updateObject(state, {
        currentLocationLoading: true
    });
};
const fetchCurrentLocationSuccess = (state, action) => {
    return updateObject(state, {
        currentLocations: action.currentLocations,        
        currentLocationLoading: false
    });
};
const fetchCurrentLocationFail = (state, action) => {
    return updateObject(state, {
        currentLocationLoading: false
    });
};

// OpenSky - directly
const fetchStatesStart = (state, action) => {
    return updateObject(state, {
        statesLoading: true
    });
};
const fetchStatesSuccess = (state, action) => {
    return updateObject(state, {
        states: action.states,        
        statesLoading: false
    });
};
const fetchStatesFail = (state, action) => {
    return updateObject(state, {
        statesLoading: false
    });
};

// OpenSky - our API
const fetchOpenSkysStart = (openSkys, action) => {
    return updateObject(openSkys, {
        statesLoading: true
    });
};
const fetchOpenSkysSuccess = (openSkys, action) => {
    return updateObject(openSkys, {
        openSkys: action.openSkys,        
        statesLoading: false
    });
};
const fetchOpenSkysFail = (openSkys, action) => {
    return updateObject(openSkys, {
        statesLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
                 
        case actionTypes.FETCH_CURRENTLOCATION_START: return fetchCurrentLocationStart(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_SUCCESS: return fetchCurrentLocationSuccess(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_FAIL: return fetchCurrentLocationFail(state, action);

        case actionTypes.FETCH_STATES_START: return fetchStatesStart(state, action);
        case actionTypes.FETCH_STATES_SUCCESS: return fetchStatesSuccess(state, action);
        case actionTypes.FETCH_STATES_FAIL: return fetchStatesFail(state, action);

        case actionTypes.FETCH_OPENSKYS_START: return fetchOpenSkysStart(state, action);
        case actionTypes.FETCH_OPENSKYS_SUCCESS: return fetchOpenSkysSuccess(state, action);
        case actionTypes.FETCH_OPENSKYS_FAIL: return fetchOpenSkysFail(state, action);
        
        default: return state;
    }
};

export default reducer;