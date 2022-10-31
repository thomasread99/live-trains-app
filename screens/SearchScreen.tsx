import React, { useState, useEffect, useCallback } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as rttActions from "../store/actions/rtt";

import { useAppDispatch, useAppSelector } from "../store/hooks";

const StartScreen = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	// TODO: Typescript
	const strSearchResult: SearchResult = useAppSelector(
		(state: any) => state.rtt.searchResult
	);

	const dispatch = useAppDispatch();

	const loadSearch = useCallback(async () => {
		await dispatch(rttActions.searchStation());
	}, [dispatch]);

	useEffect(() => {
		const fetchTrainData = async () => {
			setIsLoading(true);
			try {
				await loadSearch();
			} catch {
				setError("An Error Occurred");
			}
			setIsLoading(false);
		};

		fetchTrainData();
	}, []);

	if (isLoading) {
		return (
			<SafeAreaView>
				<ActivityIndicator size="large" />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView>
				<Text>{error}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<Text>{strSearchResult.location.name}</Text>
		</SafeAreaView>
	);
};

export default StartScreen;
