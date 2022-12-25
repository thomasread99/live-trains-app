import { AnyAction } from "@reduxjs/toolkit";

import {
    GET_STATION_INFORMATION,
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
        case GET_STATION_INFORMATION:
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
