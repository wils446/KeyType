"use client";

import { Brand, ScoreBoard } from "@/components";
import { PlayBoard } from "@/components/PlayBoard";
import { initialState, reducer } from "@/store/store";
import { generateTypingWords } from "@/utils";
import { useReducer } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        words: generateTypingWords(initialState.length),
    });

    return (
        <main className={styles.main}>
            <div className="row-span-1 flex justify-center items-center">
                <Brand />
            </div>
            <div className="row-span-3">
                {state.showScore ? (
                    <ScoreBoard state={state} dispatch={dispatch} />
                ) : (
                    <PlayBoard
                        words={state.words}
                        state={state}
                        dispatch={dispatch}
                    />
                )}
            </div>
        </main>
    );
}
