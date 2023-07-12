export const generateTypingWords = async (length = 20): Promise<string> => {
	const { default: vocab } = await import("../../words/indonesia");
	const words = [];

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * vocab.length);
		words.push(vocab[random]);
	}

	return words.join(" ");
};
