import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { apiIDReducer, sendersReducer } from "./Slices";

export default configureStore({
	reducer: {
		apiID: apiIDReducer,
		senders: sendersReducer,
	},
});

export const navigationRef = React.createRef();
