import { configureStore } from "@reduxjs/toolkit";
import { scoreReducer, gameConfigReducer } from "./features";

export const store = configureStore({
	reducer: {
		scoreReducer,
		gameConfigReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
