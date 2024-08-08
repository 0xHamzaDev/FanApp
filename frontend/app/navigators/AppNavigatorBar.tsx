import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, CustomTabBar } from "../components"; // Ensure Icon component is correctly implemented
import * as Screens from "../screens";
import { colors, typography } from "../theme";
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator";

// Define the parameter list for the bottom tab navigator
export type AppNavigationBarParamList = {
	home: undefined;
	notifications: undefined;
	map: undefined;
	settings: undefined;
	profile: undefined;
};

// Define the type for screen props, integrating with AppStackScreenProps
export type AppNavigationBarScreenProps<T extends keyof AppNavigationBarParamList> = CompositeScreenProps<
	BottomTabScreenProps<AppNavigationBarParamList, T>,
	AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<AppNavigationBarParamList>();

// Main component for the bottom tab navigation
export function AppNavigationBar() {
	const { bottom } = useSafeAreaInsets();

	return (
		<Tab.Navigator
			initialRouteName="home"
			tabBar={props => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="profile" component={Screens.ProfileScreen} options={{ title: 'حسابي', tabBarLabel: 'person-circle' }} />
			<Tab.Screen name="settings" component={Screens.SettingsScreen} options={{ title: 'الإعدادات', tabBarLabel: 'settings' }} />
			<Tab.Screen name="map" component={Screens.MapScreen} options={{ title: 'الخريطة', tabBarLabel: 'map' }} />
			<Tab.Screen name="notifications" component={Screens.NotificationsScreen} options={{ title: 'الاشعارات', tabBarLabel: 'notifications' }} />
			<Tab.Screen name="home" component={Screens.HomeScreen} options={{ title: 'الرئيسية', tabBarLabel: 'home' }} />
		</Tab.Navigator>
	);
}

// Styles for the tab bar and its items
const $tabBar: ViewStyle = {
	backgroundColor: colors.background,
	borderTopColor: colors.transparent,
};