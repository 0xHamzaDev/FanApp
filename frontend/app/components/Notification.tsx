import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './index';
import { spacing, colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icons = {
	'error': { name: 'close-circle-outline', color: '#FF3B30' }, // Red for error
	'info': { name: 'information-circle-outline', color: colors.textDim }, // Blue for info
	'warning': { name: 'warning-outline', color: '#FFCC00' }, // Yellow for warning
	'success': { name: 'checkmark-circle-outline', color: '#34C759' }, // Green for success
};

export const Notification = ({ data }) => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.iconContainer}>
					<Ionicons
						name={Icons[data.icon].name}
						size={28}
						color={Icons[data.icon].color}
						style={styles.icon}
					/>
				</View>
				<Text style={styles.title}>{data.title}</Text>
			</View>
			<Text style={styles.time}>{data.time}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '100%',
		padding: spacing.md,
		marginVertical: spacing.sm,
		borderRadius: 8,
		borderColor: '#e7eaeb',
		borderWidth: 1,
	},
	row: {
		flexDirection: 'row-reverse',
		justifyContent: 'flex-end',
		alignItems: 'end',
	},
	title: {
		fontSize: 16,
		color: colors.text,
		fontFamily: 'Janna',
		marginBottom: spacing.xs,
		textAlign: 'right',
		flex: 1,
		paddingRight: spacing.sm,
	},
	time: {
		fontSize: 12,
		fontFamily: 'Janna',
		textAlign: 'left',
		color: colors.textDim,
		paddingLeft: spacing.sm,
	},
	iconContainer: {
		paddingHorizontal: spacing.xs,
		paddingVertical: spacing.xs,
		borderRadius: 10,
		backgroundColor: '#f3f4f5',
		marginHorizontal: spacing.xs,
	},
});

export default Notification;
