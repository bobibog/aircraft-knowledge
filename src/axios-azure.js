import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 
        ? 'https://localhost:44350/api/v1' 
        : 'https://aircraftknowledgeapi.azurewebsites.net/api/v1'
        //: 'https://flightsmartapi20200111101412.azurewebsites.net/api/v1'
});

export default instance;