import axios from '../axios'; // Adjust the path if needed

export const login = (credentials) => {
    return axios.post('/auth/login', credentials);
};

export const register = (userData) => {
    return axios.post('/auth/register', userData);
};
