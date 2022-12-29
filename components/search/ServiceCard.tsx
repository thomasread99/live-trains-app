import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import colours from "../../config/colours";

type Props = {
    name: string;
    bookedTime: string;
    platformNumber?: string;
    realtime?: string;
    departureSelected: boolean;
    onPress: () => void;
};

const ServiceCard = (props: Props) => {
    const timeDiff = props.realtime
        ? parseInt(props.realtime) - parseInt(props.bookedTime)
        : 0;

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.cardContainer}>
                <View style={styles.platformContainer}>
                    <Text style={styles.platformHeader}>PLATFORM</Text>
                    <Text style={styles.platformText}>
                        {props.platformNumber ?? "TBA"}
                    </Text>
                </View>
                <View style={styles.stationContainer}>
                    <Text style={styles.stationHeader}>
                        {props.departureSelected ? "TO" : "FROM"}
                    </Text>
                    <Text style={styles.stationText}>
                        {props.name.toUpperCase()}
                    </Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{props.bookedTime}</Text>
                    <View style={styles.line}></View>
                    {props.realtime ? (
                        <Text
                            style={[
                                styles.timeText,
                                {
                                    color:
                                        timeDiff === 0
                                            ? colours.white
                                            : timeDiff < 0
                                            ? colours.green
                                            : colours.red,
                                },
                            ]}
                        >
                            {props.realtime}
                        </Text>
                    ) : (
                        <Text
                            style={[
                                styles.timeText,
                                {
                                    color: colours.red,
                                },
                            ]}
                        >
                            N/A
                        </Text>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: hp("12%"),
        padding: wp("3%"),
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colours.card,
        marginBottom: hp("2%"),
        marginHorizontal: wp("5%"),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    platformContainer: { flex: 1, justifyContent: "center" },

    platformHeader: {
        textAlign: "center",
        fontFamily: "Light",
        color: colours.white,
        fontSize: wp("3%"),
    },

    platformText: {
        textAlign: "center",
        fontFamily: "Light",
        color: colours.white,
        fontSize: wp("7%"),
    },

    stationContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    stationHeader: {
        textAlign: "center",
        fontFamily: "Light",
        color: colours.white,
        fontSize: wp("3%"),
    },

    stationText: {
        textAlign: "center",
        fontFamily: "Light",
        color: colours.white,
        fontSize: wp("6%"),
    },

    timeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    timeText: {
        textAlign: "center",
        fontFamily: "Light",
        fontSize: wp("3%"),
        color: colours.white,
    },

    line: {
        borderWidth: 0.5,
        borderColor: colours.white,
        width: wp("8%"),
        marginVertical: hp("0.5%"),
    },
});

export default ServiceCard;
