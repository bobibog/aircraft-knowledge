import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';



const directionalRangesStart = (state, action) => {
    return {
        type: actionTypes.DIRECTIONALRANGES_START
    };
};
const directionalRangesSuccess = (directionalRangesStorages) => {
    return {
        type: actionTypes.DIRECTIONALRANGES_SUCCESS,        
        directionalRangesStorages: directionalRangesStorages
    };
};


const directionalRangesFail = (state, action) => {
    return {
        type: actionTypes.DIRECTIONALRANGES_FAIL
    };
};


export const statisticsDirectionalRanges = (timeMin1, timeMax1, stationId1, angle) => {
    return dispatch => {
        dispatch(directionalRangesStart());       
        
        const query = new URLSearchParams();
        query.append('timeMin1', timeMin1);
        query.append('timeMax1', timeMax1);
        query.append('stationId1', stationId1);
        query.append('angle', angle);

        let queryString =  query;            
            
        axios.get(`/FeederStatistics/HistroicalDirectionalRanges?`+ queryString)
            .then(response => {                
                dispatch(directionalRangesSuccess(response.data['directionalRangesStorages']))   
                // var json = JSON.stringify(response.data, undefined, 2);
                // dispatch(directionalRangesSuccess(json))

                //console.log("DIRECTIONS ::"+ json);            
            })
            .catch(error => {
                dispatch(directionalRangesFail(error));                                
            }    
        );    

    }
};






