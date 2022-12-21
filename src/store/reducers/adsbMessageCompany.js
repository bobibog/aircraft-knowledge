import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';


const initialState = {
    adsbMessages: null,
    adsbMessagesCount: null,
    adsbMessagesLoading: false,
    adsbMessagesOffset: 0,
    adsbMessagesLimit: rowsPerPageDefault,     
    adsbMessagesPage: 0     
};

const setAdsbOffsetLimitCompany = (state, action) => {
    return updateObject(state, {
        adsbMessagesOffset: action.offset,
        adsbMessagesLimit: action.limit
    });
};
const setAdsbPageCompany = (state, action) => {
    return updateObject(state, {
        adsbMessagesPage: action.page
    });
};
const fetchAdsbStartCompany = (state, action) => {
    return updateObject(state, {
        adsbMessagesLoading: true
    });
};
const fetchAdsbSuccessCompany = (state, action) => {
    return updateObject(state, {
        adsbMessages: action.adsbMessages,
        adsbMessagesCount: action.adsbMessagesCount,
        adsbMessagesLoading: false
    });
};
const fetchAdsbFailCompany = (state, action) => {
    return updateObject(state, {
        adsbMessagesLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ADSB_OFFSET_LIMIT_COMPANY: return setAdsbOffsetLimitCompany(state, action);
        case actionTypes.SET_ADSB_PAGE_COMPANY: return setAdsbPageCompany(state, action);            
        case actionTypes.FETCH_ADSB_START_COMPANY: return fetchAdsbStartCompany(state, action);            
        case actionTypes.FETCH_ADSB_SUCCESS_COMPANY: return fetchAdsbSuccessCompany(state, action);            
        case actionTypes.FETCH_ADSB_FAIL_COMPANY: return fetchAdsbFailCompany(state, action);
        
        default: return state;
    }
};

export default reducer;