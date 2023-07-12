import { Button, Chart } from "@/components";
import { useGenerateWords } from "@/hooks";
import {
	resetScoreState,
	selectScoreState,
	setShowScore,
} from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoRefresh } from "react-icons/io5";

export const Score = () => {
	const { characterPerMinutes, wrongCounts } =
		useAppSelector(selectScoreState);
	const { generateWords } = useGenerateWords();
	const dispatch = useAppDispatch();
	const averageCPM = +(
		characterPerMinutes.reduce((prev, curr) => (curr += prev), 0) /
		characterPerMinutes.length
	).toFixed();

	const restartButtonHandler = () => {
		generateWords();
		dispatch(resetScoreState());
		dispatch(setShowScore({ bool: false }));
	};

	return (
		<div className="w-full flex flex-col items-center space-y-20">
			<div className="w-1/2 flex">
				<div className="w-5/6">
					<Chart data={characterPerMinutes} />
				</div>
				<div className="flex flex-col justify-center space-y-4 w-1/6 pl-8">
					<div>
						<h1 className="text-white text-4xl">CPM</h1>
						<h1 className="text-tosca text-4xl font-bold">
							{averageCPM}
						</h1>
					</div>
					<div>
						<h1 className="text-white text-4xl">wrongs</h1>
						<h1 className="text-red-600 text-4xl font-bold">
							{wrongCounts}
						</h1>
					</div>
				</div>
			</div>
			<div className="flex justify-between">
				<Button color="red" onClick={restartButtonHandler}>
					<IoRefresh size={42} color="white" />
				</Button>
			</div>
		</div>
	);
};
