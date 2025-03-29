import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface RouteMapViewProps {
	mapRef: any;
	initialRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
	location: any;
	pathCoordinates: any[];
	stopPoints: any[];
	origin: any;
	destination: any;
}

export const RouteMapView: React.FC<RouteMapViewProps> = ({
	mapRef,
	initialRegion,
	location,
	pathCoordinates,
	stopPoints,
	origin,
	destination,
}) => {
	const [key, setKey] = useState(0);

	useEffect(() => {
		setKey(prev => prev + 1);
	}, [pathCoordinates, stopPoints]);
	return (
		<MapView
			key={key}
			style={styles.map}
			initialRegion={initialRegion}
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
				title="Mi ubicación"
			/>

			{pathCoordinates.map((route, index) => (
				<Polyline
					key={index}
					coordinates={route.coordinates}
					strokeColor={route.type === 'walking' ? '#4CAF50' : '#2196F3'}
					strokeWidth={route.type === 'walking' ? 3 : 4}
					lineDashPattern={route.type === 'walking' ? [5, 5] : null}
				/>
			))}

			{stopPoints.map((stop) => (
				<Marker
					key={stop.stopId}
					coordinate={stop.coordinate}
					title={stop.title}
					pinColor="#4CAF50"
				/>
			))}

			{origin && (
				<Marker
					coordinate={{
						latitude: origin.latLng.lat / 1e6,
						longitude: origin.latLng.lng / 1e6
					}}
					title={origin.title}
					pinColor="#FF5722"
				/>
			)}

			{destination && (
				<Marker
					coordinate={{
						latitude: destination.latLng.lat / 1e6,
						longitude: destination.latLng.lng / 1e6
					}}
					title={destination.title}
					pinColor="#9C27B0"
				/>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
