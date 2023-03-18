import { Dispatch, SetStateAction, useEffect, useState } from "react";

const realtimeUpdate = (
    words: string,
    inputValue: string,
    onFocus: boolean
): JSX.Element[] => {
    let jsx: JSX.Element[] = [];

    for (let i = 0; i < words.length; i++) {
        let classString = "text-white ";

        if (i > inputValue.length) classString += "opacity-60";
        else if (i === inputValue.length && onFocus) classString += "underline";

        jsx.push(
            <span key={i} className={classString}>
                {words[i]}
            </span>
        );
    }

    return jsx;
};

const useDisplayWords = (
    words: string,
    inputValue: string
): [
    JSX.Element[],
    Dispatch<SetStateAction<string>>,
    Dispatch<SetStateAction<boolean>>,
    string,
    (words: string) => void
] => {
    const [input, setInput] = useState(inputValue);
    const [html, setHtml] = useState<JSX.Element[]>([]);
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [rawWords, setRawWords] = useState(words);

    const restart = (words: string) => {
        setInput("");
        setRawWords(words);
    };

    useEffect(() => {
        setHtml(realtimeUpdate(rawWords, input, onFocus));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input, onFocus, rawWords]);

    return [html, setInput, setOnFocus, input, restart];
};

export default useDisplayWords;
