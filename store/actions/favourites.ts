import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../store";

import { FavouriteJourney } from "../../models/FavouriteJourney";

export const GET_STATIONS = "GET_STATIONS";
export const ADD_STATION = "ADD_STATION";
export const REMOVE_STATION = "REMOVE_STATION";

export const GET_JOURNEYS = "GET_JOURNEYS";
export const ADD_JOURNEY = "ADD_JOURNEY";
export const REMOVE_JOURNEY = "REMOVE_JOURNEY";

export const getFavouriteStations = () => {
	return async (dispatch: AppDispatch) => {
		const favouriteStations = await AsyncStorage.getItem("stations");

		if (!favouriteStations) return;

		dispatch({
			type: GET_STATIONS,
			favouriteStations: JSON.parse(favouriteStations),
		});
	};
};

export const addStation = (crsCode: string) => {
	return async (dispatch: AppDispatch) => {
		const favouriteStations = await AsyncStorage.getItem("stations");
		let favouriteStationsArray;

		if (favouriteStations === null) {
			favouriteStationsArray = [crsCode];
		} else {
			favouriteStationsArray = JSON.parse(favouriteStations);
			favouriteStationsArray.push(crsCode);
		}

		await AsyncStorage.setItem(
			"stations",
			JSON.stringify(favouriteStationsArray)
		);

		dispatch({
			type: ADD_STATION,
			favouriteStations: favouriteStationsArray,
		});
	};
};

export const removeStation = (crsCode: string) => {
	return async (dispatch: AppDispatch) => {
		const favouriteStations = await AsyncStorage.getItem("stations");
		let favouriteStationsArray;

		if (favouriteStations === null) {
			return null;
		} else {
			favouriteStationsArray = JSON.parse(favouriteStations);
			favouriteStationsArray.splice(crsCode, 1);
		}

		await AsyncStorage.setItem(
			"stations",
			JSON.stringify(favouriteStationsArray)
		);

		dispatch({
			type: REMOVE_STATION,
			favouriteStations: favouriteStationsArray,
		});
	};
};

export const getFavouriteJourneys = () => {
	return async (dispatch: AppDispatch) => {
		const favouriteJourneys = await AsyncStorage.getItem("journeys");

		if (!favouriteJourneys) return;

		dispatch({
			type: GET_JOURNEYS,
			favouriteJourneys: JSON.parse(favouriteJourneys),
		});
	};
};

export const addJourney = (journey: FavouriteJourney) => {
	return async (dispatch: AppDispatch) => {
		const favouriteJourneys = await AsyncStorage.getItem("journeys");
		let favouriteJourneysArray;

		if (favouriteJourneys === null) {
			favouriteJourneysArray = [journey];
		} else {
			favouriteJourneysArray = JSON.parse(favouriteJourneys);
			favouriteJourneysArray.push(journey);
		}

		await AsyncStorage.setItem(
			"journeys",
			JSON.stringify(favouriteJourneysArray)
		);

		dispatch({
			type: ADD_JOURNEY,
			favouriteJourneys: favouriteJourneysArray,
		});
	};
};

export const removeJourney = (journey: FavouriteJourney) => {
	return async (dispatch: AppDispatch) => {
		const favouriteJourneys = await AsyncStorage.getItem("journeys");
		let favouriteJourneysArray;

		if (favouriteJourneys === null) {
			return null;
		} else {
			favouriteJourneysArray = JSON.parse(favouriteJourneys);
			const index = favouriteJourneysArray
				.map((j: FavouriteJourney) => j.serviceUid)
				.indexOf(journey.serviceUid);
			if (index > -1) {
				favouriteJourneysArray.splice(index, 1);
			}
		}

		await AsyncStorage.setItem(
			"journeys",
			JSON.stringify(favouriteJourneysArray)
		);

		dispatch({
			type: REMOVE_JOURNEY,
			favouriteJourneys: favouriteJourneysArray,
		});
	};
};
