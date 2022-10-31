import { configureStore } from "@reduxjs/toolkit";

import rttReducer from "../store/reducers/rtt";

const store = configureStore({
	reducer: {
		rtt: rttReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
