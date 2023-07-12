import { useEffect, useState } from "react";

export const useTimer = (countdown: number, fn: () => void) => {
	const [time, setTime] = useState(countdown);
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const startTimer = () => {
		setTimer(
			setInterval(() => {
				setTime((prev) => prev - 1);
			}, 1000)
		);
	};

	const resetTimer = () => {
		clearInterval(timer);
		setTime(countdown);
	};

	useEffect(() => {
		if (time != 0) return;
		resetTimer();
		fn();

		return () => clearInterval(timer);
	}, [time]);

	return { startTimer, time, resetTimer };
};
