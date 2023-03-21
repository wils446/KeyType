import { Chart, Icons } from "@/components";
import { State } from "@/store/store";
import { Dispatch, SetStateAction } from "react";

type ScoreBoardProps = {
    state: State;
    restartGame: () => void;
    setOpenSettingModal: Dispatch<SetStateAction<boolean>>;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ state, restartGame, setOpenSettingModal }) => {
    return (
        <div className="mt-10  h-full">
            <Chart
                type="line"
                datasetIdKey="id"
                data={{
                    labels: state.characterPerMinutes.map((c, i) => i + 1),
                    datasets: [
                        {
                            label: "CPM",
                            data: [...state.characterPerMinutes],
                            borderColor: "#4338ca",
                            backgroundColor: "rgba(0,0,0, 0.2)",
                            fill: true,
                        },
                    ],
                }}
            />
            <div className="flex w-3/5 mx-auto items-center justify-between my-10">
                <div></div>
                <button className="h-16 w-16 2xl:h-20 2xl:w-20 bg-neutral-900 hover:bg-opacity-75 rounded-lg border-2 border-neutral-800 flex items-center justify-center">
                    <Icons.Bulb />
                </button>
                <button
                    className="flex items-center justify-center h-16 w-16 2xl:h-20 2xl:w-20 bg-red-700 hover:bg-opacity-75 rounded-lg border-2 border-red-800"
                    onClick={restartGame}
                >
                    <Icons.Restart />
                </button>
                <button
                    className="flex justify-center items-center h-16 w-16 2xl:h-20 2xl:w-20 bg-gray-700 rounded-lg hover:bg-opacity-75 border-2 border-gray-800 disabled:bg-gray-800"
                    onClick={() => {
                        setOpenSettingModal(true);
                    }}
                    disabled={state.isPlaying}
                >
                    <Icons.Gear disabled={state.isPlaying} />
                </button>
                <div></div>
            </div>
            {/* <Modal.Setting
                closeModalFunction={() => setSettingModal(false)}
                isOpen={settingModal}
                state={state}
                dispatch={dispatch}
            /> */}
        </div>
    );
};

export default ScoreBoard;
