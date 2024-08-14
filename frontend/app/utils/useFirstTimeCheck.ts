import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stateKey = 'welcome_screen_visited';

const useFirstTimeCheck = () => {
    const [isFirstTime, setIsFirstTime] = useState(false);

    useEffect(() => {
        const checkFirstTimeState = async () => {
            try {
                const value = await AsyncStorage.getItem(stateKey);
                if (value === null) {
                    await AsyncStorage.setItem(stateKey, 'visited');
                    setIsFirstTime(true);
                } else {
                    setIsFirstTime(false);
                }
            } catch (error) {
                console.error('Error checking first time state:', error);
            }
        };

        checkFirstTimeState();
    }, []);

    const resetState = async () => {
        try {
            await AsyncStorage.removeItem(stateKey);
            setIsFirstTime(false);
        } catch (error) {
            console.error('Error resetting state:', error);
        }
    };

    return { isFirstTime, resetState };
};

export default useFirstTimeCheck;
