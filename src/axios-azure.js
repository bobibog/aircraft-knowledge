import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://flightsmartapi20200111101412.azurewebsites.net/api/v1'
});

export default instance;