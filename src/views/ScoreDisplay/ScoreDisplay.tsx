import LineChart from "../../components/LineChart";

type ScoreDisplayProps = {
    nextGame: () => void;
    cpm: number[];
    wrongCount: number;
    words: string;
};

export default function ScoreDisplay({ nextGame, cpm, wrongCount, words }: ScoreDisplayProps) {
    return (
        <div className="mt-1/3">
            <div className="px-52">
                <LineChart data={cpm} />
                <div className="grid grid-cols-3">
                    <h1 className="text-3xl font-bold inline">CPM : {cpm[cpm.length - 1]} </h1>
                    <h1 className="text-3xl font-bold inline">Wrong : {wrongCount}</h1>
                    <h1 className="text-3xl font-bold inline">
                        Accuracy : {(((words.length - wrongCount) / words.length) * 100).toFixed() + "%"}
                    </h1>
                </div>
                <br />
                <button className="bg-green-400 px-6 py-2 text-white text-2xl rounded-lg" onClick={nextGame}>
                    Play Again
                </button>
            </div>
        </div>
    );
}
