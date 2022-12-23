import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import TrainSearchNavigator from "./StationSearchNavigation";
import FavouriteNavigator from "./FavouriteNavigator";

import colours from "../config/colours";

const Tab = createBottomTabNavigator();

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colours.blue,
        background: colours.background,
        card: colours.card,
        text: colours.white,
        border: colours.card,
    },
};

const MainNavigator = () => {
    return (
        <NavigationContainer theme={AppTheme}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: hp("8%"),
                    },
                    tabBarLabelStyle: {
                        fontSize: wp("3%"),
                        fontFamily: "Light",
                    },
                }}
            >
                <Tab.Screen
                    name="Search"
                    component={TrainSearchNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="search"
                                size={wp("8%")}
                                color={color}
                            />
                        ),
                        tabBarLabel: "SEARCH",
                    }}
                />
                <Tab.Screen
                    name="Favourites"
                    component={FavouriteNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                name="star"
                                size={wp("8%")}
                                color={color}
                            />
                        ),
                        tabBarLabel: "FAVOURITES",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
