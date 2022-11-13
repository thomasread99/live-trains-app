import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../store";

export const GET_STATIONS = "GET_STATIONS";
export const ADD_STATION = "ADD_STATION";
export const REMOVE_STATION = "REMOVE_STATION";

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
