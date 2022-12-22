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

    errorText: {
        fontSize: wp("5%"),
        textAlign: "center",
        marginTop: hp("3%"),
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    trainOverview: {
        textAlign: "center",
        fontSize: wp("4%"),
        fontFamily: "Light",
        color: colours.white,
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
        marginBottom: hp("19%"),
    },
});
