import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://35.225.182.234',
    timeout: 5000
});

export default instance;