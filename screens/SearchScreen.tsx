import React, { useState, useEffect, useCallback } from "react";
import { Text, ActivityIndicator, FlatList, View, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import crsCodes from "../data/crs-codes.json";
import { AutocompleteDropdown, TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DefaultButton from "../components/DefaultButton";

import * as rttActions from "../store/actions/rtt";

import styles from "../styles/SearchScreenStyles";

import { useAppDispatch, useAppSelector } from "../store/hooks";

const StartScreen = () => {
	const [selectedStation, setSelectedStation] = useState<TAutocompleteDropdownItem>(null);
	// const [isLoading, setIsLoading] = useState<boolean>(true);
	// const [error, setError] = useState<string>();

	// // TODO: Typescript
	// const strSearchResult: SearchResult = useAppSelector(
	// 	(state: any) => state.rtt.searchResult
	// );

	// const dispatch = useAppDispatch();

	// const loadSearch = useCallback(async () => {
	// 	await dispatch(rttActions.searchStation());
	// }, [dispatch]);

	// useEffect(() => {
	// 	const fetchTrainData = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			await loadSearch();
	// 		} catch {
	// 			setError("An Error Occurred");
	// 		}
	// 		setIsLoading(false);
	// 	};

	// 	fetchTrainData();
	// }, []);

	// if (isLoading) {
	// 	return (
	// 		<SafeAreaView>
	// 			<ActivityIndicator size="large" />
	// 		</SafeAreaView>
	// 	);
	// }

	// if (error) {
	// 	return (
	// 		<SafeAreaView>
	// 			<Text>{error}</Text>
	// 		</SafeAreaView>
	// 	);
	// }

	const searchStation = () => {
		console.log(selectedStation.id);
	}

	return (
		<SafeAreaView>
			<View style={styles.autocompleteWrapper}>
				<AutocompleteDropdown
					clearOnFocus={false}
					closeOnBlur={true}
					onSelectItem={setSelectedStation}
					dataSet={crsCodes}
					containerStyle={styles.autocompleteContainer}
					inputContainerStyle={styles.inputContainer}
					inputHeight={hp("8%")}
					textInputProps={{
						placeholder: "Station Name",
						style: {
							fontSize: wp("6%")
						}
					}}
				/>
			</View>
			<DefaultButton 
				buttonContainer={styles.buttonContainer}
				onPress={searchStation}
				buttonTextContainer={styles.buttonTextContainer}
				buttonText={styles.buttonText}
				text={"Search"}
			/>
		</SafeAreaView>
	);
};

export default StartScreen;
