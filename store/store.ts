import { configureStore } from "@reduxjs/toolkit";

import rttReducer from "../store/reducers/rtt";
import favouritesReducer from "../store/reducers/favourites";

const store = configureStore({
	reducer: {
		rtt: rttReducer,
		favourites: favouritesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
