import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, fallbackValue: T): [T, Dispatch<SetStateAction<T>>] => {
    const readValue = useCallback(() => {
        if (typeof window === undefined) return fallbackValue;

        const item = localStorage.getItem(key);
        return item ? parse(item) : fallbackValue;
    }, []);

    const [value, setValue] = useState<T>(readValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export default useLocalStorage;
