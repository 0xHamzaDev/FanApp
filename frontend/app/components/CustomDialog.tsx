import React from 'react';
import { View, Button, Modal, TouchableOpacity, Image } from 'react-native';
import { Text } from '../components';

export const CustomDialog = ({ title, description, visible, onAllow, onDeny }) => {
	return (
		<Modal transparent={true} visible={visible} animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.container}>
					<View style={styles.dialog}>
						<Text style={styles.dialogTitle} text={title || 'العنوان'} />
						<Text style={[styles.dialogDescription,  { display: description ? 'flex' : 'none' }]} text={description || ''} />
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.denyButton} onPress={onDeny}>
								<Text style={styles.denyButtonText}>عدم السماح</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.allowButton} onPress={onAllow}>
								<Text style={styles.allowButtonText}>السماح</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = {
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	container: {
		width: '90%',
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		marginBottom: 100,
		alignItems: 'center',
	},
	dialog: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		width: '100%',
		alignItems: 'center',
	},
	dialogTitle: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 15,
		fontFamily: 'JannaMed',
	},
	dialogDescription: {
		fontSize: 14,
		color: 'gray',
		textAlign: 'center',
		marginBottom: 40,
		fontFamily: 'Janna',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	denyButton: {
		backgroundColor: '#f0f0f0',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		alignItems: 'center',
		marginRight: 10,
	},
	allowButton: {
		backgroundColor: '#b02a2a',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		alignItems: 'center',
	},
	denyButtonText: {
		color: 'black',
		fontSize: 16,
		fontFamily: 'Janna',
	},
	allowButtonText: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Janna',
	},
};