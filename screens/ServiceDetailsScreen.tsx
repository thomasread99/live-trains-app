import React, { useState, useEffect, useCallback } from "react";
import {
	Text,
	ActivityIndicator,
	FlatList,
	ListRenderItemInfo,
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
			<FlatList
				data={serviceInformation.locations}
				renderItem={destinationListItem}
				keyExtractor={(item) => item.crs}
			/>
		</SafeAreaView>
	);
};

export default ServiceDetailsScreen;
