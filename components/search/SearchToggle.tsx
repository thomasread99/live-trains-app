import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import colours from "../../config/colours";

type Props = {
    departuresSelected: boolean;
    onDepartureSelected: () => {};
    onArrivalSelected: () => {};
};

const SearchToggle = (props: Props) => {
    return (
        <View style={styles.toggleContainer}>
            <TouchableWithoutFeedback onPress={props.onDepartureSelected}>
                <View
                    style={
                        props.departuresSelected
                            ? [styles.toggleSelected, { marginRight: wp("2%") }]
                            : [styles.toggle, { marginRight: wp("2%") }]
                    }
                >
                    <Text style={styles.toggleText}>DEPARTURES</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={props.onArrivalSelected}>
                <View
                    style={
                        props.departuresSelected
                            ? styles.toggle
                            : styles.toggleSelected
                    }
                >
                    <Text style={styles.toggleText}>ARRIVALS</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: hp("2%"),
    },

    toggle: {
        backgroundColor: colours.background,
        borderRadius: 20,
        padding: wp("1%"),
        width: wp("25%"),
    },

    toggleSelected: {
        backgroundColor: colours.blue,
        borderRadius: 20,
        padding: wp("1%"),
        width: wp("25%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    toggleText: {
        color: colours.white,
        textAlign: "center",
        fontFamily: "Light",
        fontSize: wp("3%"),
    },
});

export default SearchToggle;
