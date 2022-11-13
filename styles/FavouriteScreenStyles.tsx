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

	title: {
		marginTop: hp("1%"),
		marginLeft: wp("4%"),
		fontSize: wp("8%")
	},
});
