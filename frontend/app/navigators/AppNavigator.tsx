// AppNavigator.tsx
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { useColorScheme } from "react-native";
import * as Screens from "@screens";
import Config from "@config";
import { useAuth } from "@context";
import { AppNavigationBar, AppNavigationBarParamList } from "./AppNavigatorBar";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { colors } from "@theme";

export type AppStackParamList = {
	// Auth Navigator
	Login: undefined;
	Signup: undefined;
	Verification: undefined;
	// App Navigator
	Home: undefined; // Ensure type consistency, if using tab navigator, make sure this aligns
	Map: undefined;
	Profile: undefined;
	Notifications: undefined;
	Settings: undefined;
	Admins: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const exitRoutes = Config.exitRoutes;

const AuthStack = createNativeStackNavigator<AppStackParamList>();
const MainStack = createNativeStackNavigator<AppStackParamList>();

const AuthNavigator = observer(() => {
	return (
		<AuthStack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				navigationBarColor: colors.background,
			}}
		>
			<AuthStack.Screen name="Login" component={Screens.LoginScreen} />
			<AuthStack.Screen name="Signup" component={Screens.SignupScreen} />
			<AuthStack.Screen name="Verification" component={Screens.VerificationScreen} />
		</AuthStack.Navigator>
	);
});

const MainNavigator = observer(() => (
	<MainStack.Navigator
		initialRouteName="Home"
		screenOptions={{
			headerShown: false,
			gestureEnabled: true,
			navigationBarColor: colors.background,
		}}
	>
		<MainStack.Screen name="Home" component={AppNavigationBar} />
		<MainStack.Screen name="Notifications" component={Screens.NotificationsScreen} />
		<MainStack.Screen name="Map" component={Screens.MapScreen} />
		<MainStack.Screen name="Profile" component={Screens.ProfileScreen} />
		<MainStack.Screen name="Settings" component={Screens.SettingsScreen} />
	</MainStack.Navigator>
));

export const AppNavigator = observer(function AppNavigator(props) {
	const colorScheme = useColorScheme();
	const { isAuthenticated } = useAuth();

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<NavigationContainer
			ref={navigationRef}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			{...props}
		>
			{/* {isAuthenticated ? ( */}
				<MainNavigator />
			{/* ) : ( */}
				{/* <AuthNavigator /> */}
			{/* )} */}
		</NavigationContainer>
	);
});
