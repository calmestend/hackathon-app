import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Alert } from "react-native";
import { useLocation } from "src/hooks/useLocation";

export const MapDirections: React.FC = () => {
	const mapRef = useRef<MapView | null>(null);
	const { location } = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			if (location) {
				const lat = location.coords.latitude;
				const lng = location.coords.longitude;

				console.log(lat, lng)

				try {
					const res = await fetch('http://172.20.10.4:3000/search', {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ lat, lng }),
					});

					if (!res.ok) {
						throw new Error('Network response was not ok');
					}

					const json = await res.json();
					console.log(json);
				} catch (error) {
					console.error("Error fetching data: ", error);
				}
			}
		};

		fetchData();
	}, [location]);

	return (
		<View style={{ flex: 1 }}>
			{location ? (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					ref={mapRef}
					showsUserLocation={true}
					showsMyLocationButton={false}
					toolbarEnabled={false}
					showsCompass={false}
				>
					<Marker
						coordinate={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						}}
					/>
				</MapView>
			) : (
				<Text>Loading location...</Text> // Optional: Show loading text while location is being fetched
			)}
		</View>
	);
};

