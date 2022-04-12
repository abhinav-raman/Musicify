import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../context/auth-context";
import logoIcon from "../assets/images/logo-icon.png";
import { logoutUser } from '../firebase/FirebaseAuth';

const Header = () => {
	const context = useContext(AuthContext);
	const history = useHistory();

	const handleLogout = () => {
    logoutUser().then(response => {
      context.onLogout();
    })
	};

	const handleUpload = () => {
		history.push("/upload");
	};

	return (
		<header className="w-full flex items-center justify-between h-20 sticky top-0 bg-green-400 ">
			<div className="h-full aspect-square flex items-center justify-center w-48">
				<div className="h-3/4 w-auto aspect-square" title="Home">
					<img src={logoIcon} alt="Logo" className="h-full w-auto cursor-pointer" onClick={() => history.push("/")} />
				</div>
			</div>
			<h1 className="font-semibold text-4xl text-green-900" title="Musicify">
				Musicify
			</h1>
			<div className="w-48 flex justify-evenly">
				{context.isLoggedIn && (
					<Fragment>
						<button
							className="border-2 mt-auto mb-auto p-2"
							onClick={handleUpload}
						>
							Upload
						</button>
						<button
							className="border-2 mt-auto mb-auto p-2"
							onClick={handleLogout}
						>
							Logout
						</button>
					</Fragment>
				)}
			</div>
		</header>
	);
};

export default Header;
