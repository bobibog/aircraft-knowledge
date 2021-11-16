import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    acarsMessages: null,
    acarsMessagesCount: null,
    acarsMessagesLoading: false,
    acarsMessagesOffset: 0,
    acarsMessagesLimit: rowsPerPageDefault,     
    acarsMessagesPage: 0     
};

const setAkrxOffsetLimit = (state, action) => {
    return updateObject(state, {
        acarsMessagesOffset: action.offset,
        acarsMessagesLimit: action.limit
    });
};
const setAkrxPage = (state, action) => {
    return updateObject(state, {
        acarsMessagesPage: action.page
    });
};
const fetchAkrxStart = (state, action) => {
    return updateObject(state, {
        acarsMessagesLoading: true
    });
};
const fetchAkrxSuccess = (state, action) => {
    return updateObject(state, {
        acarsMessages: action.acarsMessages,
        acarsMessagesCount: action.acarsMessagesCount,
        acarsMessagesLoading: false
    });
};
const fetchAkrxFail = (state, action) => {
    return updateObject(state, {
        acarsMessagesLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AKRX_OFFSET_LIMIT: return setAkrxOffsetLimit(state, action);
        case actionTypes.SET_AKRX_PAGE: return setAkrxPage(state, action);            
        case actionTypes.FETCH_AKRX_START: return fetchAkrxStart(state, action);            
        case actionTypes.FETCH_AKRX_SUCCESS: return fetchAkrxSuccess(state, action);            
        case actionTypes.FETCH_AKRX_FAIL: return fetchAkrxFail(state, action);
        
        default: return state;
    }
};

export default reducer;