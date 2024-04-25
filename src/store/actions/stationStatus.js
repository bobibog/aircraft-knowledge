import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';

export const setStationStatusOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_STATIONSTATUS_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setStationStatusPage = (page) => {
    return {
        type: actionTypes.SET_STATIONSTATUS_PAGE,
        page: page
    }
};

export const fetchStationStatusSuccess = (stationStatus, stationStatusCount) => {
    return {
        type: actionTypes.FETCH_STATIONSTATUS_SUCCESS,
        stationStatus: stationStatus,
        stationStatusCount: stationStatusCount
    }
};

export const fetchStationStatusFail = (error) => {
    return {
        type: actionTypes.FETCH_STATIONSTATUS_FAIL,
        error: error
    }
};

export const fetchStationStatusStart = () => {
    return {
        type: actionTypes.FETCH_STATIONSTATUS_START
    }
};


export const fetchStationStatus = (offset, limit, start, end, stationId, msgType) => {
    return dispatch => {
        dispatch(fetchStationStatusStart()); 
                         
        const query = new URLSearchParams();                        
        
        query.append('offset', offset);
        query.append('limit', limit);     
        query.append('start', start);
        query.append('end', end);
        query.append('stationId', stationId);
        query.append('msgType', msgType);

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/Stations/StationStatus?`+ queryString)
            .then(response => {                
                dispatch(fetchStationStatusSuccess(response.data['stationStatus'], response.data['stationStatusCount']))                 
            })
            .catch(error => {
                dispatch(fetchStationStatusFail(error));                                
            }    
        );        
    }
};



