import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";

import FavouriteJourneyCard from "../components/favourites/FavouriteJourneyCard";

import { FavouriteJourney } from "../models/FavouriteJourney";

import * as favouritesActions from "../store/actions/favourites";

import styles from "../styles/FavouriteStationsScreenStyles";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FavouriteJourneysStackNavigatorParamList } from "../navigation/FavouriteStackNavigators";

type FavouriteJourneyssScreenProps = NativeStackScreenProps<
    FavouriteJourneysStackNavigatorParamList,
    "FavouriteJourneysScreen"
>;

const FavouriteJourneysScreen = ({
    navigation,
}: FavouriteJourneyssScreenProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const dispatch = useAppDispatch();

    const favouriteJourneys: FavouriteJourney[] = useAppSelector(
        (state: any) => state.favourites.favouriteJourneys,
    );

    const loadFavouriteStations = useCallback(async () => {
        try {
            await dispatch(favouritesActions.getFavouriteJourneys());
        } catch {
            setError("There was an error loading your favourite stations");
        }
    }, [dispatch, setError]);

    const onFavouriteJourneyPress = async (journey: FavouriteJourney) => {
        navigation.navigate("ServiceDetailsScreen", {
            crsCode: journey.crsCode,
            date: moment(journey.date),
            serviceUid: journey.serviceUid,
        });
    };

    useEffect(() => {
        setIsLoading(true);
        loadFavouriteStations();
        setIsLoading(false);
    }, []);

    const favouriteStationItem = ({
        item,
    }: ListRenderItemInfo<FavouriteJourney>) => (
        <FavouriteJourneyCard
            journey={item}
            onPress={onFavouriteJourneyPress}
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
                data={favouriteJourneys}
                renderItem={favouriteStationItem}
                keyExtractor={(item) => item.serviceUid}
                style={styles.flatlist}
            />
        </SafeAreaView>
    );
};

export default FavouriteJourneysScreen;
