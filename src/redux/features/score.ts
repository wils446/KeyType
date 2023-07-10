import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ScoreState = {
	characterPerMinutes: number[];
	wrongCounts: number;
};

const initialState: ScoreState = {
	characterPerMinutes: [],
	wrongCounts: 0,
};

export const score = createSlice({
	name: "scoreReducer",
	initialState,
	reducers: {
		addCPMS: (state, action: PayloadAction<{ cpm: number }>) => {
			state.characterPerMinutes = [
				...state.characterPerMinutes,
				action.payload.cpm,
			];
		},
		addWrongCount: (state) => {
			state.wrongCounts = state.wrongCounts + 1;
		},
		resetScoreState: (state) => {
			const { characterPerMinutes, wrongCounts } = initialState;

			state.characterPerMinutes = characterPerMinutes;
			state.wrongCounts = wrongCounts;
		},
	},
});

export const scoreReducer = score.reducer;
export const { addCPMS, addWrongCount, resetScoreState } = score.actions;
export const selectScoreState = (state: RootState) => state.scoreReducer;
