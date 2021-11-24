import React from "react";

const realtimeCheck = (words: string, inputValue: string) => {
    let currentHtml = "";
    for (let i = 0; i < words.length; i++) {
        if (inputValue[i] === undefined)
            currentHtml += `<span class="${inputValue.length === i ? "underline font-black" : "text-gray-500"}">${
                words[i]
            }</span>`;
        else {
            currentHtml += `<span class="text-black">${words[i]}</span>`;
        }
    }
    return currentHtml;
};

export default function useDisplayWords(
    words: string,
    inputValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [input, setInput] = React.useState(inputValue);
    const [html, setHtml] = React.useState("");

    React.useEffect(
        () => {
            setHtml(realtimeCheck(words, input));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [input]
    );

    return [html, setInput];
}
