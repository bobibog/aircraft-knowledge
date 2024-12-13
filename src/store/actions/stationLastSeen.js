import * as actionTypes from './actionTypes';
// import axios from '../../axios-azure';
import axios from '../../axios-private';
import {generatePath} from 'react-router';
import {moment} from 'moment';



const stationDataStart = (state, action) => {
    return {
        type: actionTypes.STATIONDATA_START
    };
};
const stationDataSuccess = (stationData) => {
    return {
        type: actionTypes.STATIONDATA_SUCCESS,        
        stationData: stationData
    };
};


const stationDataFail = (state, action) => {
    return {
        type: actionTypes.STATIONDATA_FAIL
    };
};


export const getStationData = () => {
    return dispatch => {
        dispatch(stationDataStart());       
        
                 
        axios.get(`/Station`)
            .then(response => {                
                dispatch(stationDataSuccess(response.data))   
                //var json = JSON.stringify(response.data, undefined, 2);
                //dispatch(stationData(json))

                //console.log("STATION DATA ::"+ json);            
            })
            .catch(error => {
                dispatch(stationDataFail(error));                                
            }    
        );    

    }
};






