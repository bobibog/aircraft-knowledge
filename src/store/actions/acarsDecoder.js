import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';



//mozemo koristiti i useReducer kao lokalni redux komponente slicno kao setState

//akcije za reduktor(reducer) koji menja globalno stanje u redux
//dispatch(akcija(...)) -> reducer(state,akcija)


//postoji obicna redux akcija koja vraca objekat sa tipom i sinhrono je azuriranje stanja u reduxu
//postoji redux thunk akcija koja se koristi za ashinrono izvrsavanje pre azuriranja stanja u reduxu


const decodingStart = (state, action) => {
    return {
        type: actionTypes.DECODING_START
    };
};
const decodingSuccess = (decodingModel) => {
    return {
        type: actionTypes.DECODING_SUCCESS,        
        decodingModel: decodingModel
    };
};

// const decodingSuccess = (state, action) => {
//     return {
//         type: actionTypes.DECODING_SUCCESS,        
//         decodingModel: action.decodingModel
//     };
// };

const decodingFail = (state, action) => {
    return {
        type: actionTypes.DECODING_FAIL
    };
};

//.js je modul a samo ono sto se exportuje(public) moze da se importuje iz njega

export const decodingAkrx = (label, text, isAuthenticated) => {
    return dispatch => {
        dispatch(decodingStart());       
        
        let url = '/acarsMessage/decode';

        const decodingData = {
            label: label,            
            text: text
        };
                 
        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }

        // const app = express();
        // app.use(express.json());

        // app.listen(YOURPORT, () => {
        // console.log(`Listening to requests on port YOURPORT...`);
        // });        
            
        axios.post(url, decodingData, config)
            .then(response => {                
                
                dispatch(decodingSuccess(response.data['decodingModel']))                    
              
                var json = JSON.stringify(response.data, undefined, 2);
                dispatch(decodingSuccess(json))

                //console.log("Response"+json);           
            })
            .catch(error => {
                dispatch(decodingFail(error));                                
            }    
        );        
    }
};






// 'https://localhost:44350/api/v1/AcarsMessage/Decode' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWxhZGVuIiwianRpIjoiNWJhMzhjMDQtZTM1YS00NjBiLWJjZWQtZTExN2E3MmY5YWVmIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjU4OTE0NzIwLCJleHAiOjE2NTg5MTgzMjAsImlhdCI6MTY1ODkxNDcyMH0.VUYqiZqHpBuB4u1IHnV7L8Xm868Gddp1Qk4lxchrdUQ' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "label": "H1",
//   "text": "#DFB62,14684,196217,00009,007,08462/X105421,14672,192707,00002,014,08462/Y1-115,5402,0891,0792,0111,0109,004/Z1-112,5466,0884,0778,0157,0156,007/1F0000,0005,-300,0218,02561,5238/1G0000,0002,-300,0211,02584,0133/1H-081,0068,0674,0693,000,00139,0009/1I-070,0091,0680,0678,001,00139,0009/1J0009,036,1041,0493,0046,0631,097/1K0006,036,0987,0493,0034,0629,122/1L00000,00000,00000,6312,0029,0630/1M00000,00000,00000,0092,0043,0629/1R22280,18302,042C0,00000,00040,00000/1S22280,18522,042C0,00000,00040,00000/1T00000,0000C,04000,100A1,22B00,10000/1U00000,0000C,04000,100A1,20BC0,10000/1V00000,00000,XXXXX,00000,08000,00000/1W02000,00000,XXXXX,00000,08000,00000/1X00000,XXXXX,XXXXX,00000,00000,XXXXX/1Y40000,XXXXX,XXXXX,00000,00000,XXXXX/1Z00041,40080,00000,00000,XXXXX,XXXXX/1A00041,40080,00000,00000,XXXXX,XXXXX/1B33C00,38000,00004,00000,018E0,4E700/1C3D200,30004,00004,00000,01928,44700/1D2C060,-----,-----,-----,XXXXX/1E26060,-----,-----,-----,XXXXX/:"
// }'