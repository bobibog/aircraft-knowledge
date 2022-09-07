import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    directionalRangesStorages: null,    
    directionalRangesLoading: false,       
};


const directionalRangesStart = (state, action) => {
    return updateObject(state, {
        directionalRangesLoading: true
    });
};
const directionalRangesSuccess = (state, action) => {
    return updateObject(state, {
        directionalRangesStorages: action.directionalRangesStorages,        
        directionalRangesLoading: false
    });
};
const directionalRangesFail = (state, action) => {
    return updateObject(state, {
        directionalRangesLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.DIRECTIONALRANGES_START: return directionalRangesStart(state, action);            
        case actionTypes.DIRECTIONALRANGES_SUCCESS: return directionalRangesSuccess(state, action);            
        case actionTypes.DIRECTIONALRANGES_FAIL: return directionalRangesFail(state, action);
        
        default: return state;
    }
};

export default reducer;