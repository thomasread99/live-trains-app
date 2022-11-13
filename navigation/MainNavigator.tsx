import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import TrainSearchNavigator from "./StationSearchNavigation";
import FavouriteScreen from "../screens/FavouriteScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height: hp("8%"),
					},
					tabBarLabelStyle: {
						fontSize: wp("4%"),
					},
				}}
			>
				<Tab.Screen
					name="Search"
					component={TrainSearchNavigator}
					options={{
						tabBarIcon: ({ color }) => (
							<Ionicons
								name="search"
								size={wp("8%")}
								color={color}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Favourites"
					component={FavouriteScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<Ionicons
								name="star"
								size={wp("8%")}
								color={color}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigator;
