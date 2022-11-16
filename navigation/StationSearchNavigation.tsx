import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/SearchScreen";
import StationDetailsScreen from "../screens/StationDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";

export type StationSearchNavigatorParamList = {
	SearchScreen: undefined;
	StationDetailsScreen: {
		crsCode: string;
	};
	ServiceDetailsScreen: {
		serviceUid: string;
	};
};

const Stack = createNativeStackNavigator<StationSearchNavigatorParamList>();

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
			<Stack.Screen
				name="ServiceDetailsScreen"
				component={ServiceDetailsScreen}
			/>
		</Stack.Navigator>
	);
};

export default TrainSearchNavigator;
