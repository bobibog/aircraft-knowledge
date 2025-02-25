import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';

export const setStationStatusFrameSizeOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_STATIONSTATUSFRAMESIZE_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setStationStatusFrameSizePage = (page) => {
    return {
        type: actionTypes.SET_STATIONSTATUSFRAMESIZE_PAGE,
        page: page
    }
};

export const fetchStationStatusFrameSizeSuccess = (data, count) => {
    return {
        type: actionTypes.FETCH_STATIONSTATUSFRAMESIZE_SUCCESS,
        stationStatusFrameSize: data,
        stationStatusFrameSizeCount: count
    }
};

export const fetchStationStatusFrameSizeFail = (error) => {
    return {
        type: actionTypes.FETCH_STATIONSTATUSFRAMESIZE_FAIL,
        error: error
    }
};

export const fetchStationStatusFrameSizeStart = () => {
    return {
        type: actionTypes.FETCH_STATIONSTATUSFRAMESIZE_START
    }
};


export const fetchStationStatusFrameSize = (offset, limit, start, end, stationId, msgType) => {
    return dispatch => {
        dispatch(fetchStationStatusFrameSizeStart()); 
                         
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
            
        axios.get(`/StationStatusFrameSize/StationStatusFrameSize?`+ queryString)
            .then(response => {                
                dispatch(fetchStationStatusFrameSizeSuccess(response.data['data'], response.data['count']))   
                //console.log("Frame size data="+response.data['count'])           
            })
            .catch(error => {
                dispatch(fetchStationStatusFrameSizeFail(error));                                
            }    
        );        
    }
};



