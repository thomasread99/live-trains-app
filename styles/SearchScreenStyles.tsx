import { StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
	autocompleteWrapper: {
		zIndex: 10,
	},

	autocompleteContainer: {
		marginTop: hp("15%"),
		marginHorizontal: wp("10%"),
	},

	inputContainer: {
		backgroundColor: "white",
	},

	buttonContainer: {
		zIndex: 9,
		backgroundColor: "blue",
		marginHorizontal: wp("10%"),
		marginTop: hp("5%"),
		height: hp("8%"),
		borderRadius: 5,
	},

	buttonTextContainer: {
		flex: 1,
		justifyContent: "center",
	},

	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: wp("6%"),
	},
});
