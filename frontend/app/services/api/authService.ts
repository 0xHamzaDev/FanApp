import axios from 'axios';
import { getUserSession } from '@context';

const API_URL = 'http://localhost:8000/api';

// Authentication
export const signUp = async (name: string, password: string, phone: string) => {
    try {
        const response = await axios.post(`${API_URL}/authentication/register`, {
            name: name,
            password: password,
            phone: phone,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signIn = async (phone: string) => {
    try {
        const response = await axios.post(`${API_URL}/authentication/login`, { 
            phone: phone 
        });
        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message)
        throw error.response?.data || error.message;
    }
};

export const verifyOTP = async (phone: string, otp: string) => {
    try {
        const response = await axios.post(`${API_URL}/authentication/verify`, { 
            phone: phone,
            otp: otp
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// fetch user details
export const checkUser = async (phone: string) => {
    try {
        const response = await axios.post(`${API_URL}/user/check-user`, { phone });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const test = async () => {
    try {
        const session = await getUserSession();
        const response = await axios.post(`${API_URL}/user/protected`, {} , {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};