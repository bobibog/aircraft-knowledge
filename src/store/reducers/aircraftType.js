import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    aircraftTypes: null,
    // aircraftCount: null,
    aircraftTypeLoading: false,
    // aircraftOffset: 0,
    // aircraftLimit: rowsPerPageDefault,
    // aircraftPage: 0
};

// const setAircraftOffsetLimit = (state, action) => {
//     return updateObject(state, {
//         aircraftOffset: action.offset,
//         aircraftLimit: action.limit
//     });
// };
// const setAircraftPage = (state, action) => {
//     return updateObject(state, {
//         aircraftPage: action.page
//     });
// };
const fetchAircraftTypeStart = (state, action) => {
    return updateObject(state, {
        aircraftTypeLoading: true
    });
};
const fetchAircraftTypeSuccess = (state, action) => {
    return updateObject(state, {
        aircraftTypes: action.aircraftTypes,
        // aircraftCount: action.aircraftCount,
        aircraftTypeLoading: false
    });
};
const fetchAircraftTypeFail = (state, action) => {
    return updateObject(state, {
        aircraftTypeLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
                 
        case actionTypes.FETCH_AIRCRAFTTYPE_START: return fetchAircraftTypeStart(state, action);            
        case actionTypes.FETCH_AIRCRAFTTYPE_SUCCESS: return fetchAircraftTypeSuccess(state, action);//!            
        case actionTypes.FETCH_AIRCRAFTTYPE_FAIL: return fetchAircraftTypeFail(state, action);
        
        default: return state;
    }
};

export default reducer;