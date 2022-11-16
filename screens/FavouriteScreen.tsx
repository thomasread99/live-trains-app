import React, { useCallback, useEffect, useState } from "react";
import { Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import FavouriteCard from "../components/favourites/FavouriteCard";

import * as favouritesActions from "../store/actions/favourites";
import * as rttActions from "../store/actions/rtt";

import styles from "../styles/FavouriteScreenStyles";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FavouriteNavigatorParamList } from "../navigation/FavouriteNavigator";

import crsCodes from "../data/crs-codes.json";

type FavouriteScreenProps = NativeStackScreenProps<
	FavouriteNavigatorParamList,
	"FavouriteScreen"
>;

const FavouriteScreen = ({ navigation }: FavouriteScreenProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const dispatch = useAppDispatch();

	const favouriteStations: string[] = useAppSelector(
		(state: any) => state.favourites.favouriteStations
	);

	const loadFavouriteStations = useCallback(async () => {
		try {
			await dispatch(favouritesActions.getFavouriteStations());
		} catch {
			setError("There was an error loading your favourite stations");
		}
	}, [dispatch, setError]);

	const onFavouriteStationPress = async (crsCode: string) => {
		navigation.navigate("StationDetailsScreen", {
			crsCode: crsCode,
		});
	};

	useEffect(() => {
		setIsLoading(true);
		loadFavouriteStations();
		setIsLoading(false);
	}, []);

	const favouriteStationItem = ({ item }) => (
		<FavouriteCard
			stationName={crsCodes.find((code) => code.id === item).title}
			crsCode={item}
			onPress={onFavouriteStationPress}
		/>
	);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.centered}>
				<ActivityIndicator size="large" color={"lightblue"} />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={styles.centered}>
				<Text>{error}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<Text style={styles.title}>Favourite Stations</Text>
			<FlatList
				data={favouriteStations}
				renderItem={favouriteStationItem}
				keyExtractor={(item) => item}
			/>
		</SafeAreaView>
	);
};

export default FavouriteScreen;
