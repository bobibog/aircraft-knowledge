import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';


export const fetchAircraftTypeSuccess = (aircraftTypes) => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_SUCCESS,
        aircraftTypes: aircraftTypes,        
    }
};

export const fetchAircraftTypeFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_FAIL,
        error: error
    }
};

export const fetchAircraftTypeStart = () => {
    return {
        type: actionTypes.FETCH_AIRCRAFTTYPE_START
    }
};


export const fetchAircraftTypes = (aircraftType,limitTypeMax,token) => {
    
    return dispatch => {
    
        dispatch(fetchAircraftTypeStart());//azuriramo podatak u global state kao indikator a neka komponenta koja ga koristi ce reagovati rerenderom        
          
        const query = new URLSearchParams();                        
        query.append('aircraftType', aircraftType);
        
        //console.log("Aircraft type: "+aircraftType)

        query.append('limit',limitTypeMax)//  

        let queryString = query;   
        
        const config ={
            headers: {'Authorization': `Bearer ${token}`}
        }
            
        axios.get(`/AircraftTypeFull/GetAircraftTypesFullAll?`+queryString, config)
            .then(response => {                
                dispatch(fetchAircraftTypeSuccess(response.data['aircraftTypes']))                 
            })
            .catch(error => {
                dispatch(fetchAircraftTypeFail(error));                                
            }    
        );        
    }
};

