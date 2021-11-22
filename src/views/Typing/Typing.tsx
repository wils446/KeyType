import DisplayWords from "../../components/DisplayWords";
import LangOptions from "../../components/LangOptions";

type TypingProps = {
    html: string;
    inputValue: string;
    countDown: number;
    isPlaying: boolean;
    inputChangeHandler: (str: string) => void;
    langChangeHandler: (str: string) => void;
    restart: () => void;
};

export default function Typing({
    html,
    inputChangeHandler,
    inputValue,
    countDown,
    langChangeHandler,
    isPlaying,
    restart,
}: TypingProps) {
    return (
        <div className="vertical-middle fade-in fade-out">
            <div className="table w-full">
                <div className="table-row">
                    <div className="table-cell">
                        <LangOptions changeHandler={langChangeHandler} />
                    </div>
                    <div className="table-cell"></div>
                    <div
                        className={`table-cell text-2xl text-right font-medium ${countDown <= 5 ? "text-red-600" : ""}`}
                    >
                        {countDown}
                    </div>
                </div>
            </div>
            <DisplayWords html={html} />
            <input
                className="focus:outline-none text-center border-b-2 border-black w-full"
                type="text"
                value={inputValue}
                onChange={(e) => inputChangeHandler(e.target.value)}
            />
            {/*{isPlaying ? (
                <>
                    <button onClick={restart}>Restart</button>
                </>
            ) : (
                <></>
            )}*/}
        </div>
    );
}
