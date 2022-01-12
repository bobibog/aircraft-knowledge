import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
//import axios2 from '../../axios-local2';

export const setAirportsOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AIRPORTS_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAirportsPage = (page) => {
    return {
        type: actionTypes.SET_AIRPORTS_PAGE,
        page: page
    }
};

export const fetchAirportsSuccess = (airports, airportsCount) => {
    return {
        type: actionTypes.FETCH_AIRPORTS_SUCCESS,
        airports: airports,
        airportsCount: airportsCount
    }
};

export const fetchAirportsFail = (error) => {
    return {
        type: actionTypes.FETCH_AIRPORTS_FAIL,
        error: error
    }
};

export const fetchAirportsStart = () => {
    return {
        type: actionTypes.FETCH_AIRPORTS_START
    }
};

// export const fetchAirports = (offset, limit, airportId, airportName, iata, city, country, airportNameDesc, airportNameAsc, iataDesc, iataAsc, cityDesc, cityAsc, countryDesc, countryAsc) => {
//     return dispatch => {
//         dispatch(fetchAirportsStart());
        
//         const query = new URLSearchParams();                        
//         query.append('airportName', airportName);
//         query.append('iata', iata);
//         query.append('city', city);
//         query.append('country', country);
//         query.append('offset', offset);
//         query.append('limit', limit); 
//         query.append('airportNameDesc', airportNameDesc);
//         query.append('airportNameAsc', airportNameAsc);
//         query.append('iataDesc', iataDesc);
//         query.append('iataAsc', iataAsc);
//         query.append('cityDesc', cityDesc);
//         query.append('cityAsc', cityAsc);
//         query.append('countryDesc', countryDesc);
//         query.append('countryAsc', countryAsc);

//         let queryString = limit !== "-1"           
//             ? query
//             : '';
        
//         if (!airportId) {
//             axios.get('/airport?' + queryString)
//                 .then(response => {
//                     dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
//                 })
//                 .catch(error => {
//                     dispatch(fetchAirportsFail(error));                
//                 });
//         } else {
//             axios.get(`/airport/${airportId}`)
//                 .then(response => {
//                     const airportsArray = [];
//                     if (response.data) {
//                         airportsArray.push(response.data);
//                     }
//                     const airportsArrayCount =  airportsArray.length
//                     // dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))
//                     dispatch(fetchAirportsSuccess(airportsArray, airportsArrayCount))                 
//                 })
//                 .catch(error => {
//                     dispatch(fetchAirportsFail(error));                
//                 });            
//         }
//     }
// };

export const fetchAirports = (offset, limit, airportName, iata, city, country, airportICAO, airportType, elevationFtMin, elevationFtMax, continent, isoCountry, isoRegion, gpsCode, localCode, latitudeDegMin, latitudeDegMax
    , longitudeDegMin, longitudeDegMax) => {
        return dispatch => {
            dispatch(fetchAirportsStart());
            
            const query = new URLSearchParams();                        
            query.append('offset', offset);
            query.append('limit', limit);
            query.append('airportName', airportName);
            query.append('iata', iata);
            query.append('city', city);
            query.append('country', country);
            query.append('airportICAO', airportICAO);
            query.append('airportType', airportType);
            query.append('elevationFtMin', elevationFtMin);
            query.append('elevationFtMax', elevationFtMax);
            query.append('continent', continent);
            query.append('isoCountry', isoCountry);
            query.append('isoRegion', isoRegion);
            query.append('gpsCode', gpsCode);
            query.append('localCode', localCode);
            query.append('latitudeDegMin', latitudeDegMin);
            query.append('latitudeDegMax', latitudeDegMax);
            query.append('longitudeDegMin', longitudeDegMin);
            query.append('longitudeDegMax', longitudeDegMax);
            
    
            let queryString = limit !== "-1"           
                ? query
                : '';
            
            //if (!airportId) {
                axios.get('/airport?' + queryString)
                    .then(response => {
                        dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
                    })
                    .catch(error => {
                        dispatch(fetchAirportsFail(error));                
                    });
            // } else {
            //     axios.get(`/airport/${airportId}`)
            //         .then(response => {
            //             const airportsArray = [];
            //             if (response.data) {
            //                 airportsArray.push(response.data);
            //             }
            //             const airportsArrayCount =  airportsArray.length
            //             // dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))
            //             dispatch(fetchAirportsSuccess(airportsArray, airportsArrayCount))                 
            //         })
            //         .catch(error => {
            //             dispatch(fetchAirportsFail(error));                
            //         });            
            // }
        }
};

// Large Airports
export const fetchLargeAirports = (iata, airportName, city, lat1, lat2, lon1, lon2) => {
        return dispatch => {
            dispatch(fetchAirportsStart());
            
            const query = new URLSearchParams();                        
            
            query.append('iata', iata);
            query.append('airportName', airportName);            
            query.append('city', city);
            query.append('lat1', lat1);
            query.append('lat2', lat2);           
            query.append('lon1', lon1);
            query.append('lon2', lon2);
    
            let queryString = query;
            
            
            axios.get('/Airport/largeLocations?' + queryString)
                .then(response => {
                    dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
                })
                .catch(error => {
                    dispatch(fetchAirportsFail(error));                
                });
            
        }
};

// Large & Medium Airports
export const fetchLargeAndMediumAirports = (iata, airportName, city, lat1, lat2, lon1, lon2) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();                        
        
        query.append('iata', iata);
        query.append('airportName', airportName);            
        query.append('city', city);
        query.append('lat1', lat1);
        query.append('lat2', lat2);           
        query.append('lon1', lon1);
        query.append('lon2', lon2);

        let queryString = query;
        
        
        axios.get('/airport/largeAndMediumLocations?' + queryString)
            .then(response => {
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                
            });
        
    }
};

// All Airports
export const fetchAllAirports = (iata, airportName, city, lat1, lat2, lon1, lon2) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();                        
        
        query.append('iata', iata);
        query.append('airportName', airportName);            
        query.append('city', city);
        query.append('lat1', lat1);
        query.append('lat2', lat2);           
        query.append('lon1', lon1);
        query.append('lon2', lon2);

        let queryString = query;
        
        
        axios.get('/airport/allLocations?' + queryString)
            .then(response => {
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                
            });
        
    }
};




export const orderAirportsByNameDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/airportNameDesc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByNameAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/airportNameAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByIataDesc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/iataDesc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByIataAesc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/iataAesc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByCityDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/cityDsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByCityAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/cityAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByCountryDsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/countryDsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};

export const orderAirportsByCountryAsc = (offset, limit) => {
    return dispatch => {
        dispatch(fetchAirportsStart());
        
        const query = new URLSearchParams();       
        query.append('offset', offset);
        query.append('limit', limit); 

        let queryString = limit !== "-1"           
            ? query
            : '';
        
            axios.get(`/countryAsc?`+ queryString)
            .then(response => {                
                dispatch(fetchAirportsSuccess(response.data['airports'], response.data['airportsCount']))                 
            })
            .catch(error => {
                dispatch(fetchAirportsFail(error));                                
            });        
    }
};


export const unmountAirports = () => {
    return {
        type: actionTypes.UNMOUNT_AIRPORTS
    }
};