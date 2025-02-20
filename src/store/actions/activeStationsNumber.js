import * as actionTypes from './actionTypes';
// import axios from '../../axios-azure';
import axios from '../../axios-private';


const stationNumberStart = (state, action) => {
    return {
        type: actionTypes.STATIONNUMBER_START
    };
};
const stationNumberSuccess = (stationsNumber) => {
    return {
        type: actionTypes.STATIONNUMBER_SUCCESS,        
        stationsNumber: stationsNumber
    };
};


const stationNumberFail = (state, action) => {
    return {
        type: actionTypes.STATIONNUMBER_FAIL
    };
};


export const getStationNumber = () => {
    return dispatch => {
        dispatch(stationNumberStart());       
        
                 
        axios.get(`/Station/ActiveStationsNumber`)
            .then(response => {                
                dispatch(stationNumberSuccess(response.data))   
                //var json = JSON.stringify(response.data, undefined, 2);
                //dispatch(stationData(json))

                //console.log("STATION DATA ::"+ json);            
            })
            .catch(error => {
                dispatch(stationNumberFail(error));                                
            }    
        );    

    }
};






