import { useEffect, useState } from "react";

import MusicAlbum from "./MusicAlbum";

import loaderGif from "../assets/gifs/loading.gif";
import { getDataFromDatabase } from "../firebase/FirebaseDatabase";

const MusicAlbums = ({ searchValue }) => {
	const [listOfMusicItems, setListOfMusicItems] = useState([]);
	const [currPlaying, setCurrPlaying] = useState(-1);
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		setIsloading(true);
		getDataFromDatabase().then((response) => {
			let tempList = [];
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

	return (
		<section className="w-4/5 mx-auto my-8">
			{isLoading ? (
				loader
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
