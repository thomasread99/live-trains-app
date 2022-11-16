import { StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	header: {
		margin: wp("3%"),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	// TODO: Dynamic sizing to prevent multiple lines
	stationName: {
		fontSize: wp("10%"),
	},

	iconContainer: {
		flexDirection: "row",
	},

	flatlist: {
		marginBottom: hp("15%"),
	},
});
