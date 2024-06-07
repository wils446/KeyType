import { useCallback, useEffect, useState } from "react";

export const useTimer = (countdown: number, fn: () => void) => {
	const [time, setTime] = useState(countdown);
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const startTimer = useCallback(() => {
		setTimer(
			setInterval(() => {
				setTime((prev) => prev - 1);
			}, 1000)
		);
	}, []);

	const resetTimer = useCallback(() => {
		clearInterval(timer);
		setTime(countdown);
	}, [countdown, timer]);

	useEffect(() => {
		if (time != 0) return;
		resetTimer();
		fn();

		return () => clearInterval(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time]);

	return { startTimer, time, resetTimer };
};
