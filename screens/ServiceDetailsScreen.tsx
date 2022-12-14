import React, { useState, useEffect, useCallback } from "react";
import {
    Text,
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
    View,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";

import ServiceRow from "../components/service/ServiceRow";

import { FavouriteJourney } from "../models/FavouriteJourney";

import * as rttActions from "../store/actions/rtt";
import * as favouritesActions from "../store/actions/favourites";

import styles from "../styles/ServiceDetailsScreenStyles";
import colours from "../config/colours";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { StationSearchNavigatorParamList } from "../navigation/StationSearchNavigator";
import { RootState } from "../store/store";

type ServiceDetailsScreenProps = NativeStackScreenProps<
    StationSearchNavigatorParamList,
    "ServiceDetailsScreen"
>;

const ServiceDetailsScreen = ({
    route,
    navigation,
}: ServiceDetailsScreenProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedStation, setSelectedStation] = useState<LocationObj>();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const serviceInformation: ServiceInformation = useAppSelector(
        (state: RootState) => state.rtt.serviceInformation,
    );
    const favouriteJourneys: FavouriteJourney[] = useAppSelector(
        (state: RootState) => state.favourites.favouriteJourneys,
    );

    const onRefresh = () => {
        setIsRefreshing(true);
        loadServiceInformation();
        setIsRefreshing(false);
    };

    const loadServiceInformation = useCallback(async () => {
        await dispatch(
            rttActions.getServiceInformation(
                route.params.serviceUid,
                route.params.date ?? moment(),
            ),
        );
    }, [dispatch]);

    const addToFavourites = useCallback(
        async (time: string, origin: string, destination: string) => {
            await dispatch(
                favouritesActions.addJourney({
                    serviceUid: route.params.serviceUid,
                    description: `${time} ${origin} to ${destination}`,
                    date: route.params.date
                        ? route.params.date.toISOString()
                        : moment().toISOString(),
                    crsCode: route.params.crsCode,
                }),
            );
        },
        [dispatch],
    );

    const removeFromFavourites = useCallback(
        async (time: string, origin: string, destination: string) => {
            await dispatch(
                favouritesActions.removeJourney({
                    serviceUid: route.params.serviceUid,
                    description: `${time} ${origin} to ${destination}`,
                    date: route.params.date
                        ? route.params.date.toString()
                        : moment().toString(),
                    crsCode: route.params.crsCode,
                }),
            );
        },
        [dispatch],
    );

    const loadFavouriteJourneys = useCallback(async () => {
        await dispatch(favouritesActions.getFavouriteJourneys());
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        loadFavouriteJourneys();
        loadServiceInformation().catch(() => {
            setIsError(true);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (serviceInformation && serviceInformation.locations) {
            setSelectedStation(
                serviceInformation.locations.find(
                    (location) => location.crs === route.params.crsCode,
                ),
            );
            setIsLoading(false);
        }
        if (serviceInformation && serviceInformation.error) {
            setIsError(true);
            setIsLoading(false);
        }
    }, [serviceInformation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("blur", () => {
            navigation.popToTop();
        });

        return unsubscribe;
    }, [navigation]);

    const destinationListItem = ({ item }: ListRenderItemInfo<LocationObj>) => (
        <ServiceRow
            station={item.description}
            departed={
                item.realtimeDepartureActual || item.realtimeDepartureNoReport
            }
            arrived={item.realtimeArrivalActual || item.realtimeArrivalNoReport}
            bookedArrival={item.gbttBookedArrival}
            bookedDeparture={item.gbttBookedDeparture}
            realtimeArrival={item.realtimeArrival}
            realtimeDeparture={item.realtimeDeparture}
            realtimeArrivalActual={item.realtimeArrivalActual}
            realtimeDepartureActual={item.realtimeDepartureActual}
            cancelled={item.cancelReasonCode ? true : false}
        />
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={colours.blue} />
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.backButton}>
                    <FontAwesome
                        name="arrow-left"
                        size={wp("8%")}
                        onPress={() => navigation.pop()}
                        color={colours.white}
                    />
                </View>
                <Text style={styles.errorText}>
                    Information for this service could not be found
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backButton}>
                <FontAwesome
                    name="arrow-left"
                    size={wp("8%")}
                    onPress={() => navigation.pop()}
                    color={colours.white}
                />
            </View>
            <View style={styles.header}>
                <ScrollView horizontal style={styles.stationNameContainer}>
                    <Text style={styles.stationName}>
                        {selectedStation
                            ? selectedStation.description.toUpperCase()
                            : ""}
                    </Text>
                </ScrollView>
                <View style={styles.iconContainer}>
                    {favouriteJourneys.some(
                        (j) => j.serviceUid === route.params.serviceUid,
                    ) ? (
                        <FontAwesome
                            name="star"
                            size={wp("8%")}
                            onPress={() => {
                                if (selectedStation) {
                                    removeFromFavourites(
                                        selectedStation.realtimeDeparture,
                                        selectedStation.description,
                                        serviceInformation.destination[0]
                                            .description,
                                    );
                                }
                            }}
                            color={colours.yellow}
                        />
                    ) : (
                        <FontAwesome
                            name="star-o"
                            size={wp("8%")}
                            onPress={() => {
                                if (selectedStation) {
                                    addToFavourites(
                                        selectedStation.realtimeDeparture,
                                        selectedStation.description,
                                        serviceInformation.destination[0]
                                            .description,
                                    );
                                }
                            }}
                            color={colours.white}
                        />
                    )}
                </View>
            </View>
            <View style={styles.serviceDetails}>
                <View>
                    <Text style={styles.arrivingHeader}>
                        {selectedStation
                            ? selectedStation.description ===
                              serviceInformation.origin[0].description
                                ? "STARTS"
                                : "ARRIVING"
                            : ""}
                    </Text>
                    <Text style={styles.realtimeArrival}>
                        {selectedStation
                            ? selectedStation.description ===
                              serviceInformation.origin[0].description
                                ? "HERE"
                                : selectedStation.realtimeArrival ??
                                  selectedStation.gbttBookedArrival
                            : ""}
                    </Text>
                </View>

                <View>
                    <Text style={styles.arrivingHeader}>PLATFORM</Text>
                    <Text style={styles.realtimeArrival}>
                        {selectedStation && selectedStation.platform
                            ? selectedStation.platform
                            : "TBA"}
                    </Text>
                </View>
            </View>
            {selectedStation && selectedStation.cancelReasonCode ? (
                <View>
                    <Text style={styles.cancelledText}>
                        {selectedStation.cancelReasonShortText
                            ? "CANCELLED DUE TO " +
                              selectedStation.cancelReasonShortText.toUpperCase()
                            : "CANCELLED FOR UNDISCLOSED REASON"}
                    </Text>
                </View>
            ) : (
                <></>
            )}
            <FlatList
                data={serviceInformation.locations}
                renderItem={destinationListItem}
                keyExtractor={(item, index) => `${item.crs}-${index}`}
                contentContainerStyle={styles.flatlist}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
            />
        </SafeAreaView>
    );
};

export default ServiceDetailsScreen;
