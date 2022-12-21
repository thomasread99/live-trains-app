import { AnyAction } from "@reduxjs/toolkit";

import {
	GET_STATION,
	GET_STATION_ARRIVALS,
	GET_SERVICE_INFORMATION,
} from "../actions/rtt";

interface RttState {
	searchResult?: SearchResult;
	serviceInformation?: ServiceInformation;
}

const initialState: RttState = {
	searchResult: {
		location: null,
		filter: null,
		services: null,
	},
	serviceInformation: null,
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
		case GET_SERVICE_INFORMATION:
			return {
				...state,
				serviceInformation: action.serviceInformation,
			};
		default:
			return state;
	}
};

export default reducer;
