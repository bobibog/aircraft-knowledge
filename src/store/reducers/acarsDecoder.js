import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    decodingModel: null,
    // acarsMessagesCount: null,
    decodingLoading: false,
    // acarsMessagesOffset: 0,
    // acarsMessagesLimit: rowsPerPageDefault,     
    // acarsMessagesPage: 0     
};

// const setAkrxOffsetLimit = (state, action) => {
//     return updateObject(state, {
//         acarsMessagesOffset: action.offset,
//         acarsMessagesLimit: action.limit
//     });
// };
// const setAkrxPage = (state, action) => {
//     return updateObject(state, {
//         acarsMessagesPage: action.page
//     });
// };
const decodingStart = (state, action) => {
    return updateObject(state, {
        decodingLoading: true
    });
};
const decodingSuccess = (state, action) => {
    return updateObject(state, {
        decodingModel: action.decodingModel,        
        decodingLoading: false
    });
};
const decodingFail = (state, action) => {
    return updateObject(state, {
        decodingLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.DECODING_START: return decodingStart(state, action);            
        case actionTypes.DECODING_SUCCESS: return decodingSuccess(state, action);            
        case actionTypes.DECODING_FAIL: return decodingFail(state, action);
        
        default: return state;
    }
};

export default reducer;