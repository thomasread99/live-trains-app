import React, { useState, useEffect, useCallback } from "react";
import {
	Text,
	ActivityIndicator,
	FlatList,
	ListRenderItemInfo,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ServiceRow from "../components/service/ServiceRow";

import * as rttActions from "../store/actions/rtt";

import styles from "../styles/ServiceDetailsScreenStyles";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { StationSearchNavigatorParamList } from "../navigation/StationSearchNavigation";

type ServiceDetailsScreenProps = NativeStackScreenProps<
	StationSearchNavigatorParamList,
	"ServiceDetailsScreen"
>;

const ServiceDetailsScreen = ({
	route,
	navigation,
}: ServiceDetailsScreenProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedStation, setSelectedStation] = useState<LocationObj>();

	const dispatch = useAppDispatch();

	const serviceInformation: ServiceInformation = useAppSelector(
		(state: any) => state.rtt.serviceInformation
	);

	const loadServiceInformation = useCallback(async () => {
		await dispatch(
			rttActions.getServiceInformation(route.params.serviceUid)
		);
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadServiceInformation()
			.then(() => {
				setSelectedStation(
					serviceInformation.locations.find(
						(location) => location.crs === route.params.crsCode
					)
				);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	// TODO: Might want to pop when unfocussed to prevent getting wrong state data

	const destinationListItem = ({ item }: ListRenderItemInfo<LocationObj>) => (
		<ServiceRow
			station={item.description}
			departed={item.realtimeDepartureActual}
			arrived={item.realtimeArrivalActual}
			bookedArrival={item.gbttBookedArrival}
			bookedDeparture={item.gbttBookedDeparture}
			realtimeArrival={item.realtimeArrival}
			realtimeDeparture={item.realtimeDeparture}
		/>
	);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.centered}>
				<ActivityIndicator size="large" color={"lightblue"} />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<Text style={styles.trainOverview}>
				{serviceInformation.origin[0].publicTime}{" "}
				{serviceInformation.origin[0].description} to{" "}
				{serviceInformation.destination[0].description}
			</Text>
			<View style={{ flexDirection: "row", justifyContent: "space-evenly"}}>
				<View>
				<Text style={styles.arrivingHeader}>Arriving</Text>
				<Text style={styles.realtimeArrival}>
					{selectedStation.realtimeArrival}
				</Text>
				<Text style={styles.trainOverview}>
					at {selectedStation.description}
				</Text>
				</View>

				<View>
				<Text style={styles.arrivingHeader}>Platform</Text>
				<Text style={styles.realtimeArrival}>
					{selectedStation.platform}
				</Text>
				</View>
			</View>
			<FlatList
				data={serviceInformation.locations}
				renderItem={destinationListItem}
				keyExtractor={(item) => item.crs}
				style={styles.flatlist}
			/>
		</SafeAreaView>
	);
};

export default ServiceDetailsScreen;
