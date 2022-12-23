import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";

import { FavouriteJourney } from "../../models/FavouriteJourney";

import colours from "../../config/colours";

type Props = {
    journey: FavouriteJourney;
    onPress: (journey: FavouriteJourney) => void;
};

const FavouriteJourneyCard = (props: Props) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.onPress(props.journey)}>
            <View style={styles.cardContainer}>
                <View>
                    <Text style={styles.stationText} numberOfLines={1}>
                        {props.journey.description.toUpperCase()}
                    </Text>
                    <Text style={styles.dateText}>
                        {moment(props.journey.date).format("DD/MM/YYYY")}
                    </Text>
                </View>
                <Ionicons name="arrow-forward" size={wp("8%")} color={colours.white}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: wp("3%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: colours.card,
        marginVertical: hp("1%"),
        marginHorizontal: wp("3%"),
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    stationText: {
        fontSize: wp("5%"),
        color: colours.white,
        fontFamily: "Light",
        width: wp("75%"),
    },

    dateText: {
        color: colours.white,
        fontFamily: "Light",
        width: wp("75%"),
    },
});

export default FavouriteJourneyCard;
