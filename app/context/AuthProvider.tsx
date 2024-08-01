import React, { createContext, useContext, useState, useEffect, useReducer, useMemo } from "react";
import * as SecureStore from 'expo-secure-store';
import { useStores } from "../models";

const AuthContext = createContext(null);

const authReducer = (prevState, action) => {
	switch (action.type) {
		case 'RESTORE_TOKEN':
			return {
				...prevState,
				userToken: action.token,
				isLoading: false,
			};
		case 'SIGN_IN':
			return {
				...prevState,
				isSignout: false,
				userToken: action.token,
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				isSignout: true,
				userToken: null,
			};
	}
};

export const AuthProvider = ({ children }) => {
	const { authenticationStore } = useStores();
	const [state, dispatch] = useReducer(authReducer, {
		isLoading: true,
		isSignout: false,
		userToken: null,
	});

	useEffect(() => {
		const initialize = async () => {
			let userToken;

			try {
				userToken = await SecureStore.getItemAsync('userToken');
				if (userToken) {
					authenticationStore.setAuthToken(userToken);
				}
			} catch (e) {
				console.error("Failed to load auth token:", e);
			}

			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		};

		initialize();
	}, []);

	const authContext = useMemo(
		() => ({
			SignIn: async (authNumber) => {
				if (authNumber === '0535639824') {
					const token = String(Date.now());
					await SecureStore.setItemAsync('userToken', token);
					authenticationStore.setAuthToken(token);
					dispatch({ type: 'SIGN_IN', token });
				} else {
					throw new Error('Invalid auth number');
				}
			},
			SignOut: async () => {
				await SecureStore.deleteItemAsync('userToken');
				authenticationStore.logout();
				dispatch({ type: 'SIGN_OUT' });
			},
		}),
		[]
	);

	if (state.isLoading) {
		console.log('Splash Screen');
		return null;
	}

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);