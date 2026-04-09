import axios from './axios';

export const register = async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
};

export const getMe = async () => {
    const response = await axios.get('/auth/me');
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token, newPassword) => {
    const response = await axios.post('/auth/reset-password', { token, newPassword });
    return response.data;
};