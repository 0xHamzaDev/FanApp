import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from './Text'

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};


				return (
					<TouchableOpacity
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel || route.name}
						testID={options.tabBarTestID}
						onPress={onPress}
						style={styles.tab}
					>
						<Ionicons name={options.tabBarLabel + '-outline'} color={isFocused ? 'tomato' : 'gray'} size={26} />
						<Text text={options.title} style={[styles.text, { color: isFocused ? 'tomato' : 'gray' }]} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		height: 75,
		bottom: 25,
		left: 0,
		right: 0,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#eee',
		backgroundColor: '#fff',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 14
	}
});
