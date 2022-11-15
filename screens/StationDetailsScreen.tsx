import React, { useState, useCallback, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SearchToggle from "../components/search/SearchToggle";
import ServiceCard from "../components/search/ServiceCard";

import * as rttActions from "../store/actions/rtt";
import * as favouritesActions from "../store/actions/favourites";

import styles from "../styles/StationDetailsScreenStyles";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { TrainSearchNavigatorParamList } from "../navigation/StationSearchNavigation";

type StationDetailsScreenProps = NativeStackScreenProps<
	TrainSearchNavigatorParamList,
	"StationDetailsScreen"
>;

const StationDetailsScreen = ({
	route,
	navigation,
}: StationDetailsScreenProps) => {
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [departureSelected, setDepartureSelected] = useState<boolean>(true);

	const dispatch = useAppDispatch();

	// TODO: Typescript
	const searchResult: SearchResult = useAppSelector(
		(state: any) => state.rtt.searchResult
	);
	const favouriteStations: string[] = useAppSelector(
		(state: any) => state.favourites.favouriteStations
	);

	const onRefresh = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(rttActions.getStationDepartures(route.params.crsCode));
		setIsRefreshing(false);
	}, [setIsRefreshing, dispatch]);

	const addToFavourites = useCallback(async () => {
		await dispatch(favouritesActions.addStation(searchResult.location.crs));
	}, [dispatch]);

	const removeFromFavourites = useCallback(async () => {
		await dispatch(
			favouritesActions.removeStation(searchResult.location.crs)
		);
	}, [dispatch]);

	const onDepartureSelected = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(rttActions.getStationDepartures(route.params.crsCode));
		setIsRefreshing(false);

		setDepartureSelected(true);
	}, [setDepartureSelected, dispatch, setIsRefreshing]);

	const onArrivalSelected = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(rttActions.getStationArrivals(route.params.crsCode));
		setIsRefreshing(false);

		setDepartureSelected(false);
	}, [setDepartureSelected, dispatch, setIsRefreshing]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			navigation.popToTop();
		});

		return unsubscribe;
	}, [navigation]);

	const serviceListItem = ({ item }) => (
		<ServiceCard
			name={departureSelected ? item.locationDetail.destination[0].description : item.locationDetail.origin[0].description}
			bookedTime={departureSelected ? item.locationDetail.gbttBookedDeparture : item.locationDetail.gbttBookedArrival}
			platformNumber={item.locationDetail.platform}
			realtime={departureSelected ? item.locationDetail.realtimeDeparture : item.locationDetail.realtimeArrival}
			departureSelected={departureSelected}
		/>
	);

	if (!searchResult) {
		return (
			<SafeAreaView>
				<Text>An Error Occurred</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Text style={styles.stationName}>
					{searchResult.location.name}
				</Text>
				<View style={styles.iconContainer}>
					<Ionicons
						name="return-down-back"
						size={wp("8%")}
						style={{ marginRight: wp("3%") }}
						onPress={navigation.popToTop}
					/>
					{favouriteStations.includes(searchResult.location.crs) ? (
						<Ionicons
							name="star"
							size={wp("8%")}
							onPress={removeFromFavourites}
							color="gold"
						/>
					) : (
						<Ionicons
							name="star-outline"
							size={wp("8%")}
							onPress={addToFavourites}
						/>
					)}
				</View>
			</View>
			<SearchToggle
				departuresSelected={departureSelected}
				onDepartureSelected={onDepartureSelected}
				onArrivalSelected={onArrivalSelected}
			/>
			<FlatList
				data={searchResult.services}
				renderItem={serviceListItem}
				keyExtractor={(item) => item.serviceUid}
				style={styles.flatlist}
				refreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		</SafeAreaView>
	);
};

export default StationDetailsScreen;
