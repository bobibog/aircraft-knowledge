import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';



const initialState = {
    decodingModel: null,
    // acarsMessagesCount: null,
    decodingLoading: false,
    // acarsMessagesOffset: 0,
    // acarsMessagesLimit: rowsPerPageDefault,     
    // acarsMessagesPage: 0     
};

// const setAkrxOffsetLimit = (state, action) => {
//     return updateObject(state, {
//         acarsMessagesOffset: action.offset,
//         acarsMessagesLimit: action.limit
//     });
// };
// const setAkrxPage = (state, action) => {
//     return updateObject(state, {
//         acarsMessagesPage: action.page
//     });
// };
const decodingStart = (state, action) => {
    return updateObject(state, {
        decodingLoading: true
    });
};
                        //state je prosledjeno trenutno stanje
const decodingSuccess = (state, action) => {
    return updateObject(state, {
        //deo podatka za azuriranje uzimamo iz akcije a deo manuelno predefinsemo
        decodingModel: action.decodingModel,        
        decodingLoading: false
    });
};
const decodingFail = (state, action) => {
    return updateObject(state, {
        decodingLoading: false
    });
};

//zaduzen je za azuriranje odredjenog dela globalnog state
//posto prvi put nema stanja onda pri pozivu dispatch dolazi defaultno iz ovog modula jer ce biti undefined, a pri narednim pozivima automatski se koristi proslo i prosledjuje mu se akcija iz dispatch
const reducer = (state = initialState, action) => {
    switch (action.type) {             
        case actionTypes.DECODING_START: return decodingStart(state, action);            
        case actionTypes.DECODING_SUCCESS: return decodingSuccess(state, action);            
        case actionTypes.DECODING_FAIL: return decodingFail(state, action);
        
        default: return state;//stavili smo default jer se zapravo dispatch(akcija(...)) salje ka svim reducerima a reduceri na koje se ne odnosi promena vracaju postojeci state
        //a svaki state koji se vrati iz konkretnih reducer ce biti uniran u globalni state globalnog reducera koji obavestava sve komponente koje koriste promenjeno globalno stanje da se rerenderuju 
  
    }
};

export default reducer;