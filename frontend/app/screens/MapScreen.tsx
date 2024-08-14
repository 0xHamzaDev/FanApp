import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { observer } from "mobx-react-lite";
import * as Location from 'expo-location';
import { Screen } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors } from "../theme";
import MapView, { Marker, Region, Circle } from 'react-native-maps';

interface MapScreenProps extends AppStackScreenProps<"Map"> { }

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen({ navigation }) {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [region, setRegion] = useState<Region | null>(null);

	useEffect(() => {
		requestLocationPermission();
	}, []);

	async function requestLocationPermission() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		setRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005,
		});
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }} >
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						region={region}
						showsUserLocation={true}
						loadingEnabled={true}
					>
						{location && (
							<Circle
								center={{
									latitude: location.coords.latitude + 0.001,
									longitude: location.coords.longitude,
								}}
								radius={40}
								strokeColor="rgba(0, 150, 255, 0.5)"
								fillColor="rgba(0, 150, 255, 0.3)"
							/>
						)}
					</MapView>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
