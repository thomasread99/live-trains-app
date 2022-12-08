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
import moment from "moment";

import ServiceRow from "../components/service/ServiceRow";

import { FavouriteJourney } from "../models/FavouriteJourney";

import * as rttActions from "../store/actions/rtt";
import * as favouritesActions from "../store/actions/favourites";

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
	const [isError, setIsError] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const serviceInformation: ServiceInformation = useAppSelector(
		(state: any) => state.rtt.serviceInformation
	);
	const favouriteJourneys: FavouriteJourney[] = useAppSelector(
		(state: any) => state.favourites.favouriteJourneys
	);

	const onRefresh = () => {
		setIsRefreshing(true);
		loadServiceInformation();
		setIsRefreshing(false);
	};

	const loadServiceInformation = useCallback(async () => {
		await dispatch(
			rttActions.getServiceInformation(
				route.params.serviceUid,
				route.params.date ?? moment()
			)
		);
	}, [dispatch]);

	const addToFavourites = useCallback(
		async (time: string, origin: string, destination: string) => {
			await dispatch(
				favouritesActions.addJourney({
					serviceUid: route.params.serviceUid,
					description: `${time} ${origin} to ${destination}`,
					date: route.params.date
						? route.params.date.toString()
						: moment().toString(),
					crsCode: route.params.crsCode,
				})
			);
		},
		[dispatch]
	);

	const removeFromFavourites = useCallback(
		async (time: string, origin: string, destination: string) => {
			await dispatch(
				favouritesActions.removeJourney({
					serviceUid: route.params.serviceUid,
					description: `${time} ${origin} to ${destination}`,
					date: route.params.date
						? route.params.date.toString()
						: moment().toString(),
					crsCode: route.params.crsCode,
				})
			);
		},
		[dispatch]
	);

	const loadFavouriteJourneys = useCallback(async () => {
		await dispatch(favouritesActions.getFavouriteJourneys());
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadFavouriteJourneys();
		loadServiceInformation().catch(() => {
			setIsError(true);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (serviceInformation && serviceInformation.locations) {
			setSelectedStation(
				serviceInformation.locations.find(
					(location) => location.crs === route.params.crsCode
				)
			);
			setIsLoading(false);
		}
		if (serviceInformation && serviceInformation.error) {
			setIsError(true);
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

	if (isError) {
		return (
			<SafeAreaView>
				<View style={styles.header}>
					<Text style={styles.headerText}></Text>
					<View style={styles.iconContainer}>
						<Ionicons
							name="return-down-back"
							size={wp("8%")}
							style={{ marginRight: wp("3%") }}
							onPress={() => navigation.pop()}
						/>
					</View>
				</View>
				<Text style={styles.errorText}>
					Information for this service could not be found
				</Text>
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
					{favouriteJourneys.some(
						(j) => j.serviceUid === route.params.serviceUid
					) ? (
						<Ionicons
							name="star"
							size={wp("8%")}
							onPress={() =>
								removeFromFavourites(
									serviceInformation.origin[0].publicTime,
									serviceInformation.origin[0].description,
									serviceInformation.destination[0]
										.description
								)
							}
							color="gold"
						/>
					) : (
						<Ionicons
							name="star-outline"
							size={wp("8%")}
							onPress={() =>
								addToFavourites(
									serviceInformation.origin[0].publicTime,
									serviceInformation.origin[0].description,
									serviceInformation.destination[0]
										.description
								)
							}
						/>
					)}
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
