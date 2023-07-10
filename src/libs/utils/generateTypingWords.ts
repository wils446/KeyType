export const generateTypingWords = (length = 20) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
	const { default: vocabulary } = require("../../words/indonesia");
	const vocab = vocabulary as string[];
	const words = [];

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * vocab.length);
		words.push(vocab[random]);
	}

	return words.join(" ");
};
