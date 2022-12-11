export const generateWords = (lang: string, length: number): string => {
    const { default: wordList } = require(`../../words/${lang}`);

    const wordArr = [];
    for (let i = 0; i < length; i++) {
        wordArr.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }

    return wordArr.join(" ");
};
