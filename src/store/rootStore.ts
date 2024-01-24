import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";
import appSlice from "./appSlice.ts";

export const store = configureStore({
	reducer: {
		app: appSlice,
		counter: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
