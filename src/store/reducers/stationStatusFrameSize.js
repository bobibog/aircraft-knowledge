import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    stationStatusFrameSize: null,    
    stationStatusFrameSizeCount: null,  
    stationStatusFrameSizeLoading: false,
    stationStatusFrameSizeOffset: 0,
    stationStatusFrameSizeLimit: rowsPerPageDefault,     
    stationStatusFrameSizePage: 0     
};

const setStationStatusFrameSizeOffsetLimit = (state, action) => {
    return updateObject(state, {
        stationStatusFrameSizeOffset: action.offset,
        stationStatusFrameSizeLimit: action.limit
    });
};
const setStationStatusFrameSizePage = (state, action) => {
    return updateObject(state, {
        stationStatusFrameSizePage: action.page
    });
};
const fetchStationStatusFrameSizeStart = (state, action) => {
    return updateObject(state, {
        stationStatusFrameSizeLoading: true
    });
};
const fetchStationStatusFrameSizeSuccess = (state, action) => {
    return updateObject(state, {
        stationStatusFrameSize: action.stationStatusFrameSize,
        stationStatusFrameSizeCount: action.stationStatusFrameSizeCount,
        stationStatusFrameSizeLoading: false
    });
};
const fetchStationStatusFrameSizeFail = (state, action) => {
    return updateObject(state, {
        stationStatusFrameSizeLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATIONSTATUSFRAMESIZE_OFFSET_LIMIT: return setStationStatusFrameSizeOffsetLimit(state, action);
        case actionTypes.SET_STATIONSTATUSFRAMESIZE_PAGE: return setStationStatusFrameSizePage(state, action);            
        case actionTypes.FETCH_STATIONSTATUSFRAMESIZE_START: return fetchStationStatusFrameSizeStart(state, action);            
        case actionTypes.FETCH_STATIONSTATUSFRAMESIZE_SUCCESS: return fetchStationStatusFrameSizeSuccess(state, action);            
        case actionTypes.FETCH_STATIONSTATUSFRAMESIZE_FAIL: return fetchStationStatusFrameSizeFail(state, action);
        
        default: return state;
    }
};

export default reducer;