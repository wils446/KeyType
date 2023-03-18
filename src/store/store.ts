import { generateTypingWords } from "@/utils";

export enum ActionKind {
    TogglePlaying = "TOGGLE_PLAYING",
    SetIsWrong = "SET_IS_WRONG",
    ToggleShowScore = "TOGGLE_SHOWSCORE",
    SetLanguage = "SET_LANGUAGE",
    SetLength = "SET_LENGTH",
    SetCountdown = "SET_COUNTDOWN",
    AddCPMS = "ADD_CPMS",
    Increase_WrongCount = "INCREASE_WRONGCOUNT",
    ResetState = "RESET_STATE",
}

export interface State {
    isPlaying: boolean;
    isWrong: boolean;
    words: string;
    showScore: boolean;
    language: string;
    length: number;
    countdown: number;
    characterPerMinutes: number[];
    wrongCount: number;
}

export interface Action {
    type: ActionKind;
    payload?: any;
}

export const initialState: State = {
    isPlaying: false,
    isWrong: false,
    showScore: false,
    language: "indonesia",
    length: 30,
    words: "",
    countdown: 20,
    characterPerMinutes: [],
    wrongCount: 0,
};

export const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;

    switch (type) {
        case ActionKind.TogglePlaying:
            return {
                ...state,
                isPlaying: !state.isPlaying,
            };
        case ActionKind.SetIsWrong:
            return {
                ...state,
                isWrong: payload.bool,
            };
        case ActionKind.Increase_WrongCount:
            return {
                ...state,
                wrongCount: ++state.wrongCount,
            };
        case ActionKind.ToggleShowScore:
            return {
                ...state,
                showScore: !state.showScore,
            };
        case ActionKind.AddCPMS:
            const { cpm } = payload;

            return {
                ...state,
                characterPerMinutes: [...state.characterPerMinutes, cpm],
            };
        case ActionKind.SetCountdown:
            const { countdown } = payload;

            return {
                ...state,
                countdown,
            };
        case ActionKind.SetLanguage:
            const { language } = payload;

            return {
                ...state,
                language,
            };
        case ActionKind.ResetState:
            const newWords = generateTypingWords(state.length);
            if (payload !== undefined) payload.restart(newWords);

            return {
                isPlaying: false,
                isWrong: false,
                showScore: false,
                language:
                    payload && payload.language
                        ? payload.language
                        : state.language,
                length: 30,
                words: newWords,
                countdown:
                    payload && payload.countdown
                        ? payload.countdown
                        : state.countdown,
                characterPerMinutes: [],
                wrongCount: 0,
            };
        default:
            return state;
    }
};
