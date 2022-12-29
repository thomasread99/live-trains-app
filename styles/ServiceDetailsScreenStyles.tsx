import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import colours from "../config/colours";

export default StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        flex: 1,
    },

    errorText: {
        fontSize: wp("5%"),
        textAlign: "center",
        marginTop: hp("10%"),
        fontFamily: "Light",
        color: colours.white,
    },

    backButton: {
        position: "absolute",
        bottom: hp("3%"),
        zIndex: 1,
        right: wp("5%"),
        backgroundColor: colours.blue,
        width: wp("15%"),
        height: wp("15%"),
        borderRadius: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        marginHorizontal: wp("5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2%"),
        marginTop: hp("1%"),
    },

    stationNameContainer: {
        maxWidth: wp("80%"),
    },

    stationName: {
        fontSize: wp("8%"),
        fontFamily: "Light",
        color: colours.white,
        marginRight: wp("1%"),
    },

    iconContainer: {
        flexDirection: "row",
    },

    serviceDetails: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    arrivingHeader: {
        textAlign: "center",
        fontSize: wp("4%"),
        fontFamily: "Light",
        color: colours.white,
    },

    realtimeArrival: {
        textAlign: "center",
        fontSize: wp("10%"),
        fontFamily: "Light",
        color: colours.white,
    },

    flatlist: {
        paddingBottom: hp("10%"),
    },
});
