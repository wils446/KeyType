module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                "fade-in": "ease in 1s",
                "fade-out": "ease out 1s",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
