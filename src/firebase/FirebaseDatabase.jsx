import { getDatabase, set, get, ref, push } from "firebase/database";
import { app } from "./FirebaseApp";

const database = getDatabase(app);
const musicListRef = ref(database, "music-data");
const newPostRef = push(musicListRef);

export const setDataToDatabase = (trackName, artistName, downloadUrl) =>
	set(newPostRef, {
		trackName,
		artistName,
		downloadUrl,
	});

export const getDataFromDatabase = () => get(musicListRef);