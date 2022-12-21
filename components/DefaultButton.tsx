import React from "react";
import {
	Text,
	View,
	ViewStyle,
	TextStyle,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from "react-native";

type Props = {
	buttonContainer: ViewStyle;
	onPress: () => void;
	buttonTextContainer: ViewStyle;
	buttonText: TextStyle;
	text: string;
};

const DefaultButton = (props: Props) => {
	let TouchableComponent: typeof React.Component = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21)
		TouchableComponent = TouchableNativeFeedback;

	return (
		<View style={props.buttonContainer}>
			<TouchableComponent onPress={props.onPress}>
				<View style={props.buttonTextContainer}>
					<Text style={props.buttonText}>{props.text}</Text>
				</View>
			</TouchableComponent>
		</View>
	);
};

export default DefaultButton;
