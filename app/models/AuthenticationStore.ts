import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { reaction } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationStoreModel = types
    .model("AuthenticationStore", {
        authToken: types.maybe(types.string),
        authNumber: "",
    })
    .views((store) => ({
        get isAuthenticated() {
            return !!store.authToken;
        },
        get validationError() {
            if (store.authNumber.length < 10) return "Auth number must be at least 10 digits";
            return "";
        },
    }))
    .actions((store) => ({
        setAuthNumber(value: string) {
            store.authNumber = value.replace(/ /g, "");
        },
        logout() {
            store.authToken = undefined;
            store.authNumber = "";
            store.clearAuthToken(); // Ensure token is cleared from AsyncStorage
        },
        loadAuthToken: flow(function* () {
            try {
                const token = yield AsyncStorage.getItem('authToken');
                if (token) {
                    store.authToken = token;
                }
            } catch (error) {
                console.error('Failed to load token:', error);
            }
        }),
        setAuthToken: flow(function* (value?: string) {
            store.authToken = value;
            try {
                if (value) {
                    yield AsyncStorage.setItem('authToken', value);
                } else {
                    yield AsyncStorage.removeItem('authToken');
                }
            } catch (error) {
                console.error('Failed to save or remove token:', error);
            }
        }),
        clearAuthToken: flow(function* () {
            try {
                yield AsyncStorage.removeItem('authToken');
            } catch (error) {
                console.error('Failed to clear token:', error);
            }
        }),
    }));

// Reaction to update authentication state immediately
reaction(
    () => AuthenticationStoreModel.authToken,
    (token) => {
        console.log("Authentication state changed:", !!token);
    }
);

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }