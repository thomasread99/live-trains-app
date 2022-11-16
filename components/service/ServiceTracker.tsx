import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
	origin: string;
    originTime: string;
	destination: string;
    destinationTime: string;
    station: string;
    arrived: boolean;
    departed: boolean;
};

const ServiceTracker = (props: Props) => {
	return (
		<View style={styles.trackerContainer}>
			{/* Left Column */}
			<View>
				<View style={styles.diagramContainer}>
					<View style={styles.stationPoint}></View>
					<View style={styles.stationConnector}></View>
                    <View style={[styles.stationConnector, {  backgroundColor: !props.arrived ? "grey" : "blue"}]}></View>
					<View style={styles.stationPoint}></View>
					<View style={[styles.stationConnector, {  backgroundColor: !props.departed ? "grey" : "blue"}]}></View>
                    <View style={[styles.stationConnector, {  backgroundColor: "grey"}]}></View>
					<View style={styles.stationPoint}></View>
				</View>
			</View>

			{/* Right Column */}
			<View style={styles.rightColumn}>
				<Text>{props.origin} - {props.originTime}</Text>
				<View style={styles.lineBreak}></View>
				<Text>{props.station}</Text>
				<View style={styles.lineBreak}></View>
				<Text>{props.destination} - {props.destinationTime}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    trackerContainer: {
		flexDirection: "row",
        marginLeft: wp("5%")
	},

	diagramContainer: {
		flex: 1,
		alignItems: "center",
	},	

	stationPoint: {
		backgroundColor: "red",
		width: wp("5%"),
		height: wp("5%"),
		borderRadius: 100,
	},

	stationConnector: {
		backgroundColor: "blue",
		width: wp("2%"),
		height: hp("5%"),
	},

    rightColumn: {
        marginLeft: wp("2%")
    },

    lineBreak: {
        height: hp("10.25%")
    }
});

export default ServiceTracker;
