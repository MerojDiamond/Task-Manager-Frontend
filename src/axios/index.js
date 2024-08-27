import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://task-manager/api/', // Replace with your API base URL
});

export default instance;