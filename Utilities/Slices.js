import { createAction, createSlice } from "@reduxjs/toolkit";

export const apiIDSlice = createSlice({
	name: "apiID",
	initialState: "",
	reducers: {
		assignApiID: (state, action) => {
			return (state = action.payload);
		},
	},
});

export const sendersSlice = createSlice({
	name: "senders",
	initialState: [],
	reducers: {
		assignSenders: (state, action) => {
			return (state = action.payload);
		},
	},
});

var apiIDReducer = apiIDSlice.reducer;
var sendersReducer = sendersSlice.reducer;

export { apiIDReducer, sendersReducer };
export const { assignApiID } = apiIDSlice.actions;
export const { assignSenders } = sendersSlice.actions;
