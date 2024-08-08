import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { Screen } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";

MapboxGL.setAccessToken("sk.eyJ1IjoiaGFtemFhbHNoZXJpZiIsImEiOiJjbHprc2xiaTcxNjh5MmtzaTN3eTBnaW91In0.tlLesVUSxEZeSoHbh_vEqw");

interface MapScreenProps extends AppStackScreenProps<"Map"> { }

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen({ navigation }) {
	const [locationGranted, setLocationGranted] = useState(false);
	const [initialRegion, setInitialRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});

	useEffect(() => {
		const getLocationPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				setLocationGranted(true);
				let location = await Location.getCurrentPositionAsync({});
				setInitialRegion({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				});
			} else {
				setLocationGranted(false);
			}
		};

		getLocationPermission();
	}, []);

	const markers = [
		{ id: 1, title: 'نقطة 1', description: 'وصف النقطة 1', latitude: 37.78825, longitude: -122.4324 },
		{ id: 2, title: 'نقطة 2', description: 'وصف النقطة 2', latitude: 37.75825, longitude: -122.4624 },
		{ id: 3, title: 'نقطة 3', description: 'وصف النقطة 3', latitude: 37.76825, longitude: -122.4824 },
	];

	return (
		<Screen preset="auto" style={{ flex: 1, backgroundColor: colors.mainBackground }} safeAreaEdges={["top"]}>
			<View style={styles.container}>
				{locationGranted ? (
					<MapboxGL.MapView style={styles.map}>
						<MapboxGL.Camera
							zoomLevel={8}
							centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
						/>
						{markers.map(marker => (
							<MapboxGL.PointAnnotation
								key={marker.id}
								id={String(marker.id)}
								coordinate={[marker.longitude, marker.latitude]}
							>
								<MapboxGL.Callout title={marker.title}>
									<View style={styles.callout}>
										<Text>{marker.description}</Text>
									</View>
								</MapboxGL.Callout>
							</MapboxGL.PointAnnotation>
						))}
					</MapboxGL.MapView>
				) : (
					<Text style={styles.permissionText}>Permission to access location was denied</Text>
				)}
			</View>
		</Screen>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	permissionText: {
		color: 'red',
		fontSize: 16,
	},
	callout: {
		padding: 8,
		backgroundColor: 'white',
		borderRadius: 4,
	},
});