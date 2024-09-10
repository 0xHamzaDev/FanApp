if (__DEV__) {
	require("./devtools/ReactotronConfig.ts")
}

import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "@navigators"
import { ErrorBoundary } from "@screens/error/ErrorBoundary"
import * as storage from "@utils/storage"
import { customFontsToLoad, colors } from "@theme"
import Config from "@config"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ViewStyle, I18nManager } from "react-native"
import { AuthProvider } from "@context"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
	screens: {
		Signup: 'Signup',
		Login: {
			path: "",
		},
		Verification: "Verification",
		Main: {
			screens: {
				Home: 'Home',
				Map: 'Map',
				Notifications: 'Notifications',
				Profile: 'Profile'
			},
		},
	},
}

interface AppProps {
	hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function App(props: AppProps) {
	const { hideSplashScreen } = props
	const {
		initialNavigationState,
		onNavigationStateChange,
		isRestored: isNavigationStateRestored,
	} = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

	const { rehydrated } = useInitialRootStore(() => {
		setTimeout(hideSplashScreen, 500)
	})

	if (!rehydrated || !isNavigationStateRestored || (!areFontsLoaded && !fontLoadError)) {
		return null
	}

	const linking = {
		prefixes: [prefix],
		config,
	}

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<AuthProvider>
				<ErrorBoundary catchErrors={Config.catchErrors}>
					<GestureHandlerRootView style={$container}>
						<AppNavigator
							linking={linking}
							initialState={initialNavigationState}
							onStateChange={onNavigationStateChange}
						/>
					</GestureHandlerRootView>
				</ErrorBoundary>
			</AuthProvider>
		</SafeAreaProvider>
	)
}

export default App

const $container: ViewStyle = {
	flex: 1,
}