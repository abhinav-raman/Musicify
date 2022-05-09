import { useEffect, useState } from "react";

import MusicAlbum from "./MusicAlbum";

import loaderGif from "../assets/gifs/loading.gif";
import musicIcon from "../assets/images/music-icon.png";

import { getDataFromDatabase } from "../firebase/FirebaseDatabase";

const MusicAlbums = ({ searchValue }) => {
	const [listOfMusicItems, setListOfMusicItems] = useState([]);
	const [currPlaying, setCurrPlaying] = useState(-1);
	const [isLoading, setIsloading] = useState(true);
	const [showNoDataMessage, setShowNoDataMessage] = useState(false);

	useEffect(() => {
		setIsloading(true);
		getDataFromDatabase().then((response) => {
			let tempList = [];
			if (!response.val()) {
				setShowNoDataMessage(true);
			} else {
				for (const track in response.val()) {
					const obj = response.val()[track];
					tempList.push({
						name: obj.trackName,
						artist: obj.artistName,
						url: obj.downloadUrl,
						key: track,
					});
				}
				setListOfMusicItems(tempList);
			}
			setIsloading(false);
		});
	}, []);

	const playPauseHandler = (key, url) => {
		setCurrPlaying(key);
	};

	const searchedList = listOfMusicItems.filter(
		(album) =>
			album.name.toLowerCase().includes(searchValue.toLowerCase()) ||
			album.artist.toLowerCase().includes(searchValue.toLowerCase())
	);

	const loader = (
		<div className="h-40">
			<img src={loaderGif} alt="loading" className="h-full mx-auto" />
		</div>
	);

	const noDataMessage = (
		<div className="text-center h-full">
			<p className="text-gray-500">No data. Try uploading some music files.</p>
			<img src={musicIcon} alt="no data" className="mx-auto" />
		</div>
	);

	return (
		<section className="w-4/5 mx-auto my-8 dark:bg-black">
			{isLoading ? (
				loader
			) : showNoDataMessage ? (
				noDataMessage
			) : (
				<ul>
					{searchedList.map((album) => (
						<li key={album.key}>
							<MusicAlbum
								name={album.name}
								artist={album.artist}
								url={album.url}
								onPlayPause={() => playPauseHandler(album.key, album.url)}
								playing={album.key === currPlaying}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default MusicAlbums;
