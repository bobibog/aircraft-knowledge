import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';



const feedingWorkPercentageDtosStart = (state, action) => {
    return {
        type: actionTypes.FEEDINGWORKPERCENTAGEDTOS_START
    };
};
const feedingWorkPercentageDtosSuccess = (feedingWorkPercentageDtos) => {
    return {
        type: actionTypes.FEEDINGWORKPERCENTAGEDTOS_SUCCESS,        
        feedingWorkPercentageDtos: feedingWorkPercentageDtos
    };
};


const feedingWorkPercentageDtosFail = (state, action) => {
    return {
        type: actionTypes.FEEDINGWORKPERCENTAGEDTOS_FAIL
    };
};


export const feedingPercentageData = (timeMin2, timeMax2, stationId2) => {
    return dispatch => {
        dispatch(feedingWorkPercentageDtosStart());       
        
        const query = new URLSearchParams();
        query.append('timeMin2', timeMin2);
        query.append('timeMax2', timeMax2);
        query.append('stationId2', stationId2);
        
        let queryString =  query;            
            
        axios.get(`/FeederStatistics/FeedingPercentage?`+ queryString)
            .then(response => {                
                dispatch(feedingWorkPercentageDtosSuccess(response.data['feedingWorkPercentageDtos']))   
                // var json = JSON.stringify(response.data, undefined, 2);
                // dispatch(feedingWorkPercentageDtosSuccess(json))

                //console.log("FEEDING actions :"+ response.data);            
            })
            .catch(error => {
                dispatch(feedingWorkPercentageDtosFail(error));                                
            }    
        );    

    }
};






