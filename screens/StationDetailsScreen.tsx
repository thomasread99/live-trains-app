import React, { useState, useCallback } from "react";
import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceCard from "../components/search/ServiceCard";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
		await dispatch(rttActions.searchStation(route.params.crsCode));
		setIsRefreshing(false);
	}, [setIsRefreshing, dispatch]);

	const addToFavourites = useCallback(async () => {
		await dispatch(favouritesActions.addStation(searchResult.location.crs));
	}, [dispatch]);

	const removeFromFavourites = useCallback(async () => {
		await dispatch(favouritesActions.removeStation(searchResult.location.crs));
	}, [dispatch]);

	const serviceListItem = ({ item }) => (
		<ServiceCard
			destinationName={item.locationDetail.destination[0].description}
			bookedDepartureTime={item.locationDetail.gbttBookedDeparture}
			platformNumber={item.locationDetail.platform}
			realtimeDeparture={item.locationDetail.realtimeDeparture}
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
				<View>
					<Text style={styles.stationName}>
						{searchResult.location.name}
					</Text>
					<Text>Departures</Text>
				</View>
				<View style={styles.iconContainer}>
					<Ionicons
						name="search"
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
