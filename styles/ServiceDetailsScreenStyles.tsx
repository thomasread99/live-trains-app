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

	trainOverview: {
		textAlign: "center",
		fontSize: wp("4%"),
		marginBottom: hp("2%")
	},

	arrivingHeader: {
		textAlign: "center",
		fontSize: wp("4%")
	},

	realtimeArrival: {
		textAlign: "center",
		fontSize: wp("10%"),
		color: "blue"
	},

	flatlist: {
		marginBottom: hp("19%"),
	},
});
