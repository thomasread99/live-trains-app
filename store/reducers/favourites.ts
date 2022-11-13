import { AnyAction } from "@reduxjs/toolkit";

import {
	ADD_STATION,
	GET_STATIONS,
	REMOVE_STATION,
} from "../actions/favourites";

interface FavouriteStationsState {
	favouriteStations: string[];
}

const initialState: FavouriteStationsState = {
	favouriteStations: [],
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
		default:
			return state;
	}
};

export default reducer;
