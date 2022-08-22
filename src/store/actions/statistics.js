import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';



const statisticsStart = (state, action) => {
    return {
        type: actionTypes.STATISTICS_START
    };
};
const statisticsSuccess = (messagesNumber) => {
    return {
        type: actionTypes.STATISTICS_SUCCESS,        
        messagesNumber: messagesNumber
    };
};


const statisticsFail = (state, action) => {
    return {
        type: actionTypes.STATISTICS_FAIL
    };
};


export const statisticsMessagesNumber = (timeMin, timeMax, stationId) => {
    return dispatch => {
        dispatch(statisticsStart());       
        
        const query = new URLSearchParams();
        query.append('timeMin', timeMin);
        query.append('timeMax', timeMax);
        query.append('stationId', stationId);

        let queryString =  query;            
            
        axios.get(`/FeederStatistics/MessagesNumber?`+ queryString)
            .then(response => {                
                dispatch(statisticsSuccess(response.data['messagesNumber']))   
                var json = JSON.stringify(response.data, undefined, 2);
                dispatch(statisticsSuccess(json))

                //console.log("PORUKE"+json);            
            })
            .catch(error => {
                dispatch(statisticsFail(error));                                
            }    
        );    

    }
};






