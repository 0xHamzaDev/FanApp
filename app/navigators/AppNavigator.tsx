import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { useColorScheme } from "react-native";
import * as Screens from "../screens";
import Config from "../config";
import { useStores } from "../models";
import { AppNavigationBar, AppNavigationBarParamList } from "./AppNavigatorBar";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { colors } from "../theme";

export type AppStackParamList = {
	Home: createBottomTabNavigator<AppNavigationBarParamList>;
	Login: undefined;
	Verification: undefined;
};

const exitRoutes = Config.exitRoutes;

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthNavigator = observer(() => (
	<AuthStack.Navigator
		initialRouteName="Login"
		screenOptions={{ headerShown: false, gestureEnabled: true, navigationBarColor: colors.background }}
	>
		<AuthStack.Screen name="Login" component={Screens.LoginScreen} />
		<AuthStack.Screen name="Verification" component={Screens.VerificationScreen} />
	</AuthStack.Navigator>
));

const MainNavigator = observer(() => (
	<MainStack.Navigator
		initialRouteName="Home"
		screenOptions={{ headerShown: false, gestureEnabled: false, navigationBarColor: colors.background }}
	>
		<MainStack.Screen name="Home" component={AppNavigationBar} />
	</MainStack.Navigator>
));

export const AppNavigator = observer(function AppNavigator(props) {
	const colorScheme = useColorScheme();
	const { authenticationStore } = useStores();
	const isAuthenticated = authenticationStore.isAuthenticated;

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<NavigationContainer
			ref={navigationRef}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			{...props}
		>
			{isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
});