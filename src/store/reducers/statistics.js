import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    messagesNumber: null,    
    statisticsLoading: false,       
};


const statisticsStart = (state, action) => {
    return updateObject(state, {
        statisticsLoading: true
    });
};
const statisticsSuccess = (state, action) => {
    return updateObject(state, {
        messagesNumber: action.messagesNumber,        
        statisticsLoading: false
    });
};
const statisticsFail = (state, action) => {
    return updateObject(state, {
        statisticsLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.STATISTICS_START: return statisticsStart(state, action);            
        case actionTypes.STATISTICS_SUCCESS: return statisticsSuccess(state, action);            
        case actionTypes.STATISTICS_FAIL: return statisticsFail(state, action);
        
        default: return state;
    }
};

export default reducer;