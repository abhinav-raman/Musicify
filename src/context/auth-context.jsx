import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	onLogin: (token) => {},
	onLogout: () => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userToken, setUserToken] = useState("");

	useEffect(() => {
		const localStorageLoginState = localStorage.getItem("userToken");

		if (localStorageLoginState) {
			loginHandler(localStorageLoginState);
		} else {
			logoutHandler();
		}
	}, []);

	const loginHandler = (token) => {
		localStorage.setItem("userToken", token);
		setUserToken(token);
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem("userToken");
		setUserToken("");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				token: userToken,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
