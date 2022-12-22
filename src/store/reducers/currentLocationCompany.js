import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    currentLocations: null,    
    currentLocationLoading: false,
    // states: null,
    // statesLoading: false,    
};

const fetchCurrentLocationStartCompany = (state, action) => {
    return updateObject(state, {
        currentLocationLoading: true
    });
};
const fetchCurrentLocationSuccessCompany = (state, action) => {
    return updateObject(state, {
        currentLocations: action.currentLocations,        
        currentLocationLoading: false
    });
};
const fetchCurrentLocationFailCompany = (state, action) => {
    return updateObject(state, {
        currentLocationLoading: false
    });
};




const reducer = (state = initialState, action) => {
    switch (action.type) {
                 
        case actionTypes.FETCH_CURRENTLOCATION_START_COMPANY: return fetchCurrentLocationStartCompany(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_SUCCESS_COMPANY: return fetchCurrentLocationSuccessCompany(state, action);            
        case actionTypes.FETCH_CURRENTLOCATION_FAIL_COMPANY: return fetchCurrentLocationFailCompany(state, action);
        
        
        default: return state;
    }
};

export default reducer;