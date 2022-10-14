import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';



const feedingTimeStart = (state, action) => {
    return {
        type: actionTypes.FEEDINGTIME_START
    };
};
const feedingTimeSuccess = (feedingTimeDtos) => {
    return {
        type: actionTypes.FEEDINGTIME_SUCCESS,        
        feedingTimeDtos: feedingTimeDtos
    };
};


const feedingTimeFail = (state, action) => {
    return {
        type: actionTypes.FEEDINGTIME_FAIL
    };
};


export const feedingTimeData = (timeMin2, timeMax2, stationId2) => {
    return dispatch => {
        dispatch(feedingTimeStart());       
        
        const query = new URLSearchParams();
        query.append('timeMin2', timeMin2);
        query.append('timeMax2', timeMax2);
        query.append('stationId2', stationId2);
        
        let queryString =  query;            
            
        axios.get(`/FeederStatistics/FeedingTime?`+ queryString)
            .then(response => {                
                dispatch(feedingTimeSuccess(response.data['feedingTimeDtos']))   
                // var json = JSON.stringify(response.data, undefined, 2);
                // dispatch(feedingTimeSuccess(json))

                // console.log("FEEDING actions :"+ json);            
            })
            .catch(error => {
                dispatch(feedingTimeFail(error));                                
            }    
        );    

    }
};






