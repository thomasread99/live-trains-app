import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
	name: string;
	bookedTime: string;
	platformNumber: string;
	realtime: string;
	departureSelected: boolean;
	onPress: () => void;
};

const ServiceCard = (props: Props) => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
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
						{props.bookedTime} {props.departureSelected ? "to" : "from"}{" "}
						{props.name}
					</Text>
					<Text>
						{props.realtime === props.bookedTime
							? "On Time"
							: `Expected ${props.realtime}`}
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
		</TouchableWithoutFeedback>
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
