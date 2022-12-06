import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FavouriteStackNavigator from "./FavouriteStackNavigator";

const TopTabs = createMaterialTopTabNavigator();

const FavouriteNavigator = () => {
	return (
		<TopTabs.Navigator>
			<TopTabs.Screen
				name="FavouriteStationsScreen"
				component={FavouriteStackNavigator}
				options={{ title: "Stations" }}
			/>
			<TopTabs.Screen
				name="FavouriteJourneysScreen"
				component={FavouriteStackNavigator}
				options={{ title: "Journeys" }}
			/>
		</TopTabs.Navigator>
	);
};

export default FavouriteNavigator;
