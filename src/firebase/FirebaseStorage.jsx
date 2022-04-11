import { getStorage, listAll, ref, getDownloadURL } from "firebase/storage";
import { app } from "./FirebaseApp";

const storage = getStorage(app, "gs://musicify-3a150.appspot.com/");
export const storageRef = ref(storage, "music-files/");

export const listAllItems = async () => listAll(storageRef);

export const getItemDownloadUrl = async (url) =>
	getDownloadURL(ref(storage, url));
