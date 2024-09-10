import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, CustomTabBar } from "@components"; // Ensure Icon component is correctly implemented
import * as Screens from "@screens";
import { colors, typography } from "@theme";
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
const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Home"
				component={Screens.HomeScreen}
				options={{ 
					animation: "slide_from_right"
				}}
			/>
			<Stack.Screen
				name="Admins"
				component={Screens.AdminsScreen}
				options={{ 
					animation: "slide_from_right"
				}}
			/>
			<Stack.Screen
				name="Tickets"
				component={Screens.TicketsScreen}
				options={{ 
					animation: "slide_from_right"
				}}
			/>
			<Stack.Screen
				name="TicketDetails"
				component={Screens.TicketDetails}
				options={{ 
					animation: "slide_from_right"
				}}
			/>
		</Stack.Navigator>
	);
}

// Main component for the bottom tab navigation
export function AppNavigationBar() {
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
			<Tab.Screen name="home" component={HomeStackNavigator} options={{ title: 'الرئيسية', tabBarLabel: 'home' }} />
		</Tab.Navigator>
	);
}