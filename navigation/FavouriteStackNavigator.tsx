import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Moment } from "moment";

import FavouriteStationsScreen from "../screens/FavouriteStationsScreen";
import StationDetailsScreen from "../screens/StationDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";

export type FavouriteStackNavigatorParamList = {
	FavouriteScreen: undefined;
	StationDetailsScreen: {
		crsCode: string;
		toCrsCode?: string;
		date?: Moment;
		time?: Moment;
	};
	ServiceDetailsScreen: {
		serviceUid: string;
		crsCode: string;
		date: Moment;
	};
};

const Stack = createNativeStackNavigator<FavouriteStackNavigatorParamList>();

const FavouriteStackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="FavouriteScreen" component={FavouriteStationsScreen} />
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

export default FavouriteStackNavigator;