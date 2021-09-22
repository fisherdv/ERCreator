import axios from 'axios';
import {baseURL} from '../config';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
    }
});

export default instance;