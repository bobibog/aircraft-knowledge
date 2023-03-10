import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    stationData: null,    
    stationDataLoading: false,       
};


const stationDataStart = (state, action) => {
    return updateObject(state, {
        stationDataLoading: true
    });
};
const stationDataSuccess = (state, action) => {
    return updateObject(state, {
        stationData: action.stationData,        
        stationDataLoading: false
    });
};
const stationDataFail = (state, action) => {
    return updateObject(state, {
        stationDataLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.STATIONDATA_START: return stationDataStart(state, action);            
        case actionTypes.STATIONDATA_SUCCESS: return stationDataSuccess(state, action);            
        case actionTypes.STATIONDATA_FAIL: return stationDataFail(state, action);
        
        default: return state;
    }
};

export default reducer;