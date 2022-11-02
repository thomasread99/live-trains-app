import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
	destinationName: string;
	bookedDepartureTime: number;
	platformNumber: number;
	realtimeDeparture: number;
};

const ServiceCard = (props: Props) => {
	return (
		<View style={styles.cardContainer}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text style={{ textAlign: "center" }}>Platform</Text>
				<Text style={{ textAlign: "center", fontSize: wp("5%") }}>
					{props.platformNumber}
				</Text>
			</View>
			<View
				style={{
					flex: 3,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text>
					{props.bookedDepartureTime} to {props.destinationName}
				</Text>
				<Text>
					{props.realtimeDeparture === props.bookedDepartureTime
						? "On Time"
						: `Expected ${props.realtimeDeparture}`}
				</Text>
			</View>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Ionicons
					name="arrow-forward"
					size={wp("8%")}
					style={{ textAlign: "right" }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		borderTopWidth: 1,
		borderColor: "black",
		padding: wp("3%"),
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default ServiceCard;
