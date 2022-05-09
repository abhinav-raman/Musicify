import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { ThemeContextProvider } from "./context/theme-context";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
