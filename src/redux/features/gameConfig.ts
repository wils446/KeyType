import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { RootState } from "@/redux/store";

type GameConfigState = {
	words: string;
	isPlaying: boolean;
	isWrong: boolean;
	showScore: boolean;
	language: string;
	length: number;
	countdown: number;
};

const initialState: () => GameConfigState = () => {
	const cookie = new Cookies();
	const language =
		(cookie.get("keytypeLanguage") as string | undefined) || "indonesia";
	const countdown = +(
		(cookie.get("keytypeCountdown") as string | undefined) || 30
	);

	return {
		isPlaying: false,
		isWrong: false,
		showScore: false,
		words: "",
		language: language,
		countdown: countdown,
		length: 60,
	};
};

export const gameConfig = createSlice({
	name: "gameConfig",
	initialState: initialState(),
	reducers: {
		setCountdown: (
			state,
			action: PayloadAction<{ countdown: 10 | 20 | 30 }>
		) => {
			const cookie = new Cookies();
			const { countdown } = action.payload;
			cookie.set("keytypeCountdown", countdown);
			state.countdown = countdown;
		},
		setIsPlaying: (state, action: PayloadAction<{ bool: boolean }>) => {
			state.isPlaying = action.payload.bool;
		},
		setIsWrong: (state, action: PayloadAction<{ bool: boolean }>) => {
			state.isWrong = action.payload.bool;
		},
		setShowScore: (state, action: PayloadAction<{ bool: boolean }>) => {
			state.showScore = action.payload.bool;
		},
		setWords: (state, action: PayloadAction<{ words: string }>) => {
			state.words = action.payload.words;
		},
	},
});

export const gameConfigReducer = gameConfig.reducer;
export const {
	setCountdown,
	setIsPlaying,
	setIsWrong,
	setShowScore,
	setWords,
} = gameConfig.actions;
export const selectGameConfigState = (state: RootState) =>
	state.gameConfigReducer;
