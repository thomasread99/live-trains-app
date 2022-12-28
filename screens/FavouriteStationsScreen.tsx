import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import FavouriteStationCard from "../components/favourites/FavouriteStationCard";

import * as favouritesActions from "../store/actions/favourites";

import styles from "../styles/FavouriteStationsScreenStyles";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FavouriteStationsStackNavigatorParamList } from "../navigation/FavouriteStackNavigators";

import crsCodes from "../data/crs-codes.json";
import moment from "moment";

type FavouriteStationsScreenProps = NativeStackScreenProps<
    FavouriteStationsStackNavigatorParamList,
    "FavouriteStationsScreen"
>;

const FavouriteStationsScreen = ({
    navigation,
}: FavouriteStationsScreenProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const dispatch = useAppDispatch();

    const favouriteStations: string[] = useAppSelector(
        (state: any) => state.favourites.favouriteStations,
    );

    const loadFavouriteStations = useCallback(async () => {
        try {
            await dispatch(favouritesActions.getFavouriteStations());
        } catch {
            setError("There was an error loading your favourite stations");
        }
    }, [dispatch, setError]);

    const onFavouriteStationPress = async (crsCode: string) => {
        navigation.navigate("StationDetailsScreen", {
            crsCode: crsCode,
            stationName: crsCodes.find((code) => code.id === crsCode).title,
            date: moment(),
            time: moment(),
        });
    };

    useEffect(() => {
        setIsLoading(true);
        loadFavouriteStations();
        setIsLoading(false);
    }, []);

    const favouriteStationItem = ({ item }: ListRenderItemInfo<string>) => (
        <FavouriteStationCard
            stationName={crsCodes.find((code) => code.id === item).title}
            crsCode={item}
            onPress={onFavouriteStationPress}
        />
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={"lightblue"} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                data={favouriteStations}
                renderItem={favouriteStationItem}
                keyExtractor={(item) => item}
                style={styles.flatlist}
            />
        </SafeAreaView>
    );
};

export default FavouriteStationsScreen;
