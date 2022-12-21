import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";

type Props = {
    station: string;
    departed: boolean;
    arrived: boolean;
    bookedArrival?: string;
    bookedDeparture?: string;
    realtimeArrival?: string;
    realtimeDeparture?: string;
};

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

    const arrivalTimeDifference = props.realtimeArrival
        ? getTimeDifference(props.realtimeArrival, props.bookedArrival)
        : 0;
    const departureTimeDifference = props.realtimeDeparture
        ? getTimeDifference(props.realtimeDeparture, props.bookedDeparture)
        : 0;

    return (
        <View style={styles.row}>
            <View style={styles.description}>
                <View
                    style={[
                        styles.circle,
                        {
                            backgroundColor: props.departed
                                ? "green"
                                : props.arrived
                                ? "blue"
                                : "red",
                        },
                    ]}
                ></View>
                <Text>{props.station}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>
                    {props.bookedArrival ?? "---"}
                </Text>
                <Text style={{ textAlign: "center", color: "blue" }}>
                    {props.realtimeArrival ?? "---"}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color:
                            props.realtimeArrival && arrivalTimeDifference > 0
                                ? "red"
                                : "black",
                    }}
                >
                    {props.realtimeArrival && arrivalTimeDifference >= 0
                        ? " + "
                        : ""}
                    {props.realtimeArrival
                        ? arrivalTimeDifference < 0
                            ? arrivalTimeDifference
                                  .toString()
                                  .split("")
                                  .join(" ")
                            : arrivalTimeDifference
                        : ""}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center" }}>
                    {props.bookedDeparture ?? "---"}
                </Text>
                <Text style={{ textAlign: "center", color: "blue" }}>
                    {props.realtimeDeparture ?? "---"}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color:
                            props.realtimeDeparture &&
                            departureTimeDifference > 0
                                ? "red"
                                : "black",
                    }}
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
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        borderTopWidth: 1,
        paddingVertical: hp("2%"),
        paddingLeft: wp("5%"),
        flexDirection: "row",
        alignItems: "center",
    },

    description: {
        flex: 4,
        flexDirection: "row",
        marginRight: wp("1%"),
    },

    circle: {
        width: wp("5%"),
        height: wp("5%"),
        borderRadius: 100,
        marginRight: wp("2%"),
    },
});

export default ServiceRow;
