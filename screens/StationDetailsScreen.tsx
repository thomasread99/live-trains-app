import React, { useState, useCallback, useEffect } from "react";
import {
	Text,
	FlatList,
	View,
	ActivityIndicator,
	ListRenderItemInfo,
} from "react-native";
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
import { StationSearchNavigatorParamList } from "../navigation/StationSearchNavigation";

type StationDetailsScreenProps = NativeStackScreenProps<
	StationSearchNavigatorParamList,
	"StationDetailsScreen"
>;

const StationDetailsScreen = ({
	route,
	navigation,
}: StationDetailsScreenProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [departureSelected, setDepartureSelected] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const searchResult: SearchResult = useAppSelector(
		(state: any) => state.rtt.searchResult
	);
	const favouriteStations: string[] = useAppSelector(
		(state: any) => state.favourites.favouriteStations
	);

	const onRefresh = useCallback(async () => {
		setIsRefreshing(true);
		if (departureSelected)
			await dispatch(
				rttActions.getStationDepartures(
					route.params.crsCode,
					route.params.date,
					route.params.time,
					route.params.toCrsCode
				)
			);
		else
			await dispatch(
				rttActions.getStationArrivals(
					route.params.crsCode,
					route.params.date,
					route.params.time,
					route.params.toCrsCode
				)
			);
		setIsRefreshing(false);
	}, [setIsRefreshing, dispatch]);

	const addToFavourites = useCallback(async () => {
		await dispatch(favouritesActions.addStation(route.params.crsCode));
	}, [dispatch]);

	const removeFromFavourites = useCallback(async () => {
		await dispatch(favouritesActions.removeStation(route.params.crsCode));
	}, [dispatch]);

	const onDepartureSelected = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(
			rttActions.getStationDepartures(
				route.params.crsCode,
				route.params.date,
				route.params.time,
				route.params.toCrsCode
			)
		);
		setIsRefreshing(false);

		setDepartureSelected(true);
	}, [setDepartureSelected, dispatch, setIsRefreshing]);

	const onArrivalSelected = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(
			rttActions.getStationArrivals(
				route.params.crsCode,
				route.params.date,
				route.params.time,
				route.params.toCrsCode
			)
		);
		setIsRefreshing(false);

		setDepartureSelected(false);
	}, [setDepartureSelected, dispatch, setIsRefreshing]);

	const loadStationDetails = useCallback(async () => {
		await dispatch(
			rttActions.getStationDepartures(
				route.params.crsCode,
				route.params.date,
				route.params.time,
				route.params.toCrsCode
			)
		);
	}, [dispatch]);

	const loadFavouriteStations = useCallback(async () => {
		await dispatch(favouritesActions.getFavouriteStations());
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadFavouriteStations();
		loadStationDetails()
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);
			});
	}, []);

	const serviceListItem = ({
		item,
	}: ListRenderItemInfo<LocationContainer>) => (
		<ServiceCard
			name={
				departureSelected
					? item.locationDetail.destination[0].description
					: item.locationDetail.origin[0].description
			}
			bookedTime={
				departureSelected
					? item.locationDetail.gbttBookedDeparture
					: item.locationDetail.gbttBookedArrival
			}
			platformNumber={item.locationDetail.platform}
			realtime={
				departureSelected
					? item.locationDetail.realtimeDeparture
					: item.locationDetail.realtimeArrival
			}
			departureSelected={departureSelected}
			onPress={() =>
				navigation.navigate("ServiceDetailsScreen", {
					serviceUid: item.serviceUid,
					crsCode: route.params.crsCode,
					date: route.params.date,
				})
			}
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
					{favouriteStations.includes(route.params.crsCode) ? (
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
			{isError || !searchResult || !searchResult.services ? (
				<Text style={styles.errorText}>No Services Found</Text>
			) : (
				<FlatList
					data={searchResult.services}
					renderItem={serviceListItem}
					keyExtractor={(item) => item.serviceUid}
					style={styles.flatlist}
					refreshing={isRefreshing}
					onRefresh={onRefresh}
				/>
			)}
		</SafeAreaView>
	);
};

export default StationDetailsScreen;
