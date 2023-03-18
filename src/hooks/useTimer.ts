import { useEffect, useState } from "react";

const useTimer = (
    initialCountdown: number,
    fn: () => void
): [number, () => void, (timer?: number) => void, () => void] => {
    const [countdown, setCountdown] = useState(initialCountdown);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    // stop / pause timer
    const stopTimer = () => {
        clearInterval(timer);

        return undefined;
    };

    // start timer
    const startTimer = () => {
        setTimer(
            setInterval(() => {
                setCountdown((countdown) => countdown - 1);
            }, 1000)
        );
    };

    // reset timer
    const resetTimer = (timer?: number) => {
        setTimer(stopTimer);
        if (timer) setCountdown(timer);
        else setCountdown(initialCountdown);
    };

    const pauseTimer = () => {
        setTimer(stopTimer);
    };

    useEffect(() => {
        if (countdown === 0) {
            resetTimer();
            fn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    return [countdown, startTimer, resetTimer, pauseTimer];
};

export default useTimer;
