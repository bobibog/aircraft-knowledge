import * as actionTypes from './actionTypes';
import axios from '../../axios-local';

export const setAircraftOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRCRAFT_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAircraftPage = (page) => {
    return {
        type: actionTypes.SET_AIRCRAFT_PAGE,
        page: page
    }
};

export const fetchAircraftSuccess = (aircraft, aircraftCount) => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_SUCCESS,
        aircraft: aircraft,
        aircraftCount: aircraftCount
    }
};

export const fetchAircraftFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_FAIL,
        error: error
    }
};

export const fetchAircraftStart = () => {
    return {
        type: actionTypes.FETCH_AIRCRAFT_START
    }
};

export const fetchAircraft = (offset, limit, airlineId) => {
    return dispatch => {
        dispatch(fetchAircraftStart());
        // eslint-disable-next-line no-useless-concat
        //let queryString = '?' + 'offset=' + offset + '&' + 'limit=' + limit;
        let queryString = limit !== "-1" 
            // eslint-disable-next-line no-useless-concat
            ? ('?' + 'offset=' + offset + '&' + 'limit=' + limit)
            : '';

        if (airlineId) {
            axios.get('/aircraft/getaircraftinairline/' + airlineId + queryString)
                .then(response => {                    
                    dispatch(fetchAircraftSuccess(response.data['aircraft'], response.data['aircraftCount']));
                })
                .catch(error => {
                    dispatch(fetchAircraftFail(error));               
                });            
        }

    }
};

export const fetchAircrafts = (offset, limit, airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate, airlineDesc, airlineAsc, operatorsDesc, operatorsAsc, typeCodeDesc, typeCodeAsc, fullTypeDesc, fullTypeAsc, registrationDesc, registrationAsc, serialNumberDesc, serialNumberAsc, modeSDesc, modeSAsc, manufactureDateDesc, manufactureDateAsc) => {
    return dispatch => {
        dispatch(fetchAircraftStart());        
          
        const query = new URLSearchParams();                        
        query.append('airline', airline);
        query.append('operators', operators);
        query.append('typeCode', typeCode);
        query.append('fullType', fullType);
        query.append('registration', registration); 
        query.append('serialNumber', serialNumber);
        query.append('modeS', modeS);         
        query.append('minManufactureDate', minManufactureDate);
        query.append('maxManufactureDate', maxManufactureDate); 
        query.append('offset', offset);
        query.append('limit', limit); 
        query.append('airlineDesc', airlineDesc);
        query.append('airlineAsc',airlineAsc);
        query.append('operatorsDesc', operatorsDesc);
        query.append('operatorsAsc', operatorsAsc);
        query.append('typeCodeDesc', typeCodeDesc);
        query.append('typeCodeAsc', typeCodeAsc);
        query.append('fullTypeDesc', fullTypeDesc);
        query.append('fullTypeAsc', fullTypeAsc);
        query.append('registrationDesc', registrationDesc);
        query.append('registrationAsc', registrationAsc);
        query.append('serialNumberDesc', serialNumberDesc);
        query.append('serialNumberAsc', serialNumberAsc);
        query.append('modeSDesc', modeSDesc);
        query.append('modeSAsc', modeSAsc);
        query.append('manufactureDateDesc', manufactureDateDesc);
        query.append('manufactureDateAsc', manufactureDateAsc);    

        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/aircraft?`+ queryString)
            .then(response => {                
                dispatch(fetchAircraftSuccess(response.data['aircraft'], response.data['aircraftCount']))                 
            })
            .catch(error => {
                dispatch(fetchAircraftFail(error));                                
            }    
        );        
    }
};

export const unmountAircraft = () => {
    return {
        type: actionTypes.UNMOUNT_AIRCRAFT
    }
};