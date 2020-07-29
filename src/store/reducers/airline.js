import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    airlines: null,
    airlinesCount: null,
    airlinesLoading: false,
    airlinesOffset: 0,
    airlinesLimit: rowsPerPageDefault,
    airlinesPage: 0
};

const setAirlinesOffsetLimit = (state, action) => {
    return updateObject(state, {
        airlinesOffset: action.offset,
        airlinesLimit: action.limit
    });
};
const setAirlinesPage = (state, action) => {
    return updateObject(state, {
        airlinesPage: action.page
    });
};
const fetchAirlinesStart = (state, action) => {
    return updateObject(state, {
        airlinesLoading: true
    });
};
const fetchAirlinesSuccess = (state, action) => {
    return updateObject(state, {
        airlines: action.airlines,
        airlinesCount: action.airlinesCount,
        airlinesLoading: false
    });
};
const fetchAirlinesFail = (state, action) => {
    return updateObject(state, {
        airlinesLoading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AIRLINES_OFFSET_LIMIT: return setAirlinesOffsetLimit(state, action);
        case actionTypes.SET_AIRLINES_PAGE: return setAirlinesPage(state, action);            
        case actionTypes.FETCH_AIRLINES_START: return fetchAirlinesStart(state, action);            
        case actionTypes.FETCH_AIRLINES_SUCCESS: return fetchAirlinesSuccess(state, action);            
        case actionTypes.FETCH_AIRLINES_FAIL: return fetchAirlinesFail(state, action);
        default: return state;
    }
};

export default reducer;