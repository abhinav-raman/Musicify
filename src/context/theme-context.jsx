import React, { useEffect, useState } from "react";

export const THEMES = {
	light: {
		primaryBackgroundColor: "white",
		secondaryBackgroundColor: "bg-slate-50",
		primaryTextColor: "text-green-700",
		secondaryTextColor: "text-slate-900",
		linkedTextColor: "text-sky-600",
	},
	dark: {
		primaryBackgroundColor: "bg-slate-800",
		secondaryBackgroundColor: "bg-slate-700",
		primaryTextColor: "text-green-300",
		secondaryTextColor: "text-slate-50",
		linkedTextColor: "text-sky-300",
	},
};

const ThemeContext = React.createContext({
	theme: "",
	setTheme: (theme) => {},
});

export const ThemeContextProvider = (props) => {
	let initialTheme = localStorage.getItem("theme");

	const [currentTheme, setCurrentTheme] = useState(
		initialTheme ? initialTheme : "dark"
	);

	useEffect(() => {
		localStorage.setItem("theme", currentTheme);
	}, [currentTheme]);

	const setThemeHandler = (theme) => {
		setCurrentTheme(theme);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme: currentTheme,
				setTheme: setThemeHandler,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
