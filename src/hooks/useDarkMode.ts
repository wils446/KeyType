"use client";

import { useEffect, useState } from "react";

type theme = "dark" | "light";

const getTheme = (): theme => {
    const theme = localStorage.getItem("theme") as theme;

    return theme ? theme : "dark";
};

const useDarkMode = (): [theme, () => void] => {
    const [theme, setTheme] = useState(getTheme());

    const toggleTheme = () => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, toggleTheme];
};

export default useDarkMode;
