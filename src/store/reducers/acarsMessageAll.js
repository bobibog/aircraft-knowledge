import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    acarsMessages: null,
    acarsMessagesCount: null,
    acarsMessagesLoading: false,

    ////////////
    acarsMessagesOffset: 0,
    acarsMessagesLimit: rowsPerPageDefault,//inicijalno 10     
    acarsMessagesPage: 0     
    ////////////
};

const setAkrxOffsetLimitAll = (state, action) => {
    return updateObject(state, {
        acarsMessagesOffset: action.offset,
        acarsMessagesLimit: action.limit
    });
};
const setAkrxPageAll = (state, action) => {
    return updateObject(state, {
        acarsMessagesPage: action.page
    });
};
const fetchAkrxStartAll = (state, action) => {
    return updateObject(state, {
        acarsMessagesLoading: true
    });
};
const fetchAkrxSuccessAll = (state, action) => {
            //vraca azuriran state objekat
    return updateObject(state, {
        acarsMessages: action.acarsMessages,
        acarsMessagesCount: action.acarsMessagesCount,
        acarsMessagesLoading: false
    });
};
const fetchAkrxFailAll = (state, action) => {
    return updateObject(state, {
        acarsMessagesLoading: false
    });
};

                //pri triggeru dispatch initialState je iz globalnog state a action je prosledjen iz dispatch(action)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AKRX_OFFSET_LIMIT_ALL: return setAkrxOffsetLimitAll(state, action);
        case actionTypes.SET_AKRX_PAGE_ALL: return setAkrxPageAll(state, action);            
        case actionTypes.FETCH_AKRX_START_ALL: return fetchAkrxStartAll(state, action); 
                                
                                                //vraca azuriran state objekat ka globalnom state
        case actionTypes.FETCH_AKRX_SUCCESS_ALL: return fetchAkrxSuccessAll(state, action);//3.(DISPATCHED ACTION)            
        
        case actionTypes.FETCH_AKRX_FAIL_ALL: return fetchAkrxFailAll(state, action);
        
        default: return state;
    }
};

export default reducer;