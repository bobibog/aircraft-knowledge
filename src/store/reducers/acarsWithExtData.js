import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';


const initialState = {
    acarsWithExtData: null,
    acarsWithExtDataCount: null,
    acarsWithExtDataLoading: false,
    acarsWithExtDataOffset: 0,
    acarsWithExtDataLimit: rowsPerPageDefault,     
    acarsWithExtDataPage: 0     
};

const setAcarsWithExtDataOffsetLimit = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataOffset: action.offset,
        acarsWithExtDataLimit: action.limit
    });
};
const setAcarsWithExtDataPage = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataPage: action.page
    });
};
const fetchAcarsWithExtDataStart = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataLoading: true
    });
};
const fetchAcarsWithExtDataSuccess = (state, action) => {
    return updateObject(state, {
        acarsWithExtData: action.acarsWithExtData,
        acarsWithExtDataCount: action.acarsWithExtDataCount,
        acarsWithExtDataLoading: false
    });
};
const fetchAcarsWithExtDataFail = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACARSWITHEXTDATA_OFFSET_LIMIT: return setAcarsWithExtDataOffsetLimit(state, action);
        case actionTypes.SET_ACARSWITHEXTDATA_PAGE: return setAcarsWithExtDataPage(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_START: return fetchAcarsWithExtDataStart(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_SUCCESS: return fetchAcarsWithExtDataSuccess(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_FAIL: return fetchAcarsWithExtDataFail(state, action);
        
        default: return state;
    }
};

export default reducer;
