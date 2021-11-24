import React from "react";
import "./App.css";
import { generateWords } from "./common/utils/generateWords";
import Typing from "./views/Typing";
import ScoreDisplay from "./views/ScoreDisplay";
import { useDisplayWords } from "./hooks";

function App() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showScore, setShowScore] = React.useState(false);
    const [language, setLanguage] = React.useState("indonesia");
    const [length] = React.useState(30);
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    const [countDown, setCountDown] = React.useState(20);

    const [inputValue, setInputValue] = React.useState("");
    const [words, setWords] = React.useState(generateWords(language, length));
    const [html, setHtml] = useDisplayWords(words, inputValue);

    const [wrongCount, setWrongCount] = React.useState(0);
    const [characterPerMinutes, setWordPerMinutes] = React.useState<number[]>([]);
    const characterPerMinute: number = React.useMemo(
        () => {
            if (20 - countDown === 0) return 0;
            return parseInt((inputValue.length / ((20 - countDown) / 60)).toFixed());
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [countDown]
    );

    const inputChangeHandler = (str: string) => {
        if (!isPlaying) startGame();
        if (inputValue.length === words.length - 1) stopGame(); // to check if all text already typed stop game
        if (str[str.length - 1] !== words[str.length - 1]) {
            setWrongCount(wrongCount + 1);
            return;
        }

        setHtml(str);
        setInputValue(str);
    };

    const langChangeHandler = (str: string) => {
        setLanguage(str);
        nextGame();
    };

    const cpmUpdate = () => {
        setWordPerMinutes((prev) => [...prev, characterPerMinute]);
    };

    const timerCheck = () => {
        if (countDown === 0) {
            stopGame();
        }
    };

    const startTimer = () => {
        setTimer(
            setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000)
        );
    };

    const nextGame = () => {
        setShowScore(false);
        setInputValue("");
        setWords(generateWords(language, length));
        setWrongCount(0);
        setIsPlaying(false);
        setWordPerMinutes([]);
        setCountDown(20);
        setHtml("");
    };

    const startGame = () => {
        setIsPlaying(true); // set isPlaying to true
        startTimer(); // start timer
    };

    const stopGame = React.useCallback(() => {
        setIsPlaying(false); // set isPlaying to false
        clearInterval(timer!); // stop timer
        setShowScore(true); // show score
    }, [timer]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(cpmUpdate, [countDown]);
    React.useEffect(timerCheck, [countDown, stopGame]);

    return (
        <div className="App">
            <div className="container mx-auto h-screen">
                <h1 className="text-6xl font-bold mb-8">KeyType</h1>
                {showScore ? (
                    <ScoreDisplay
                        nextGame={nextGame}
                        cpm={characterPerMinutes}
                        wrongCount={wrongCount}
                        words={words}
                        inputLength={inputValue.length}
                    />
                ) : (
                    <Typing
                        isPlaying={isPlaying}
                        inputValue={inputValue}
                        inputChangeHandler={inputChangeHandler}
                        html={html}
                        countDown={countDown}
                        langChangeHandler={langChangeHandler}
                        restart={nextGame}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
