import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components"; // Ensure Icon component is correctly implemented
import { HomeScreen } from "../screens";
import { colors, spacing, typography } from "../theme";
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator";
import { normalize } from "../utils/responsive";

// Define the parameter list for the bottom tab navigator
export type AppNavigationBarParamList = {
	home1: undefined;
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
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: [$tabBar, { height: bottom + normalize(70) }],
				tabBarActiveTintColor: colors.text,
				tabBarInactiveTintColor: colors.text,
				tabBarLabelStyle: $tabBarLabel,
				tabBarItemStyle: $tabBarItem,
			}}
		>
			<Tab.Screen
				name="home1"
				component={HomeScreen}
				options={{
					tabBarLabel: 'Home', // Consider using translation for multi-language support
					tabBarIcon: ({ focused }) => (
						<Icon icon="settings" color={focused ? colors.tint : undefined} size={normalize(30)} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

// Styles for the tab bar and its items
const $tabBar: ViewStyle = {
	backgroundColor: colors.background,
	borderTopColor: colors.transparent,
	padding: normalize(16),
};

const $tabBarItem: ViewStyle = {
	paddingTop: normalize(16),
};

const $tabBarLabel: TextStyle = {
	fontSize: normalize(12),
	fontFamily: typography.primary.medium,
	lineHeight: normalize(16),
};