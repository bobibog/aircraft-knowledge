import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';

const initialState = {
    airlines: null,
    airlinesCount: null,
    airlinesLoading: false,
    airlinesOffset: 0,
    airlinesLimit: rowsPerPageDefault,
    airlinesPage: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AIRLINES_OFFSET_LIMIT:
            return {
                ...state,
                airlinesOffset: action.offset,
                airlinesLimit: action.limit
            };
        case actionTypes.SET_AIRLINES_PAGE:
            return {
                ...state,
                airlinesPage: action.page
            };
        case actionTypes.FETCH_AIRLINES_START:
            return {
                ...state,
                airlinesLoading: true
            };
        case actionTypes.FETCH_AIRLINES_SUCCESS:
            return {
                ...state,
                airlines: action.airlines,
                airlinesCount: action.airlinesCount,
                airlinesLoading: false
            };
        case actionTypes.FETCH_AIRLINES_FAIL:
            return {
                ...state,
                airlinesLoading: false
            };    
        default:
            return state;
    }
};

export default reducer;