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
import Ionicons from "@expo/vector-icons/Ionicons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const serviceInformation: ServiceInformation = useAppSelector(
		(state: any) => state.rtt.serviceInformation
	);

	const onRefresh = () => {
		setIsRefreshing(true);
		loadServiceInformation();
		setIsRefreshing(false);
	};

	const loadServiceInformation = useCallback(async () => {
		await dispatch(
			rttActions.getServiceInformation(route.params.serviceUid)
		);
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadServiceInformation();
	}, []);

	useEffect(() => {
		if (serviceInformation) {
			setSelectedStation(
				serviceInformation.locations.find(
					(location) => location.crs === route.params.crsCode
				)
			);
			setIsLoading(false);
		}
	}, [serviceInformation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			navigation.popToTop();
		});

		return unsubscribe;
	}, [navigation]);

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
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{serviceInformation.origin[0].publicTime}{" "}
					{serviceInformation.origin[0].description} to{" "}
					{serviceInformation.destination[0].description}
				</Text>
				<View style={styles.iconContainer}>
					<Ionicons
						name="return-down-back"
						size={wp("8%")}
						style={{ marginRight: wp("3%") }}
						onPress={() => navigation.pop()}
					/>					
				</View>
			</View>			
			<View
				style={{ flexDirection: "row", justifyContent: "space-evenly" }}
			>
				<View>
					<Text style={styles.arrivingHeader}>
						{selectedStation
							? selectedStation.description ===
							  serviceInformation.origin[0].description
								? ""
								: "Arriving"
							: ""}
					</Text>
					<Text style={styles.realtimeArrival}>
						{selectedStation
							? selectedStation.description ===
							  serviceInformation.origin[0].description
								? "Starts"
								: selectedStation.realtimeArrival
							: ""}
					</Text>
					<Text style={styles.trainOverview}>
						at {selectedStation ? selectedStation.description : ""}
					</Text>
				</View>

				<View>
					<Text style={styles.arrivingHeader}>Platform</Text>
					<Text style={styles.realtimeArrival}>
						{selectedStation && selectedStation.platform
							? selectedStation.platform
							: "TBA"}
					</Text>
				</View>
			</View>
			<FlatList
				data={serviceInformation.locations}
				renderItem={destinationListItem}
				keyExtractor={(item) => item.crs}
				style={styles.flatlist}
				refreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		</SafeAreaView>
	);
};

export default ServiceDetailsScreen;
