import { Fragment, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import Content from "./components/Content";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import AuthContext from "./context/auth-context";
import ThemeContext, { THEMES } from "./context/theme-context";

const App = () => {
	const authContext = useContext(AuthContext);
	const themeContext = useContext(ThemeContext);

	return (
		<Fragment>
			<Header />
			<main className={`h-[calc(100%-5rem)] antialiased ${THEMES[themeContext.theme].primaryBackgroundColor}`}>
				<Switch>
					<Route path="/auth">
						{!authContext.isLoggedIn ? (
							<AuthForm />
						) : (
							<Redirect to="/" from="/auth" />
						)}
					</Route>
					<Route path="/upload">
						{authContext.isLoggedIn ? (
							<UploadForm />
						) : (
							<Redirect to="/auth" from="/upload" />
						)}
					</Route>
					<Route path="/" exact>
						{authContext.isLoggedIn ? <Content /> : <Redirect to="/auth" />}
					</Route>
					<Route path="*" exact>
						<Redirect to="/" />
					</Route>
				</Switch>
			</main>
		</Fragment>
	);
};

export default App;
