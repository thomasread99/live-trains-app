import React, { useState, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AutocompleteDropdown,
	TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import DefaultButton from "../components/DefaultButton";

import * as rttActions from "../store/actions/rtt";

import styles from "../styles/SearchScreenStyles";

import { useAppDispatch } from "../store/hooks";
import { TrainSearchNavigatorParamList } from "../navigation/StationSearchNavigation";

import crsCodes from "../data/crs-codes.json";

type SearchScreenProps = NativeStackScreenProps<
	TrainSearchNavigatorParamList,
	"SearchScreen"
>;

const StartScreen = ({ navigation }: SearchScreenProps) => {
	const [selectedStation, setSelectedStation] =
		useState<TAutocompleteDropdownItem>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const loadSearch = useCallback(
		async (crsCode: string) => {
			await dispatch(rttActions.getStationDepartures(crsCode));
		},
		[dispatch]
	);

	const searchStation = async () => {
		if (selectedStation === null) return;

		setIsLoading(true);
		try {
			await loadSearch(selectedStation.id);
		} catch {}
		navigation.navigate("StationDetailsScreen", {
			crsCode: selectedStation.id,
		});
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<SafeAreaView style={styles.centered}>
				<ActivityIndicator size="large" color={"lightblue"} />
			</SafeAreaView>
		);
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
							fontSize: wp("6%"),
						},
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
