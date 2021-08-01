import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json'
    }
});

export default instance;