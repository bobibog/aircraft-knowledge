import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';


const initialState = {
    acarsMessages: null,
    acarsMessagesCount: null,
    adsbMessagesLoading: false,
    adsbMessagesOffset: 0,
    adsbMessagesLimit: rowsPerPageDefault,     
    adsbMessagesPage: 0     
};

const setAdsbOffsetLimit = (state, action) => {
    return updateObject(state, {
        adsbMessagesOffset: action.offset,
        adsbMessagesLimit: action.limit
    });
};
const setAdsbPage = (state, action) => {
    return updateObject(state, {
        adsbMessagesPage: action.page
    });
};
const fetchAdsbStart = (state, action) => {
    return updateObject(state, {
        adsbMessagesLoading: true
    });
};
const fetchAdsbSuccess = (state, action) => {
    return updateObject(state, {
        acarsMessages: action.acarsMessages,
        acarsMessagesCount: action.acarsMessagesCount,
        adsbMessagesLoading: false
    });
};
const fetchAdsbFail = (state, action) => {
    return updateObject(state, {
        adsbMessagesLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ADSB_OFFSET_LIMIT: return setAdsbOffsetLimit(state, action);
        case actionTypes.SET_ADSB_PAGE: return setAdsbPage(state, action);            
        case actionTypes.FETCH_ADSB_START: return fetchAdsbStart(state, action);            
        case actionTypes.FETCH_ADSB_SUCCESS: return fetchAdsbSuccess(state, action);            
        case actionTypes.FETCH_ADSB_FAIL: return fetchAdsbFail(state, action);
        
        default: return state;
    }
};

export default reducer;