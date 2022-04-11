import { useState } from "react";
import ReactPlayer from "react-player/lazy";

const MusicAlbum = ({ name, artist, url, onPlayPause, playing }) => {
	const [like, setLike] = useState(false);
	const likeIcon = (
		<svg
			className={
				"duration-200 " + (like ? "fill-red-600 scale-125 rotate-360" : '')
			}
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="60%"
			height="100%"
			viewBox="0 0 1335 1167"
		>
			<path d="M343 2.6C187.8 13.5 68.2 102.3 22 241c-9.6 28.7-15 53.9-18.6 87.2-2.4 21.1-2.4 67.5 0 88.6 6 55.1 19.6 101.7 44.1 151.7 11.5 23.5 20.4 39.1 35 61 27.6 41.7 56.9 76.9 101.4 121.8 48.3 48.8 86.6 82.5 188.6 166.2 79.1 64.9 118.2 98.2 153.5 130.9 19 17.6 60.1 59.1 73.8 74.6 21.9 24.7 30.5 32.9 38.5 36.8 9.8 4.7 17.7 6.5 29.2 6.5 11.3.1 18.1-1.3 27.3-5.4 9.6-4.3 15.3-9 26.4-21.8 38.2-43.9 81-85.6 141.8-138.2 19-16.4 46.9-39.6 99-82.4 102-83.7 136.4-113.8 184.1-161.5 60.7-60.6 96.5-106 130.3-165.2 1.4-2.6 6.2-11.8 10.5-20.5 29.1-58.4 44.3-116.6 47-179.8 2.7-62.7-7.1-121.4-29.2-175.1-24.4-59.4-67.1-112.8-119.2-148.9C1135.7 33 1074.4 11 1008.5 4c-17.1-1.8-54.8-2.4-69.1-1.1-57.7 5.4-112.6 26.6-171.7 66.4-30.8 20.6-71.3 54.7-93.4 78.5l-6.1 6.6-15.4-15c-32.2-31.3-59.1-53.1-91.8-74.7-50.5-33.1-98.5-52.4-150.5-60.3-9.7-1.5-54.6-2.7-67.5-1.8z" />
		</svg>
	);

	const player = (
		<div className="w-1/2 flex items-center p-4">
			<ReactPlayer
				url={url}
				config={{
					file: {
						forceAudio: true,
					},
				}}
				controls={true}
				width="100%"
				height="28px"
				onPlay={onPlayPause}
				playing={playing}
			/>
		</div>
	);

	return (
		<div className="h-24 border-2 flex">
			<div className="w-1/2 flex items-center">
				{/* <button
					onClick={() => setLike((prevState) => !prevState)}
					className="text-left bg-contain bg-no-repeat bg-right w-20 h-7 flex"
				>
					{likeIcon}
					<span
						className={
							like ? "ml-4 order-first text-red-600" : "ml-4 order-first"
						}
					>
						{like ? 1 : 0}
					</span>
				</button> */}
				<div className="mx-4">
					<p className="text-lg">{name}</p>
					<p className="text-sm text-slate-400">{artist}</p>
				</div>
			</div>
			{player}
		</div>
	);
};

export default MusicAlbum;
