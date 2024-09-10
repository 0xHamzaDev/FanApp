import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signUp, signIn, verifyOTP } from '@services/api/authService';

const AuthContext = createContext(null);

export const getUserSession = async () => {
    try {
        const sessionString = await AsyncStorage.getItem('authSession');
        if (sessionString) {
            const session = JSON.parse(sessionString);
            return session
        }
    } catch (error) {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authNumber, setAuthNumber] = useState("");
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!authToken;

    useEffect(() => {
        const loadSession = async () => {
            try {
                const sessionString = await AsyncStorage.getItem('authSession');
                if (sessionString) {
                    const session = JSON.parse(sessionString);
                    setUser(session.user);
                    setAuthToken(session.token);
                }
            } catch (error) {
                console.error("Failed to load session:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, []);

    const setAuthNumberFunc = (value) => {
        setAuthNumber(value.replace(/ /g, ""));
    };

    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            await signIn(phoneNumber);
        } catch (error) {
            console.error("Failed to sign in with phone number:", error);
            throw error;
        }
    };

    const verifyOtp = async (phoneNumber, otp, navigation) => {
        try {
            const data = await verifyOTP(phoneNumber, otp);
            if (data) {
                setUser(data.user);
                setAuthToken(data.token);
                await AsyncStorage.setItem('authSession', JSON.stringify({ user: data.user, token: data.token }));
                navigation.navigate('Home');  
            }
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            throw error;
        }
    }

    const signupUser = async (name, password, phone) => {
        try {
            const data = await signUp(name, password, phone);
            return data;
        } catch (error) {
            console.error("Failed to sign up user:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('authSession');
            setUser(null);
            setAuthToken(null);
        } catch (error) {
            console.error("Failed to sign out:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authNumber,
                setAuthNumber: setAuthNumberFunc,
                signInWithPhoneNumber,
                signupUser,
                signOut,
                verifyOtp,
                isAuthenticated,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);