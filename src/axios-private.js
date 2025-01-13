import axios from 'axios';
//import {AuthContext} from './context/auth-context';

console.log(`Dev: ${process.env.REACT_APP_URL_API_DEV}. Prod: ${process.env.REACT_APP_URL_API_PROD}.`);
const token = localStorage.getItem('token');
const axiosPrivate = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 

        // ? "https://api.aviolog.com/api/v1"
        // : "https://api.aviolog.com/api/v1"
        ? process.env.REACT_APP_URL_API_DEV 
        : process.env.REACT_APP_URL_API_PROD,
        //: 'https://aircraftknowledgeapi.azurewebsites.net/api/v1'

        //: 'https://flightsmartapi20200111101412.azurewebsites.net/api/v1'
    
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// // Add a request interceptor to include the token
// axiosPrivate.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token'); // Get the token from localStorage
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   // Optionally, add a response interceptor for handling errors globally
//   axiosPrivate.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         // Handle token expiration or unauthorized access
//         console.error('Unauthorized or token expired');
//         // You can redirect to login or refresh the token here
//       }
//       return Promise.reject(error);
//     }
//   );
  

export default axiosPrivate;