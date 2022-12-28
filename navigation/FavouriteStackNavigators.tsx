import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Moment } from "moment";

import FavouriteStationsScreen from "../screens/FavouriteStationsScreen";
import StationDetailsScreen from "../screens/StationDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";
import FavouriteJourneysScreen from "../screens/FavouriteJourneysScreen";

export type FavouriteStationsStackNavigatorParamList = {
    FavouriteStationsScreen: undefined;
    StationDetailsScreen: {
        crsCode: string;
        stationName: string;
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

export type FavouriteJourneysStackNavigatorParamList = {
    FavouriteJourneysScreen: undefined;
    ServiceDetailsScreen: {
        serviceUid: string;
        crsCode: string;
        date: Moment;
    };
};

const FavouriteStationsStack =
    createNativeStackNavigator<FavouriteStationsStackNavigatorParamList>();
const FavouriteJourneysStack =
    createNativeStackNavigator<FavouriteJourneysStackNavigatorParamList>();

const FavouriteStationsStackNavigator = () => {
    return (
        <FavouriteStationsStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <FavouriteStationsStack.Screen
                name="FavouriteStationsScreen"
                component={FavouriteStationsScreen}
            />
            <FavouriteStationsStack.Screen
                name="StationDetailsScreen"
                component={StationDetailsScreen}
            />
            <FavouriteStationsStack.Screen
                name="ServiceDetailsScreen"
                component={ServiceDetailsScreen}
            />
        </FavouriteStationsStack.Navigator>
    );
};

export const FavouriteJourneysStackNavigator = () => {
    return (
        <FavouriteJourneysStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <FavouriteJourneysStack.Screen
                name="FavouriteJourneysScreen"
                component={FavouriteJourneysScreen}
            />
            <FavouriteJourneysStack.Screen
                name="ServiceDetailsScreen"
                component={ServiceDetailsScreen}
            />
        </FavouriteJourneysStack.Navigator>
    );
};

export default FavouriteStationsStackNavigator;
