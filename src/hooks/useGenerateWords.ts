import { generateTypingWords } from "@/libs";
import { selectGameConfigState, setWords } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useEffect } from "react";

export const useGenerateWords = () => {
	const dispatch = useAppDispatch();
	const { length } = useAppSelector(selectGameConfigState);

	const generateWords = useCallback(() => {
		generateTypingWords(length)
			.then((words) => dispatch(setWords({ words })))
			.catch(console.log);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		generateWords();
	}, []);

	return { generateWords };
};
