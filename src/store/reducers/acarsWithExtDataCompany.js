import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';


const initialState = {
    acarsPerAircraftMessages: null,
    acarsPerAircraftMessagesCount: null,
    acarsWithExtDataLoading: false,
    
    acarsWithExtDataOffset: 0,//
    acarsWithExtDataLimit: rowsPerPageDefault,//isto kao i u reducers/acarsMessage
    
    acarsWithExtDataPage: 0     
};

const setAcarsWithExtDataOffsetLimitCompany = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataOffset: action.offset,//
        acarsWithExtDataLimit: action.limit//
    });
};
const setAcarsWithExtDataPageCompany = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataPage: action.page
    });
};
const fetchAcarsWithExtDataStartCompany = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataLoading: true
    });
};
const fetchAcarsWithExtDataSuccessCompany = (state, action) => {
    return updateObject(state, {
        acarsPerAircraftMessages: action.acarsPerAircraftMessages,
        acarsPerAircraftMessagesCount: action.acarsPerAircraftMessagesCount,
        acarsWithExtDataLoading: false
    });
};
const fetchAcarsWithExtDataFailCompany = (state, action) => {
    return updateObject(state, {
        acarsWithExtDataLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACARSWITHEXTDATA_OFFSET_LIMIT_COMPANY: return setAcarsWithExtDataOffsetLimitCompany(state, action);
        case actionTypes.SET_ACARSWITHEXTDATA_PAGE_COMPANY: return setAcarsWithExtDataPageCompany(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_START_COMPANY: return fetchAcarsWithExtDataStartCompany(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_SUCCESS_COMPANY: return fetchAcarsWithExtDataSuccessCompany(state, action);            
        case actionTypes.FETCH_ACARSWITHEXTDATA_FAIL_COMPANY: return fetchAcarsWithExtDataFailCompany(state, action);
        
        default: return state;
    }
};

export default reducer;
