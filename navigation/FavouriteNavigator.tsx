import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavouriteJourneysScreen from "../screens/FavouriteJourneysScreen";

import FavouriteStackNavigator from "./FavouriteStackNavigators";

const TopTabs = createMaterialTopTabNavigator();

const FavouriteNavigator = () => {
	return (
		<TopTabs.Navigator>
			<TopTabs.Screen
				name="FavouriteStations"
				component={FavouriteStackNavigator}
				options={{ title: "Stations" }}
			/>
			<TopTabs.Screen
				name="FavouriteJourneys"
				component={FavouriteJourneysScreen}
				options={{ title: "Journeys" }}
			/>
		</TopTabs.Navigator>
	);
};

export default FavouriteNavigator;
