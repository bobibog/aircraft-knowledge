import axios from 'axios';
//import {AuthContext} from './context/auth-context';

console.log(`Dev: ${process.env.REACT_APP_URL_API_DEV}. Prod: ${process.env.REACT_APP_URL_API_PROD}.`);
const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 

        // ? "https://api.aviolog.com/api/v1"
        // : "https://api.aviolog.com/api/v1"
        ? process.env.REACT_APP_URL_API_DEV 
        : process.env.REACT_APP_URL_API_PROD,
        //: 'https://aircraftknowledgeapi.azurewebsites.net/api/v1'

        //: 'https://flightsmartapi20200111101412.azurewebsites.net/api/v1'
    
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    withCredentials: true
});

export default instance;