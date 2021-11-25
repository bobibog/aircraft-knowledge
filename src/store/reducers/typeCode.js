import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    typeCodes: null,    
    typeCodeLoading: false,
};

const fetchTypeCodeStart = (state, action) => {
    return updateObject(state, {
        typeCodeLoading: true
    });
};
const fetchTypeCodeSuccess = (state, action) => {
    return updateObject(state, {
        typeCodes: action.typeCodes,        
        typeCodeLoading: false
    });
};
const fetchTypeCodeFail = (state, action) => {
    return updateObject(state, {
        typeCodeLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
                 
        case actionTypes.FETCH_TYPECODE_START: return fetchTypeCodeStart(state, action);            
        case actionTypes.FETCH_TYPECODE_SUCCESS: return fetchTypeCodeSuccess(state, action);            
        case actionTypes.FETCH_TYPECODE_FAIL: return fetchTypeCodeFail(state, action);
        
        default: return state;
    }
};

export default reducer;