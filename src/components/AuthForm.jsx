import React, { useState, useContext } from "react";

import { loginUser, signinUser } from "../firebase/FirebaseAuth";
import AuthContext from "../context/auth-context";
import Button from "./UI/Button";
import Input from "./UI/Input";
import loaderGif from "../assets/gifs/loading.gif";

const AuthForm = () => {
	const context = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");
	const [isEmailInvalid, setIsEmailInvalid] = useState(false);
	const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

	const [errorInForm, setErrorInForm] = useState(false);
	const [errorInFormMessage, setErrorInFormMessage] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);

	const [showSignInPage, setShowSignInPage] = useState(false);

	const signinHandler = async () => {
		setShowSpinner(true);
		await signinUser(email, password)
			.then((response) => {
				setEmail("");
				setPassword("");

				setShowSignInPage(false);
				setShowSpinner(false);
			})
			.catch((error) => {
				console.log(error);
				setErrorInForm(true);
				setErrorInFormMessage(error.message);
				setShowSpinner(false);
			});
	};

	const loginHandler = async () => {
		setShowSpinner(true);
		await loginUser(email, password)
			.then((response) => {
        setShowSpinner(false);
				context.onLogin(response.user.accessToken);
			})
			.catch((error) => {
				console.log(error);
				setErrorInForm(true);
				setErrorInFormMessage(error.message);
				setShowSpinner(false);
			});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setEmail(email.trim());

		if (
			email === "" ||
			!email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			setErrorInFormMessage("Please enter valid email address.");
			setErrorInForm(true);
			setIsEmailInvalid(true);
			return;
		}
		setIsEmailInvalid(false);

		if (password === "") {
			setErrorInFormMessage("Please cannot be empty.");
			setErrorInForm(true);
			setIsPasswordInvalid(true);
			return;
		} else if (showSignInPage && password !== retypedPassword) {
			setErrorInFormMessage("Please enter matching password.");
			setErrorInForm(true);
			setIsPasswordInvalid(true);
			return;
		}

		setIsPasswordInvalid(false);
		setErrorInForm(false);
		showSignInPage ? signinHandler() : loginHandler();
	};

	const emailChangeHandler = (event) => {
		setErrorInFormMessage("");
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setErrorInFormMessage("");
		setPassword(event.target.value);
	};

	const emailInputField = (
		<Input
			value={email}
			name="email"
			onChange={emailChangeHandler}
			placeholder={showSignInPage ? "Enter e-mail" : "E-mail"}
			isInvalid={errorInForm && isEmailInvalid}
			autoFocus
			autoComplete="on"
		/>
	);

	const passwordInputField = (
		<Input
			value={password}
			name="password"
			onChange={passwordChangeHandler}
			type="password"
			placeholder={showSignInPage ? "Choose password" : "Password"}
			isInvalid={errorInForm && isPasswordInvalid}
		/>
	);

	const retypePasswordInputField = (
		<Input
			type="password"
			onChange={(e) => setRetypedPassword(e.target.value)}
			placeholder="Retype Password"
			isInvalid={errorInForm && isPasswordInvalid}
			required
		/>
	);

	const pageToggleTextField = showSignInPage ? (
		<p className="w-full text-center mt-4">
			{/* {`${showSignInPage ? "Already" : "Not"} a user? `} */}
			{"Already a user?"}
			<span
				className="text-blue-400 cursor-pointer"
				onClick={() => setShowSignInPage(false)}
			>
				{" Log In with existing credentials"}
			</span>
		</p>
	) : (
		<p className="w-full text-center mt-4">
			{/* {`${showSignInPage ? "Already" : "Not"} a user? `} */}
			{"Not a user?"}
			<span
				className="text-blue-400 cursor-pointer"
				onClick={() => setShowSignInPage(true)}
			>
				{" Sign In with new credentials"}
			</span>
		</p>
	);

	const loader = (
		<div className="h-12">
			<img src={loaderGif} alt="loading" className="h-full mx-auto" />
		</div>
	);

	return (
		<section className="h-full flex justify-center items-center">
			<div className="dark-theme w-2/4 max-w-lg p-8 shadow-card-custom">
				<h2 className="w-full dark:bg-slate-500 text-center mb-4 text-2xl text-green-600 font-semibold">
					{showSignInPage ? "Sign In" : "Log In"}
				</h2>
				<form onSubmit={submitHandler} className="w-full">
					{emailInputField}
					{passwordInputField}
					{showSignInPage && retypePasswordInputField}
					<div className="w-full flex justify-center">
						{showSpinner ? (
							loader
						) : (
							<Button type="submit" className="border-2 bg-slate-100">
								Submit
							</Button>
						)}
					</div>
				</form>
				{pageToggleTextField}
				{errorInForm && (
					<p className="w-full text-red-500 text-center">
						{errorInFormMessage}
					</p>
				)}
			</div>
		</section>
	);
};

export default AuthForm;
