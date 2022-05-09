import { useContext } from "react";
import ReactPlayer from "react-player/lazy";
import ThemeContext, { THEMES } from "../context/theme-context";

const MusicAlbum = ({ name, artist, url, onPlayPause, playing }) => {
	const themeContext = useContext(ThemeContext);

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
		<div
			className={
				"h-24 border-2 flex my-4 " +
				THEMES[themeContext.theme].secondaryBackgroundColor +
				" " +
				THEMES[themeContext.theme].secondaryBorderColor
			}
		>
			<div className="w-1/2 flex items-center">
				<div className="mx-4">
					<p className={"text-lg " + THEMES[themeContext.theme].secondaryTextColor}>{name}</p>
					<p className="text-sm text-slate-400">{artist}</p>
				</div>
			</div>
			{player}
		</div>
	);
};

export default MusicAlbum;
