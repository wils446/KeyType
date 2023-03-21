"use client";

import { Brand, Modal, PlayBoard, ScoreBoard } from "@/components";
import { useDisplayWords, useLocalConfig, useTimer } from "@/hooks";
import { ActionKind, initialState, reducer } from "@/store/store";
import { generateTypingWords } from "@/utils";
import { ChangeEvent, useMemo, useReducer, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [localConfig, setLocalConfig] = useLocalConfig(initialState);
    const [state, dispatch] = useReducer(reducer, {
        ...localConfig,
        words: generateTypingWords(localConfig.length),
    });

    const [displayWords, setDisplayWordsInput, setOnFocus, rawInput, restartDisplayWords] =
        useDisplayWords(state.words, "");
    const inputRef = useRef<HTMLInputElement>(null);
    const [openRestartModal, setOpenRestartModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);

    // end the game
    const endGame = () => {
        dispatch({ type: ActionKind.TogglePlaying });
        dispatch({ type: ActionKind.ToggleShowScore });
        inputRef.current!.value = "";
        setOnFocus(false);
    };

    const [countdown, startTimer, resetTimer, pauseTimer] = useTimer(state.countdown, endGame);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value;

        if (!state.isPlaying) start();
        if (rawInput.length === state.words.length) endGame();

        if (rawInput[rawInput.length - 1] !== state.words[rawInput.length - 1]) {
            dispatch({ type: ActionKind.SetIsWrong, payload: { bool: true } });
            dispatch({ type: ActionKind.Increase_WrongCount });
            return;
        } else {
            dispatch({ type: ActionKind.SetIsWrong, payload: { bool: false } });
            setDisplayWordsInput(rawInput);
        }
    };

    // start typing game
    const start = () => {
        dispatch({ type: ActionKind.TogglePlaying });
        startTimer();
    };

    const restartOnGame = (timer?: number) => {
        setOpenRestartModal(false);
        setOnFocus(false);
        if (inputRef.current) inputRef.current.value = "";
        resetTimer(timer ? timer : state.countdown);
        dispatch({
            type: ActionKind.ResetState,
            payload: { restart: restartDisplayWords },
        });
    };

    const restartGame = () => {
        dispatch({
            type: ActionKind.ResetState,
            payload: { restart: restartDisplayWords },
        });
    };

    useMemo(() => {
        if (countdown - state.countdown === 0) return;
        const cpm = parseInt((rawInput.length / ((state.countdown - countdown) / 60)).toFixed());
        dispatch({ type: ActionKind.AddCPMS, payload: { cpm } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    return (
        <main className={styles.main}>
            <div className="row-span-1 flex justify-center items-center">
                <Brand />
            </div>
            <div className="row-span-3">
                {state.showScore ? (
                    <ScoreBoard
                        state={state}
                        restartGame={restartGame}
                        setOpenSettingModal={setOpenSettingModal}
                    />
                ) : (
                    <PlayBoard
                        state={state}
                        countdown={countdown}
                        displayWords={displayWords}
                        inputRef={inputRef}
                        onInputChange={onInputChange}
                        pauseTimer={pauseTimer}
                        rawInput={rawInput}
                        setOnFocus={setOnFocus}
                        setOpenRestartModal={setOpenRestartModal}
                        setOpenSettingModal={setOpenSettingModal}
                    />
                )}
            </div>
            <Modal.Setting
                isOpen={openSettingModal}
                dispatch={dispatch}
                state={state}
                closeModalFunction={() => setOpenSettingModal(false)}
                resetTimer={resetTimer}
                restartDisplayWords={restartDisplayWords}
                setLocalConfig={setLocalConfig}
            />
            <Modal.ConfirmRestart
                isOpen={openRestartModal}
                closeModalFunction={() => {
                    setOpenRestartModal(false);
                    startTimer();
                }}
                restartWordFunction={restartOnGame}
            />
        </main>
    );
}
