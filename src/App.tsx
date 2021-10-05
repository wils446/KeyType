import React from "react";
import "./App.css";
import { indonesianWords } from "./words";
import WordCanvas from "./components/WordCanvas";
import InputType from "./components/inputType";

function App(): JSX.Element {
    const [inputValue, setInputValue] = React.useState("");
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [html, setHtml] = React.useState("");
    const [time, setTime] = React.useState(0);
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    const [currentScore, setCurrentScore] = React.useState(0);

    //to get input value realtime
    const inputChangeHandler = (value: string) => {
        if (!isPlaying) start();
        setInputValue(value);

        if (inputValue.length === words.length - 1) {
            stop();
        }
    };

    //generate the word to type
    const generateWord = () => {
        const wordsList = [];
        for (let i = 0; i < 20; i++) {
            const random = Math.floor(Math.random() * indonesianWords.length);
            wordsList.push(indonesianWords[random]);
        }

        return wordsList.join(" ").trim();
    };

    const [words, setWords] = React.useState(generateWord());

    //check the input value realtime
    const generateCheckWords = () => {
        let currentHtml = "";
        for (let i = 0; i < words.length; i++) {
            if (inputValue[i] === undefined) currentHtml += `<span>${words[i]}</span>`;
            else
                currentHtml += `<span style="color: white; background-color:${
                    words[i] === inputValue[i] ? "green;" : "red;"
                }">${words[i]}</span>`;
        }
        setHtml(currentHtml);
    };

    React.useEffect(generateCheckWords, [inputValue, words]);

    //start the timer
    const startTimer = () => {
        setTimer(
            setInterval(() => {
                setTime((time) => time + 1);
            }, 1000)
        );
    };

    //stop the timer
    const stopTimer = () => {
        clearInterval(timer!);
        setTime(0);
    };

    //convert second to HHMMSS
    const convertTimeFormat = (): string => {
        let hours = String(Math.floor(time / 3600));
        let minutes = String(Math.floor((parseInt(hours) - parseInt(hours) * 3600) / 60));
        let seconds = String(time - parseInt(hours) * 3600 - parseInt(minutes) * 60);

        if (parseInt(hours) < 10) hours = `0${hours}`;
        if (parseInt(minutes) < 10) minutes = `0${minutes}`;
        if (parseInt(seconds) < 10) seconds = `0${seconds}`;
        return `${hours}:${minutes}:${seconds}`;
    };

    const scoreCalculation = () => {
        let wrong = 0;
        for (let i = 0; i < inputValue.length; i++) {
            if (inputValue[i] !== words[i]) wrong++;
        }
        setCurrentScore(Math.floor(words.length - 1 / time - wrong * 10));
    };

    //start the typing
    const start = () => {
        if (isPlaying) return;

        startTimer();
        setIsPlaying(true);
    };

    //stop the typing
    const stop = () => {
        setWords(generateWord);
        stopTimer();
        setIsPlaying(false);
        setInputValue("");
        scoreCalculation();
    };

    return (
        <div className="App">
            <div className="container">
                <div className=" display-1 mb-5 ">KeyType</div>
                <WordCanvas html={html} words={words} />
                <InputType currentInputValue={inputValue} changeHandler={inputChangeHandler} />
                <h5 className="mb-3">{convertTimeFormat()}</h5>
                <h3>Score : {currentScore ? currentScore : ""}</h3>
            </div>
        </div>
    );
}

export default App;
