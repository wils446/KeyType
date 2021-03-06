import LineChart from "../../components/LineChart";

type ScoreDisplayProps = {
    nextGame: () => void;
    cpm: number[];
    wrongCount: number;
    inputLength: number;
};

export default function ScoreDisplay({ nextGame, cpm, wrongCount, inputLength }: ScoreDisplayProps) {
    return (
        <div className="mt-1/3">
            <div className="lg:px-52 md:px-8">
                <LineChart data={cpm} />
                <div className="grid grid-cols-3 dark:text-gray-200">
                    <h1 className="text-2xl lg:text-3xl font-bold inline">CPM : {cpm[cpm.length - 1]} </h1>
                    <h1 className="text-2xl lg:text-3xl  font-bold inline">Wrong : {wrongCount}</h1>
                    <h1 className="text-2xl lg:text-3xl  font-bold inline">
                        Accuracy : {((inputLength / (inputLength + wrongCount)) * 100).toFixed(1) + "%"}
                    </h1>
                </div>
                <br />
                <button className="bg-green-400 px-6 py-2 text-gray-200 text-2xl rounded-lg" onClick={nextGame}>
                    Play Again
                </button>
            </div>
        </div>
    );
}
