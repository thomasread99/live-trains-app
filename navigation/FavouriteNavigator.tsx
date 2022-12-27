import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FavouriteStackNavigator, {
    FavouriteJourneysStackNavigator,
} from "./FavouriteStackNavigators";

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
                component={FavouriteJourneysStackNavigator}
                options={{ title: "Journeys" }}
            />
        </TopTabs.Navigator>
    );
};

export default FavouriteNavigator;
