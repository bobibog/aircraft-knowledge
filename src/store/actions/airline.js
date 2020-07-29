import * as actionTypes from './actionTypes';
import axios from '../../axios-local';

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

export const fetchAirlines = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirlinesStart());
        // eslint-disable-next-line no-useless-concat
        let queryString = '?' + 'offset=' + offset + '&' + 'limit=' + limit;
        // let queryString = limit !== 0 
        //     // eslint-disable-next-line no-useless-concat
        //     ? ('?' + 'offset=' + offset + '&' + 'limit=' + limit)
        //     : '';
        axios.get('/airline' + queryString)
            .then(response => {
                // let airlinesList = response.data['airlines'];
                // let airlinesCount = response.data['airlinesCount'];
                // setAirlines(response.data['airlines']);
                // setAirlinesCount(response.data['airlinesCount']);
                // setAirlines(fetchedAirlines);
                // const fetchedAirlines = [];
                // const fetchedAirlinesCount = null;
                dispatch(fetchAirlinesSuccess(response.data['airlines'], response.data['airlinesCount']))
                //setLoading(false); 
            })
            .catch(error => {
                dispatch(fetchAirlinesFail(error));
                //setLoading(false);
                //console.log('Greska je: ' + error);                
            }
        );
    }
};