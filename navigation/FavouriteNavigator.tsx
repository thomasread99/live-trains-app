import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StationDetailsScreen from "../screens/StationDetailsScreen";
import FavouriteScreen from "../screens/FavouriteScreen";

export type FavouriteNavigatorParamList = {
	FavouriteScreen: undefined;
	StationDetailsScreen: {
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
		</Stack.Navigator>
	);
};

export default FavouriteNavigator;
