const generateTypingWords = (length = 20) => {
    const { default: vocabulary } = require("../words/indonesia");
    const words = [];

    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * vocabulary.length);
        words.push(vocabulary[random]);
    }

    return words.join(" ");
};

export default generateTypingWords;
