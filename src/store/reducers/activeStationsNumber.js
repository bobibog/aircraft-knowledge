import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';



const initialState = {
    stationsNumber: null,    
    stationNumberLoading: false,       
};


const stationNumberStart = (state, action) => {
    return updateObject(state, {
        stationNumberLoading: true
    });
};
const stationNumberSuccess = (state, action) => {
    return updateObject(state, {
        stationsNumber: action.stationsNumber,        
        stationNumberLoading: false
    });
};
const stationNumberFail = (state, action) => {
    return updateObject(state, {
        stationNumberLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.STATIONNUMBER_START: return stationNumberStart(state, action);            
        case actionTypes.STATIONNUMBER_SUCCESS: return stationNumberSuccess(state, action);            
        case actionTypes.STATIONNUMBER_FAIL: return stationNumberFail(state, action);
        
        default: return state;
    }
};

export default reducer;