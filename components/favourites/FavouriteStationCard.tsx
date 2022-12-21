import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    stationName: string;
    crsCode: string;
    onPress: (crsCode: string) => void;
};

const FavouriteStationCard = (props: Props) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.onPress(props.crsCode)}>
            <View style={styles.cardContainer}>
                <Text style={styles.stationText}>{props.stationName}</Text>
                <Ionicons name="arrow-forward" size={wp("8%")} />
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
        backgroundColor: "white",
        marginVertical: hp("1%"),
        marginHorizontal: wp("3%"),
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    stationText: {
        fontSize: wp("5%"),
    },
});

export default FavouriteStationCard;
