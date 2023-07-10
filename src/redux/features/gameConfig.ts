import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import { generateTypingWords } from "../../libs";

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
	const language =
		(getCookie("keytypeLanguage") as string | undefined) || "indonesia";
	const countdown = +(
		(getCookie("keytypeCountdown") as string | undefined) || 30
	);

	return {
		isPlaying: false,
		isWrong: false,
		showScore: false,
		words: "",
		language: language,
		countdown: countdown,
		length: 30,
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
			const { countdown } = action.payload;
			setCookie("keytypeCountdown", countdown);
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
		generateWords: (state) => {
			state.words = generateTypingWords(state.length);
		},
	},
});

export const gameConfigReducer = gameConfig.reducer;
export const {
	setCountdown,
	setIsPlaying,
	setIsWrong,
	setShowScore,
	generateWords,
} = gameConfig.actions;