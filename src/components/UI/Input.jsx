import React, { useContext } from "react";
import ThemeContext, { THEMES } from "../../context/theme-context";

const Input = ({ isInvalid, ...props }) => {
	const themeContext = useContext(ThemeContext);

	const colourClasses = isInvalid
		? "bg-red-50 border-red-500"
		: "border-green-500";

	return (
		<input
			{...props}
			className={
				THEMES[themeContext.theme].secondaryTextColor +
				" " +
				colourClasses +
				" w-full h-10 outline-none border-b-2 mb-2 duration-300 bg-inherit"
			}
		/>
	);
};

export default Input;
