import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    feedingTimeDtos: null,    
    feedingTimeLoading: false,       
};

const feedingTimeStart = (state, action) => {
    return updateObject(state, {
        feedingTimeLoading: true
    });
};
const feedingTimeSuccess = (state, action) => {
    return updateObject(state, {
        feedingTimeDtos: action.feedingTimeDtos,        
        feedingTimeLoading: false
    });
};
const feedingTimeFail = (state, action) => {
    return updateObject(state, {
        feedingTimeLoading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.FEEDINGTIME_START: return feedingTimeStart(state, action);            
        case actionTypes.FEEDINGTIME_SUCCESS: return feedingTimeSuccess(state, action);            
        case actionTypes.FEEDINGTIME_FAIL: return feedingTimeFail(state, action);        
        default: return state;
    }
};

export default reducer;