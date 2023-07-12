import { Button, TypingBoard } from "@/components";
import { useGenerateWords, useTimer } from "@/hooks";
import {
	addCPMS,
	addWrongCount,
	resetScoreState,
	selectGameConfigState,
	selectScoreState,
	setIsPlaying,
	setShowScore,
} from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";

export const Game = () => {
	const { generateWords } = useGenerateWords();
	const dispatch = useAppDispatch();
	const { wrongCounts } = useAppSelector(selectScoreState);
	const { countdown, isPlaying, words } = useAppSelector(
		selectGameConfigState
	);

	const [typingInput, setTypingInput] = useState("");
	const [isWrong, setIsWrong] = useState(false);

	const { startTimer, time, resetTimer } = useTimer(countdown, () => {
		dispatch(setIsPlaying({ bool: false }));
		dispatch(setShowScore({ bool: true }));
	});

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (!isPlaying) start();
		if (words[typingInput.length] !== value[value.length - 1]) {
			dispatch(addWrongCount());
			setIsWrong(true);
			return;
		}

		setIsWrong(false);
		setTypingInput(value);
	};

	const start = () => {
		dispatch(setIsPlaying({ bool: true }));
		startTimer();
	};

	const restartButtonHandler = () => {
		generateWords();
		resetTimer();
		setTypingInput("");
		dispatch(resetScoreState());
		dispatch(setIsPlaying({ bool: false }));
	};

	useEffect(() => {
		if (countdown - time === 0) return;
		const cpm = parseInt(
			(typingInput.length / ((countdown - time) / 60)).toFixed()
		);
		dispatch(addCPMS({ cpm }));
	}, [time]);

	return (
		<div className="w-full flex flex-col items-center space-y-12">
			<div className="w-1/2 select-none">
				<div className="flex justify-between w-full text-white">
					<span className="">wroung counts : {wrongCounts}</span>
					<span className={`${time <= 5 ? "text-red-600" : ""}`}>
						{time}
					</span>
				</div>
				<TypingBoard
					typingInput={typingInput}
					onInputChange={onInputChange}
					isWrong={isWrong}
				/>
			</div>
			<div className="flex justify-between">
				<Button color="red" onClick={restartButtonHandler}>
					<IoRefresh size={42} color="white" />
				</Button>
			</div>
		</div>
	);
};
