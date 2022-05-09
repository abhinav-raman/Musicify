import React from "react";

const Input = ({ isInvalid, ...props }) => {
	const colourClasses = isInvalid
		? "bg-red-50 border-red-500 hover:bg-red-100"
		: "border-green-500";

	return (
		<input
			{...props}
			className={
				colourClasses +
				" w-full h-10 outline-none border-b-2 mb-2 duration-300 bg-inherit"
			}
		/>
	);
};

export default Input;
