import React from "react";

const getTheme = () => {
    const theme = localStorage.getItem("theme");

    return theme ? theme : "light";
};

export default function useDarkMode(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [theme, setTheme] = React.useState(() => {
        return getTheme();
    });

    React.useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}
