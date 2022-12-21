import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import colours from "../config/colours";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginVertical: hp("5%"),
    },

    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    autocompleteWrapper: {
        zIndex: 10,
    },
    autocompleteWrapper: {
        zIndex: 10,
    },

    autocompleteContainer: {
        marginHorizontal: wp("10%"),
    },

    toAutocompleteContainer: {
        marginTop: hp("2%"),
        marginHorizontal: wp("10%"),
    },

    inputContainer: {
        backgroundColor: colours.card,
        borderWidth: 1,
        borderColor: colours.blue,
    },

    suggestionListContainer: {
        backgroundColor: colours.card,
        color: colours.blue,
    },

    suggestionListText: {
        fontFamily: "Light",
        color: colours.blue,
    },

    inputText: {
        fontSize: wp("6%"),
        fontFamily: "Light",
        color: colours.blue,
    },

	dateTimePickerContainer: {
		flexDirection: "row",
		marginHorizontal: wp("10%"),
		marginTop: hp("2%"),
		justifyContent: "space-between",
	},

    buttonContainer: {
        zIndex: 9,
        backgroundColor: colours.blue,
        marginHorizontal: wp("10%"),
        marginTop: hp("5%"),
        height: hp("8%"),
        borderRadius: 5,
    },

    buttonTextContainer: {
        flex: 1,
        justifyContent: "center",
    },
    buttonTextContainer: {
        flex: 1,
        justifyContent: "center",
    },

    buttonText: {
        textAlign: "center",
        color: colours.white,
        fontSize: wp("6%"),
        fontFamily: "Light",
    },
});
