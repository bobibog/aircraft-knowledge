import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    feedingWorkPercentageDtos: null,    
    feedingWorkPercentageDtosLoading: false,       
};

const feedingWorkPercentageDtosStart = (state, action) => {
    return updateObject(state, {
        feedingWorkPercentageDtosLoading: true
    });
};
const feedingWorkPercentageDtosSuccess = (state, action) => {
    return updateObject(state, {
        feedingWorkPercentageDtos: action.feedingWorkPercentageDtos,        
        feedingWorkPercentageDtosLoading: false
    });
};
const feedingWorkPercentageDtosFail = (state, action) => {
    return updateObject(state, {
        feedingWorkPercentageDtosLoading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.FEEDINGWORKPERCENTAGEDTOS_START: return feedingWorkPercentageDtosStart(state, action);            
        case actionTypes.FEEDINGWORKPERCENTAGEDTOS_SUCCESS: return feedingWorkPercentageDtosSuccess(state, action);            
        case actionTypes.FEEDINGWORKPERCENTAGEDTOS_FAIL: return feedingWorkPercentageDtosFail(state, action);        
        default: return state;
    }
};

export default reducer;