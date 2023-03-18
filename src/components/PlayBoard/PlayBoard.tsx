import { Icons, Modal } from "@/components";
import { useDisplayWords } from "@/hooks";
import useTimer from "@/hooks/useTimer";
import { Action, ActionKind, State } from "@/store/store";
import {
    ChangeEvent,
    Dispatch,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type PlayBoardProps = {
    words: string;
    state: State;
    dispatch: Dispatch<Action>;
};

const PlayBoard: React.FC<PlayBoardProps> = ({ words, state, dispatch }) => {
    const [
        displayWords,
        setDisplayWordsInput,
        setOnFocus,
        rawInput,
        restartDisplayWords,
    ] = useDisplayWords(words, "");
    const inputRef = useRef<HTMLInputElement>(null);
    const [openRestartModal, setOpenRestartModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);

    if (typeof window !== "undefined") {
        document.body.addEventListener("click", (ev) => {
            setOnFocus(false);
        });
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value;

        if (!state.isPlaying) start();
        if (rawInput.length === words.length) endGame();

        if (rawInput[rawInput.length - 1] !== words[rawInput.length - 1]) {
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

    // end the game
    const endGame = () => {
        dispatch({ type: ActionKind.TogglePlaying });
        dispatch({ type: ActionKind.ToggleShowScore });
        inputRef.current!.value = "";
    };

    const [countdown, startTimer, resetTimer, pauseTimer] = useTimer(
        state.countdown,
        endGame
    );

    const restartGame = (timer?: number) => {
        setOpenRestartModal(false);
        if (inputRef.current) inputRef.current.value = "";
        resetTimer(timer ? timer : state.countdown);
        dispatch({
            type: ActionKind.ResetState,
            payload: { restart: restartDisplayWords },
        });
    };

    useMemo(() => {
        if (countdown - state.countdown === 0) return;
        const cpm = parseInt(
            (rawInput.length / ((state.countdown - countdown) / 60)).toFixed()
        );
        dispatch({ type: ActionKind.AddCPMS, payload: { cpm } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    if (!displayWords.length) return <></>;

    return (
        <div className="w-3/5 mx-auto">
            <div className="w-full flex justify-between">
                <div className="text-xl text-white">
                    wrong count : {state.wrongCount}
                </div>
                <span
                    className={`text-xl px-2 ${
                        countdown <= 5 ? "text-red-600" : "text-white"
                    }`}
                >
                    {countdown}
                </span>
            </div>
            <div
                className="text-justify text-white text-2xl 2xl:text-3xl font-mono"
                onClick={(ev) => {
                    inputRef.current?.focus();
                    setOnFocus(true);
                    ev.stopPropagation();
                }}
            >
                {displayWords.map((word) => word)}
            </div>
            <input
                ref={inputRef}
                className="opacity-0 hover:cursor-default"
                type="text"
                value={rawInput}
                onChange={onInputChange}
            />

            <div className="flex w-3/5 mx-auto items-center justify-between my-10">
                <div></div>
                <button className="h-16 w-16 2xl:h-20 2xl:w-20 bg-neutral-900 hover:bg-opacity-75 rounded-lg border-2 border-neutral-800 flex items-center justify-center">
                    <Icons.Bulb />
                </button>
                <button
                    className="flex items-center justify-center h-16 w-16 2xl:h-20 2xl:w-20 bg-red-700 hover:bg-opacity-75 rounded-lg border-2 border-red-800"
                    onClick={() => {
                        setOpenRestartModal(true);
                        pauseTimer();
                    }}
                >
                    <Icons.Restart />
                </button>
                <button
                    className="flex justify-center items-center h-16 w-16 2xl:h-20 2xl:w-20 bg-gray-700 rounded-lg hover:bg-opacity-75 border-2 border-gray-800 disabled:bg-gray-800"
                    onClick={() => {
                        setOpenSettingModal(true);
                        pauseTimer();
                    }}
                    disabled={state.isPlaying}
                >
                    <Icons.Gear disabled={state.isPlaying} />
                </button>
                <div></div>
            </div>
            <Modal.ConfirmRestart
                isOpen={openRestartModal}
                restartWordFunction={restartGame}
                closeModalFunction={() => {
                    setOpenRestartModal(false);
                    startTimer();
                }}
            />
            <Modal.Setting
                isOpen={openSettingModal}
                closeModalFunction={() => {
                    setOpenSettingModal(false);
                }}
                state={state}
                dispatch={dispatch}
                restartDisplayWords={restartDisplayWords}
                resetTimer={resetTimer}
            />
        </div>
    );
};

export default PlayBoard;
