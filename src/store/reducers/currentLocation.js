import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    currentLocations: null,    
    currentLocationLoading: false,
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


const reducer = (state = initialState, action) => {
    switch (action.type) {
                 
        case actionTypes.FETCH_CURRENTLOCATION_START: return fetchCurrentLocationStart(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_SUCCESS: return fetchCurrentLocationSuccess(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_FAIL: return fetchCurrentLocationFail(state, action);
        
        default: return state;
    }
};

export default reducer;