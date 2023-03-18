import { Action, ActionKind, State } from "@/store/store";
import { Dispatch, useState } from "react";
import ReactModal from "react-modal";

type Props = {
    isOpen: boolean;
    closeModalFunction: () => void;
    state: State;
    dispatch: Dispatch<Action>;
    restartDisplayWords?: (words: string) => void;
    resetTimer?: (timer?: number) => void;
};

const Setting: React.FC<Props> = ({
    isOpen,
    state,
    closeModalFunction,
    dispatch,
    resetTimer,
    restartDisplayWords,
}) => {
    const [countdownTemporary, setCountdownTemporary] = useState<number>(
        state.countdown
    );
    const [languageTemporary, setLanguageTemporary] = useState<string>(
        state.language
    );

    const restartGame = () => {
        resetTimer!(countdownTemporary);
        dispatch({
            type: ActionKind.ResetState,
            payload: {
                restart: restartDisplayWords,
                countdown: countdownTemporary,
                language: languageTemporary,
            },
        });
    };

    return (
        <ReactModal
            ariaHideApp={false}
            className={
                "w-2/5 fixed top-1/2 -translate-y-3/4 left-1/2 -translate-x-1/2 py-10 bg-gray-900 mx-auto my-auto focus-visible:outline-none rounded-lg"
            }
            isOpen={isOpen}
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.80)",
                },
            }}
            onRequestClose={closeModalFunction}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="w-full h-full flex flex-col justify-center items-center space-y-16">
                <h1 className="text-3xl 2xl:text-5xl text-white">Settings</h1>
                <div className="flex flex-col text-white w-3/5 space-y-2">
                    <div className="flex justify-between 2xl:text-2xl">
                        <span>Timer</span>
                        <div className="flex w-1/4 justify-between">
                            <>
                                {[10, 20, 30].map((timer, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCountdownTemporary(timer)
                                            }
                                            className={`${
                                                countdownTemporary === timer
                                                    ? ""
                                                    : "opacity-75"
                                            } hover:opacity-100`}
                                            disabled={
                                                timer === countdownTemporary
                                            }
                                        >
                                            {timer}
                                        </button>
                                    );
                                })}
                            </>
                        </div>
                    </div>
                    <div className="flex justify-between 2xl:text-2xl">
                        <span>Language</span>
                        <div className="w-2/5">
                            <select
                                className="bg-transparent outline text-right outline-gray-200 outline-2 rounded-lg px-2 py-0.5 w-full"
                                onChange={(e) =>
                                    setLanguageTemporary(e.target.value)
                                }
                                name=""
                                id=""
                            >
                                {process.env
                                    .NEXT_PUBLIC_LANGUAGES!.split(" ")
                                    .map((lang, index) => {
                                        return (
                                            <option key={index} value={lang}>
                                                {lang[0].toUpperCase() +
                                                    lang.substring(1)}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="text-white w-full flex justify-center space-x-5">
                    <button
                        onClick={async () => {
                            if (
                                languageTemporary &&
                                languageTemporary !== state.language
                            )
                                dispatch({
                                    type: ActionKind.SetLanguage,
                                    payload: { language: languageTemporary },
                                });
                            if (
                                countdownTemporary &&
                                countdownTemporary !== state.countdown
                            )
                                await dispatch({
                                    type: ActionKind.SetCountdown,
                                    payload: { countdown: countdownTemporary },
                                });

                            restartGame();
                            closeModalFunction();
                        }}
                        className="bg-green-500 w-1/6 py-1 text-xl rounded-md font-semibold hover:bg-opacity-80"
                    >
                        Apply
                    </button>
                    <button
                        onClick={closeModalFunction}
                        className="bg-red-500 w-1/6 py-1 text-xl rounded-md font-semibold hover:bg-opacity-80"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default Setting;
