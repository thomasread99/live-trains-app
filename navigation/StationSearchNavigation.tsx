import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/SearchScreen";
import StationDetailsScreen from "../screens/StationDetailsScreen";

export type TrainSearchNavigatorParamList = {
	SearchScreen: undefined;
	StationDetailsScreen: {
		crsCode: string;
	};
};

const Stack = createNativeStackNavigator<TrainSearchNavigatorParamList>();

const TrainSearchNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="SearchScreen" component={SearchScreen} />
			<Stack.Screen
				name="StationDetailsScreen"
				component={StationDetailsScreen}
			/>
		</Stack.Navigator>
	);
};

export default TrainSearchNavigator;
