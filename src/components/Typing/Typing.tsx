import DisplayWords from "../DisplayWords";
import LangOptions from "../LangOptions";

type TypingProps = {
    html: string;
    inputValue: string;
    countDown: number;
    isPlaying: boolean;
    inputChangeHandler: (str: string) => void;
    langChangeHandler: (str: string) => void;
    restart: () => void;
    theme: string;
    themeChangeHandler: () => void;
};

export default function Typing({
    html,
    inputChangeHandler,
    inputValue,
    countDown,
    langChangeHandler,
    isPlaying,
    restart,
    theme,
    themeChangeHandler,
}: TypingProps) {
    return (
        <div className="vertical-middle fade-in fade-out w-3/5">
            <div className="table w-full">
                <div className="table-row">
                    <div className="table-cell text-left">
                        <div className="inline-block pr-1">
                            <button className="dark:text-white" onClick={() => themeChangeHandler()}>
                                {theme === "light" ? "darkmode" : "lightmode"}
                            </button>
                        </div>
                        <div className="inline-block px-1">
                            <LangOptions changeHandler={langChangeHandler} />
                        </div>
                    </div>
                    <div className="table-cell"></div>
                    <div
                        className={`table-cell text-2xl text-right font-medium ${
                            countDown <= 5 ? "text-red-600" : "dark:text-white"
                        }`}
                    >
                        {countDown}
                    </div>
                </div>
            </div>
            <DisplayWords html={html} />
            <input
                className="focus:outline-none text-center border-b-2 border-black w-full dark:bg-transparent dark:border-gray-200 dark:text-gray-200"
                type="text"
                value={inputValue}
                onChange={(e) => inputChangeHandler(e.target.value)}
                placeholder="type here to start"
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
