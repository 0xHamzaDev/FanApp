import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { observer } from "mobx-react-lite";
import * as Location from 'expo-location';
import { AppStackScreenProps } from "@navigators";
import { Text } from "@components";
import { colors } from "@theme";
import MapView, { Region, Circle } from 'react-native-maps';
import { calculateDistance } from '@utils';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface MapScreenProps extends AppStackScreenProps<"Map"> { }

interface AssemblyPoint {
	id: number;
	latitude: number;
	longitude: number;
	radius: number;
}

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen({ navigation }) {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [region, setRegion] = useState<Region | null>(null);
	const [assemblyPoints, setAssemblyPoints] = useState<AssemblyPoint[]>([]);
	const [attendanceStatus, setAttendanceStatus] = useState<boolean>(false);

	useEffect(() => {
		initializeLocation();
		const intervalId = setInterval(checkLocationPeriodically, 10000);
		return () => clearInterval(intervalId);
	}, []);

	const initializeLocation = async () => {
		await requestLocationPermission();
		fetchAssemblyPoints();
	};

	const fetchAssemblyPoints = () => {
		setAssemblyPoints([
			{ id: 101, latitude: 37.787834, longitude: -122.406417, radius: 40 },
			{ id: 102, latitude: 37.785834, longitude: -122.406417, radius: 40 },
		]);
	};

	const requestLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === 'granted') {
			const location = await Location.getCurrentPositionAsync({});
			updateLocation(location);
		}
	};

	const updateLocation = (location: Location.LocationObject) => {
		setLocation(location);
		setRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.005,
			longitudeDelta: 0.002,
		});
		checkIfInRadius(location.coords.latitude, location.coords.longitude);
	};

	const checkLocationPeriodically = async () => {
		const location = await Location.getCurrentPositionAsync({});
		updateLocation(location);
	};

	const checkIfInRadius = (lat: number, lon: number) => {
		let isInRadius = false;
		assemblyPoints.forEach((point) => {
			const distance = calculateDistance(lat, lon, point.latitude, point.longitude);
			if (distance <= point.radius) isInRadius = true;
		});
		setAttendanceStatus(isInRadius);
	};

	const recenterMap = async () => {
		const location = await Location.getCurrentPositionAsync({});
		updateLocation(location);
	};

	const handleAttendance = () => {
		if (attendanceStatus) {
			alert("You are within the assembly point.");
		} else {
			alert("You are not within any assembly point.");
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
				<MapView
					style={styles.map}
					region={region}
					onRegionChangeComplete={setRegion}
					showsUserLocation
					loadingEnabled
					showsCompass={false}
					zoomTapEnabled={false}
				>
					{assemblyPoints.map((point) => (
						<Circle
							key={point.id}
							center={{ latitude: point.latitude, longitude: point.longitude }}
							radius={point.radius}
							strokeColor="rgba(255, 0, 0, 0.5)"
							fillColor="rgba(255, 0, 0, 0.3)"
						/>
					))}
				</MapView>
				<TouchableOpacity style={styles.reCenterButton} onPress={recenterMap}>
					<IonIcons name="locate-outline" size={30} color="white" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.attendanceButton} onPress={handleAttendance}>
					<Text style={styles.attendanceButtonText}>Check Attendance</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	reCenterButton: {
		position: 'absolute',
		bottom: '13%',
		right: 20,
		backgroundColor: '#830100',
		padding: 15,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	attendanceButton: {
		position: 'absolute',
		bottom: '15%',
		left: '5%',
		right: '5%',
		backgroundColor: '#007AFF',
		padding: 15,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	attendanceButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
