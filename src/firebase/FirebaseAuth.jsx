import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
  signOut,
	updatePassword,
} from "firebase/auth";
import { app } from "./FirebaseApp";

const auth = getAuth(app);

export const signinUser = async (email, password) =>
	createUserWithEmailAndPassword(auth, email, password);

export const loginUser = async (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

export const updateUserPassword = async () => updatePassword(auth.currentUser);

export const logoutUser = () => signOut(auth);