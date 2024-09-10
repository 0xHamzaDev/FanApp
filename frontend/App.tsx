import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import App from "./app/app";
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

SplashScreen.preventAutoHideAsync();

function IgniteApp() {
	const [rtlEnforced, setRtlEnforced] = useState(false);

	useEffect(() => {
		if (!rtlEnforced && I18nManager.isRTL === false) {
			I18nManager.allowRTL(true);
			I18nManager.forceRTL(true);
			setRtlEnforced(true);
			Updates.reloadAsync();
		}
	}, [rtlEnforced]);

	return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

export default IgniteApp;
