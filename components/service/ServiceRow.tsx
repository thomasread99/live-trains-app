import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

import colours from "../../config/colours";

type Props = {
    station: string;
    departed: boolean;
    arrived: boolean;
    bookedArrival?: string;
    bookedDeparture?: string;
    realtimeArrival?: string;
    realtimeDeparture?: string;
};

// ! BUG: If the time difference is double figures it will add a space
const ServiceRow = (props: Props) => {
    // ! BUG: Something causes the substring values to be wrong
    const getTimeDifference = (firstTime: string, secondTime: string) => {
        var firstDate = moment();
        var secondDate = firstDate;

        const firstHours = +firstTime.substring(0, 2);
        const firstMinutes = +firstTime.substring(2, 4);
        const secondHours = +secondTime.substring(0, 2);
        const secondMinutes = +secondTime.substring(2, 4);

        firstDate = moment(firstDate).add(firstHours, "hours");
        firstDate = moment(firstDate).add(firstMinutes, "minutes");
        secondDate = moment(secondDate).add(secondHours, "hours");
        secondDate = moment(secondDate).add(secondMinutes, "minutes");

        const duration = moment.duration(firstDate.diff(secondDate));
        return duration.asMinutes();
    };

    const departureTimeDifference = props.realtimeDeparture
        ? getTimeDifference(props.realtimeDeparture, props.bookedDeparture)
        : 0;

    return (
        <LinearGradient
            colors={[
                props.departed
                    ? colours.green
                    : props.arrived
                    ? colours.blue
                    : colours.red,
                "transparent",
            ]}
            style={styles.row}
            end={[0.2, 0]}
        >
            <View style={styles.description}>
                <Text style={styles.stationName}>
                    {props.station.toUpperCase()}
                </Text>
            </View>

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {props.bookedArrival ?? "---"}
                </Text>
                <View style={styles.line}></View>
                <Text style={styles.realtimeText}>
                    {props.realtimeArrival ?? "---"}
                </Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {props.bookedDeparture ?? "---"}
                </Text>
                <View style={styles.line}></View>
                <Text style={styles.realtimeText}>
                    {props.realtimeDeparture ?? "---"}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.timeDifferenceText,
                        {
                            color:
                                props.realtimeArrival &&
                                departureTimeDifference > 0
                                    ? colours.red
                                    : departureTimeDifference < 0
                                    ? colours.green
                                    : colours.white,
                        },
                    ]}
                >
                    {props.realtimeDeparture && departureTimeDifference >= 0
                        ? " + "
                        : ""}
                    {props.realtimeDeparture
                        ? departureTimeDifference < 0
                            ? departureTimeDifference
                                  .toString()
                                  .split("")
                                  .join(" ")
                            : departureTimeDifference
                        : ""}
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    row: {
        paddingVertical: hp("3%"),
        paddingLeft: wp("5%"),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colours.card,
        marginBottom: hp("2%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: hp("13%")
    },

    description: {
        flex: 4,
        flexDirection: "row",
        marginRight: wp("1%"),
    },

    stationName: {
        color: colours.white,
        fontFamily: "Light",
        fontSize: wp("6%"),
    },

    timeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    timeText: {
        color: colours.white,
        fontFamily: "Light",
    },

    line: {
        borderWidth: 0.5,
        borderColor: colours.white,
        width: wp("8%"),
        marginVertical: hp("0.5%"),
    },

    realtimeText: {
        color: colours.blue,
        fontFamily: "Light",
    },

    timeDifferenceText: {
        fontFamily: "Light",
    },
});

export default ServiceRow;
