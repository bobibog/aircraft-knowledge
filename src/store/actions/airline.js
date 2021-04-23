import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import {generatePath} from 'react-router';


export const setAirlinesOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRLINES_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAirlinesPage = (page) => {
    return {
        type: actionTypes.SET_AIRLINES_PAGE,
        page: page
    }
};

export const fetchAirlinesSuccess = (airlines, airlinesCount) => {
    return {
        type: actionTypes.FETCH_AIRLINES_SUCCESS,
        airlines: airlines,
        airlinesCount: airlinesCount
    }
};

export const fetchAirlinesFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRLINES_FAIL,
        error: error
    }
};

export const fetchAirlinesStart = () => {
    return {
        type: actionTypes.FETCH_AIRLINES_START
    }
};


export const fetchAirlines = (offset, limit, airlineName, iata, icao, fleet) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());        
          
        /* let query = new URLSearchParams();
        query.append('?');
        query.append('airlineName', airlineName);
        query.append('iata', iata);
        query.append('icao', icao);
        query.append('fleet', fleet);
        query.append('offset', offset);
        query.append('limit', limit); */        

        let queryString = limit !== "-1"             
            ? ('?'+ 'airlineName='+airlineName + '&' + 'iata=' +iata  + '&' + 'icao=' +icao + '&' + 'fleet=' +fleet+ '&' + 'offset=' + offset + '&' + 'limit=' + limit)
             : '';
            
            axios.get('/airline' + queryString)
            .then(response => {
                
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))
                 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));
                                
            }
        );
        

        
    }
};