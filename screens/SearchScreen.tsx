import React, { useState } from "react";
import { View } from "react-native";
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
import moment, { Moment } from "moment";

import DefaultButton from "../components/DefaultButton";
import CustomDateTimePicker from "../components/search/CustomDateTimePicker";

import styles from "../styles/SearchScreenStyles";

import { StationSearchNavigatorParamList } from "../navigation/StationSearchNavigation";

import crsCodes from "../data/crs-codes.json";

type SearchScreenProps = NativeStackScreenProps<
    StationSearchNavigatorParamList,
    "SearchScreen"
>;

const StartScreen = ({ navigation }: SearchScreenProps) => {
    const [selectedStation, setSelectedStation] =
        useState<TAutocompleteDropdownItem>(null);
    const [selectedToStation, setSelectedToStation] =
        useState<TAutocompleteDropdownItem>(null);
    const [selectedMomentDate, setSelectedMomentDate] = useState<Moment | null>(
        null,
    );
    const [selectedMomentTime, setSelectedMomentTime] = useState<Moment | null>(
        null,
    );

    const onDateSelected = (selectedDate: Date) => {
        setSelectedMomentDate(moment(selectedDate));
    };

    const onTimeSelected = (selectedTime: Date) => {
        setSelectedMomentTime(moment(selectedTime));
    };

    const searchStation = async () => {
        if (selectedStation === null) return;

        navigation.navigate("StationDetailsScreen", {
            crsCode: selectedStation.id,
            toCrsCode: selectedToStation?.id,
            date: selectedMomentDate,
            time: selectedMomentTime,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.autocompleteWrapper}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        onSelectItem={setSelectedStation}
                        dataSet={crsCodes}
                        containerStyle={styles.autocompleteContainer}
                        inputContainerStyle={styles.inputContainer}
                        inputHeight={hp("8%")}
                        suggestionsListContainerStyle={
                            styles.suggestionListContainer
                        }
                        suggestionsListTextStyle={styles.suggestionListText}
                        textInputProps={{
                            placeholder: "FROM",
                            style: styles.inputText,
                            placeholderTextColor: "rgba(64, 120, 153, 0.5)",
                        }}
                        ItemSeparatorComponent={<View style={{ height: 0 }} />}
                    />
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        onSelectItem={setSelectedToStation}
                        dataSet={crsCodes}
                        containerStyle={styles.toAutocompleteContainer}
                        inputContainerStyle={styles.inputContainer}
                        inputHeight={hp("8%")}
                        suggestionsListContainerStyle={
                            styles.suggestionListContainer
                        }
                        suggestionsListTextStyle={styles.suggestionListText}
                        textInputProps={{
                            placeholder: "TO",
                            style: styles.inputText,
                            placeholderTextColor: "rgba(64, 120, 153, 0.5)",
                        }}
                        ItemSeparatorComponent={<View style={{ height: 0 }} />}
                    />
                </View>

				<View style={styles.dateTimePickerContainer}>
					<CustomDateTimePicker
						onDateSelected={onDateSelected}
						mode={"date"}
					/>
					<CustomDateTimePicker
						onDateSelected={onTimeSelected}
						mode={"time"}
					/>
				</View>                
            </View>

            <View>
                <DefaultButton
                    buttonContainer={styles.buttonContainer}
                    onPress={searchStation}
                    buttonTextContainer={styles.buttonTextContainer}
                    buttonText={styles.buttonText}
                    text={"SEARCH"}
                />
            </View>
        </SafeAreaView>
    );
};

export default StartScreen;
