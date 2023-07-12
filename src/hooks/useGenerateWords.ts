import { generateTypingWords } from "@/libs";
import { selectGameConfigState, setWords } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export const useGenerateWords = () => {
	const dispatch = useAppDispatch();
	const { length } = useAppSelector(selectGameConfigState);

	const generateWords = () => {
		generateTypingWords(length)
			.then((words) => dispatch(setWords({ words })))
			.catch(console.log);
	};

	useEffect(() => {
		generateWords();
	}, []);

	return { generateWords };
};
