import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
	isOpen: boolean;
}

const initialState: AppState = {
	isOpen: false,
};

export const counterSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		open: (state) => {
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { open, close, toggle } = counterSlice.actions;

export default counterSlice.reducer;
