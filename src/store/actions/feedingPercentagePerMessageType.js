import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
//import {moment} from 'moment';



const feedingPercentagePerMessageTypeStart = (state) => {
    return {
        type: actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_START
    };
};
const feedingPercentagePerMessageTypeSuccess = (feedingPercentagePerMessageType) => {
    return {
        type: actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_SUCCESS,        
        feedingPercentagePerMessageType: feedingPercentagePerMessageType
    };
};


const feedingPercentagePerMessageTypeFail = (state) => {
    return {
        type: actionTypes.FEEDINGPERCENTAGEPERMESSAGETYPE_FAIL
    };
};


export const feedingPercentagePerTypeData = (timeMin3, timeMax3, stationId3) => {
    return dispatch => {
        dispatch(feedingPercentagePerMessageTypeStart());       
        
        const query = new URLSearchParams();
        query.append('timeMin', timeMin3);
        query.append('timeMax', timeMax3);
        query.append('stationId', stationId3);
        
        let queryString =  query;            
            
        axios.get(`/FeederStatistics/FeedingTimePerMessageType?`+ queryString)
            .then(response => {                
                dispatch(feedingPercentagePerMessageTypeSuccess(response.data['feedingPercentagePerMessageType']))   
                // var json = JSON.stringify(response.data, undefined, 2);
                // dispatch(feedingWorkPercentageDtosSuccess(json))

                //console.log("FEEDING actions :"+ response.data);            
            })
            .catch(error => {
                dispatch(feedingPercentagePerMessageTypeFail(error));                                
            }    
        );    

    }
};






