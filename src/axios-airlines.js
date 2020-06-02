import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://aircraft-knowledge-37b1a.firebaseio.com/'
});

export default instance;