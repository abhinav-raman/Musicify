import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";

const PrivateRouter = ({ children, ...rest }) => {
	let auth = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/auth",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRouter;
