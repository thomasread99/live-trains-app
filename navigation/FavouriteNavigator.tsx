import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavouriteScreen from "../screens/FavouriteScreen";
import StationDetailsScreen from "../screens/StationDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";

export type FavouriteNavigatorParamList = {
	FavouriteScreen: undefined;
	StationDetailsScreen: {
		crsCode: string;
	};
	ServiceDetailsScreen: {
		serviceUid: string;
		crsCode: string;
	};
};

const Stack = createNativeStackNavigator();

const FavouriteNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
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

export default FavouriteNavigator;
