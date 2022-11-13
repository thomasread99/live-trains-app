import React, { useCallback, useEffect, useState } from "react";
import { Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as favouritesActions from "../store/actions/favourites";

import styles from "../styles/FavouriteScreenStyles";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import crsCodes from "../data/crs-codes.json";

const FavouriteScreen = () => {
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

	useEffect(() => {
		setIsLoading(true);
		loadFavouriteStations();
		setIsLoading(false);
	}, []);

	const favouriteStationItem = ({ item }) => (
		<Text>{crsCodes.find((code) => code.id === item).title}</Text>
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
			<FlatList
				data={favouriteStations}
				renderItem={favouriteStationItem}
				keyExtractor={(item) => item}
			/>
		</SafeAreaView>
	);
};

export default FavouriteScreen;
