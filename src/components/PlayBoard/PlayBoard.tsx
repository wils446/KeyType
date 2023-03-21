import { Icons } from "@/components";
import { Action, State } from "@/store/store";
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

type PlayBoardProps = {
    state: State;
    displayWords: JSX.Element[];
    countdown: number;
    inputRef: RefObject<HTMLInputElement>;
    rawInput: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setOpenRestartModal: Dispatch<SetStateAction<boolean>>;
    setOpenSettingModal: Dispatch<SetStateAction<boolean>>;
    setOnFocus: Dispatch<SetStateAction<boolean>>;
    pauseTimer: () => void;
};

const PlayBoard: React.FC<PlayBoardProps> = ({
    state,
    displayWords,
    countdown,
    inputRef,
    rawInput,
    onInputChange,
    setOnFocus,
    setOpenRestartModal,
    setOpenSettingModal,
    pauseTimer,
}) => {
    if (typeof window !== "undefined") {
        document.body.addEventListener("click", (ev) => {
            setOnFocus(false);
        });
    }

    if (!displayWords.length) return <></>;

    return (
        <div className="w-3/5 mx-auto">
            <div className="w-full flex justify-between">
                <div className="text-xl text-white">wrong count : {state.wrongCount}</div>
                <span className={`text-xl px-2 ${countdown <= 5 ? "text-red-600" : "text-white"}`}>
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
            {/* <Modal.ConfirmRestart
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
            /> */}
        </div>
    );
};

export default PlayBoard;
