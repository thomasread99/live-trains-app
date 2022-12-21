import { AnyAction } from "@reduxjs/toolkit";

import { FavouriteJourney } from "../../models/FavouriteJourney";

import {
	ADD_STATION,
	GET_JOURNEYS,
	GET_STATIONS,
	REMOVE_STATION,
	ADD_JOURNEY,
	REMOVE_JOURNEY,
} from "../actions/favourites";

interface FavouriteStationsState {
	favouriteStations: string[];
	favouriteJourneys: FavouriteJourney[];
}

const initialState: FavouriteStationsState = {
	favouriteStations: [],
	favouriteJourneys: [],
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case GET_STATIONS:
			return {
				...state,
				favouriteStations: action.favouriteStations,
			};
		case ADD_STATION:
			return {
				...state,
				favouriteStations: action.favouriteStations,
			};
		case REMOVE_STATION:
			return {
				...state,
				favouriteStations: action.favouriteStations,
			};
		case GET_JOURNEYS:
			return {
				...state,
				favouriteJourneys: action.favouriteJourneys,
			};
		case ADD_JOURNEY:
			return {
				...state,
				favouriteJourneys: action.favouriteJourneys,
			};
		case REMOVE_JOURNEY:
			return {
				...state,
				favouriteJourneys: action.favouriteJourneys,
			};
		default:
			return state;
	}
};

export default reducer;
