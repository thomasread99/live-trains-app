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

	errorText: {
		fontSize: wp("5%"),
		textAlign: "center",
		marginTop: hp("3%"),
	},

	header: {
		margin: wp("3%"),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: hp("2%"),
	},

	headerText: {
		fontSize: wp("4%"),
	},	

	iconContainer: {
		flexDirection: "row",
	},

	trainOverview: {
		textAlign: "center",
		fontSize: wp("4%"),
		marginBottom: hp("2%"),
	},

	arrivingHeader: {
		textAlign: "center",
		fontSize: wp("4%"),
	},

	realtimeArrival: {
		textAlign: "center",
		fontSize: wp("10%"),
		color: "blue",
	},

	flatlist: {
		marginBottom: hp("19%"),
	},
});
