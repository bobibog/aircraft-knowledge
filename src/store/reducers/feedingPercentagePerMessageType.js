import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    feedingPercentagePerMessageType: null,    
    feedingPercentagePerMessageTypeLoading: false,       
};

const feedingPercentagePerMessageTypeStart = (state) => {
    return updateObject(state, {
        feedingPercentagePerMessageTypeLoading: true
    });
};
const feedingPercentagePerMessageTypeSuccess = (state, action) => {
    return updateObject(state, {
        feedingPercentagePerMessageType: action.feedingPercentagePerMessageType,        
        feedingPercentagePerMessageTypeLoading: false
    });
};
const feedingPercentagePerMessageTypeFail = (state) => {
    return updateObject(state, {
        feedingPercentagePerMessageTypeLoading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_START: return feedingPercentagePerMessageTypeStart(state);            
        case actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_SUCCESS: return feedingPercentagePerMessageTypeSuccess(state, action);            
        case actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_FAIL: return feedingPercentagePerMessageTypeFail(state);        
        default: return state;
    }
};

export default reducer;