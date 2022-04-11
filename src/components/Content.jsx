import { useState } from "react";
import MusicAlbums from "./MusicAlbums";
import SearchBar from "./SearchBar";

const Content = () => {

  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (event) => {
    setSearchValue(event.target.value)
  }

	return (
		<div className="w-full p-4 absolute">
			<SearchBar onSearch={searchHandler} />
			<MusicAlbums searchValue={searchValue} />
		</div>
	);
};

export default Content;
