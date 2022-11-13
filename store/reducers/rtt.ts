import { AnyAction } from "@reduxjs/toolkit";

import { GET_STATION, GET_STATION_ARRIVALS } from "../actions/rtt";

interface RttState {
	searchResult?: SearchResult;
}

const initialState: RttState = {
	searchResult: {
		location: null,
		filter: null,
		services: null,
	},
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case GET_STATION:
			return {
				...state,
				searchResult: action.searchResult,
			};
		case GET_STATION_ARRIVALS:
			return {
				...state,
				searchResult: action.searchResult,
			};
		default:
			return state;
	}
};

export default reducer;
