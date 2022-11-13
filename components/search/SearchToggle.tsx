import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
	departuresSelected: boolean;
	onDepartureSelected: () => {};
	onArrivalSelected: () => {};
};

const SearchToggle = (props: Props) => {
	return (
		<View style={styles.toggleContainer}>
			<TouchableWithoutFeedback onPress={props.onDepartureSelected}>
				<View
					style={
						props.departuresSelected
							? [styles.toggleSelected, { marginRight: wp("2%") }]
							: [styles.toggle, { marginRight: wp("2%") }]
					}
				>
					<Text
						style={
							props.departuresSelected
								? styles.toggleTextSelected
								: styles.toggleText
						}
					>
						Departures
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={props.onArrivalSelected}>
				<View
					style={
						props.departuresSelected
							? styles.toggle
							: styles.toggleSelected
					}
				>
					<Text
						style={
							props.departuresSelected
								? styles.toggleText
								: styles.toggleTextSelected
						}
					>
						Arrivals
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	toggleContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: hp("2%"),
	},

	toggle: {
		borderRadius: 20,
		padding: wp("1%"),
		width: wp("25%"),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		backgroundColor: "white",
	},

	toggleSelected: {
		backgroundColor: "blue",
		borderRadius: 20,
		padding: wp("1%"),
		width: wp("25%"),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},

	toggleText: {
		color: "black",
		textAlign: "center",
	},

	toggleTextSelected: {
		color: "white",
		textAlign: "center",
	},
});

export default SearchToggle;
